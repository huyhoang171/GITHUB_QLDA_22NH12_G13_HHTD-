
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: 'John Doe',
    email: 'johndoe@example.com',
    createdAt: '2025-05-17',
  });
  
  // State for selected month and year
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1); // 1-based month
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [studyDays, setStudyDays] = useState([]);

  // Format date from ISO to YYYY-MM-DD
  const formatDate = (isoDate) => {
    try {
      const date = new Date(isoDate);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      return date.toISOString().split('T')[0];
    } catch {
      return '2025-05-17';
    }
  };

  // Get user data from AsyncStorage
  const getUserDataFromCache = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      const email = await AsyncStorage.getItem('email');
      const createdAt = await AsyncStorage.getItem('createdAt');

      const data = {
        username: username || 'John Doe',
        email: email || 'johndoe@example.com',
        createdAt: createdAt ? formatDate(createdAt) : '2025-05-17',
      };
      setUserData(data);
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      setUserData({
        username: 'John Doe',
        email: 'johndoe@example.com',
        createdAt: '2025-05-17',
      });
    }
  };

  // Get study data from AsyncStorage for the selected month
  const getStudyData = async () => {
    try {
      // Retrieve cached study calendar from AsyncStorage
      const calendarData = await AsyncStorage.getItem('studyCalendar');
      let studyDays = [];

      if (calendarData) {
        const parsedData = JSON.parse(calendarData); // Array of "dd-mm-yyyy" strings
        if (Array.isArray(parsedData)) {
          // Filter dates for the selected month and year
          studyDays = parsedData
            .filter((date) => {
              const [day, month, year] = date.split('-').map(Number);
              return month === selectedMonth && year === selectedYear;
            })
            .map((date) => {
              const [day] = date.split('-').map(Number);
              return day;
            });
        } else {
          console.warn('Cached study calendar data is not an array:', parsedData);
        }
      } else {
        console.warn('No study calendar data found in AsyncStorage');
      }

      // Ensure unique days and sort them
      studyDays = [...new Set(studyDays)].sort((a, b) => a - b);

      setStudyDays(studyDays);
    } catch (error) {
      console.error('Error retrieving study calendar from AsyncStorage:', error);
    }
  };

  // Load data when component mounts or when month/year changes
  useEffect(() => {
    getUserDataFromCache();
  }, []);

  useEffect(() => {
    getStudyData();
  }, [selectedMonth, selectedYear]);

  // Generate calendar for the selected month and year
  const generateCalendar = () => {
    const year = selectedYear;
    const month = selectedMonth - 1; // JavaScript months are 0-based
    
    // Get first day of month (0 = Sunday, 1 = Monday, etc.)
    let firstDay = new Date(year, month, 1).getDay();
    // Adjust for Monday as first day of week
    firstDay = firstDay === 0 ? 6 : firstDay - 1;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in month

    const calendarDays = [];
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        day === currentDate.getDate() && 
        month === currentDate.getMonth() && 
        year === currentDate.getFullYear();
        
      const hasStudy = studyDays.includes(day);
      calendarDays.push({ day, hasStudy, isToday });
    }

    return calendarDays;
  };

  const calendarDays = generateCalendar();

  // Month and year navigation functions
  const prevMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 1) {
        setSelectedYear((year) => year - 1);
        return 12;
      }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 12) {
        setSelectedYear((year) => year + 1);
        return 1;
      }
      return prev + 1;
    });
  };

  const getMonthName = (month) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month - 1];
  };

  const handleChangePassword = () => {
    router.push('/(practice)/change_password');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout', 
      'Are you sure you want to logout?', 
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => router.replace('/(auth)/login') }
      ]
    );
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Text style={styles.profileImageText}>{getInitials(userData.username)}</Text>
        </View>
        <Text style={styles.headerName}>{userData.username}</Text>
      </View>

      {/* User Information */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Ionicons name="person" size={18} color="#fff" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.value}>{userData.username}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Ionicons name="mail" size={18} color="#fff" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{userData.email}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Ionicons name="calendar" size={18} color="#fff" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>Account Created</Text>
            <Text style={styles.value}>{userData.createdAt}</Text>
          </View>
        </View>
      </View>

      {/* Study Calendar Section */}
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="calendar" size={20} color="#4a90e2" style={styles.sectionIcon} />
            <Text> Study Calendar</Text>
          </Text>
          
          <TouchableOpacity 
            style={styles.todayButton}
            onPress={() => {
              setSelectedMonth(currentDate.getMonth() + 1);
              setSelectedYear(currentDate.getFullYear());
            }}
          >
            <Text style={styles.todayButtonText}>Today</Text>
          </TouchableOpacity>
        </View>

        {/* Month and Year Navigation */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.navArrow} onPress={prevMonth}>
            <Ionicons name="chevron-back" size={22} color="#4a90e2" />
          </TouchableOpacity>
          
          <View style={styles.dateDisplay}>
            <Text style={styles.monthYearText}>
              {getMonthName(selectedMonth)} {selectedYear}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.navArrow} onPress={nextMonth}>
            <Ionicons name="chevron-forward" size={22} color="#4a90e2" />
          </TouchableOpacity>
        </View>

        <View style={styles.calendarWrapper}>
          {/* Weekday Headers */}
          <View style={styles.weekdayRow}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <Text key={index} style={styles.weekdayText}>
                {day}
              </Text>
            ))}
          </View>
          
          {/* Calendar Grid */}
          <View style={styles.calendarGrid}>
            {calendarDays.map((dayInfo, index) => (
              <View key={index} style={styles.calendarDay}>
                {dayInfo ? (
                  <View style={[
                    styles.dayContainer,
                    dayInfo.isToday && styles.todayContainer,
                    dayInfo.hasStudy && styles.studyDayContainer
                  ]}>
                    <Text style={[
                      styles.dayText,
                      dayInfo.isToday && styles.todayText,
                      dayInfo.hasStudy && styles.studyDayText
                    ]}>
                      {dayInfo.day}
                    </Text>
                    {dayInfo.hasStudy && (
                      <View style={styles.studyIndicator} />
                    )}
                  </View>
                ) : (
                  <View style={styles.emptyDay} />
                )}
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={styles.todayLegend} />
            <Text style={styles.legendText}>Today</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={styles.studyLegend} />
            <Text style={styles.legendText}>Study Day</Text>
          </View>
        </View>
      </View>

      {/* Account Actions */}
      <View style={styles.buttonContainer}>
        
        <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
          <Ionicons name="key-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#4a90e2',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  profileImageText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  headerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 8,
  },
  membershipText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  infoContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#8a94a6',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '600',
    marginTop: 4,
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: 5,
  },
  todayButton: {
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0eafc',
  },
  todayButtonText: {
    color: '#4a90e2',
    fontSize: 14,
    fontWeight: '600',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  navArrow: {
    padding: 8,
  },
  dateDisplay: {
    flex: 1,
    alignItems: 'center',
  },
  monthYearText: {
    fontSize: 18,
    color: '#2d3748',
    fontWeight: '600',
  },
  calendarWrapper: {
    marginVertical: 15,
  },
  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    color: '#8a94a6',
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  dayContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'relative',
  },
  dayText: {
    fontSize: 14,
    color: '#2d3748',
    fontWeight: '500',
  },
  todayContainer: {
    backgroundColor: '#e0eafc',
    borderRadius: 10,
  },
  todayText: {
    color: '#4a90e2',
    fontWeight: 'bold',
  },
  studyDayContainer: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 10,
  },
  studyDayText: {
    fontWeight: '600',
  },
  studyIndicator: {
    position: 'absolute',
    bottom: 3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
  },
  emptyDay: {
    width: '100%',
    height: '100%',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  todayLegend: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e0eafc',
    marginRight: 5,
  },
  studyLegend: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#8a94a6',
  },
  statsContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  statItem: {
    width: '50%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  statLabel: {
    fontSize: 13,
    color: '#8a94a6',
    marginTop: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  settingsButton: {
    backgroundColor: '#6c5ce7',
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  changePasswordButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});