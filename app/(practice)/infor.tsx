import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
    
  const router = useRouter();

  // Dữ liệu người dùng (có thể thay bằng dữ liệu thực tế từ API/context)
  const userName = 'Nguyễn Văn A';
  const createdAt = '17/05/2025';

  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Đăng xuất', onPress: () =>  router.replace('/(auth)/login') },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <Text style={styles.label}>Tên người dùng</Text>
        <Text style={styles.value}>{userName}</Text>

        <Text style={styles.label}>Ngày tạo tài khoản</Text>
        <Text style={styles.value}>{createdAt}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  profileBox: {
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    color: '#777',
    marginTop: 20,
  },
  value: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 30,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
