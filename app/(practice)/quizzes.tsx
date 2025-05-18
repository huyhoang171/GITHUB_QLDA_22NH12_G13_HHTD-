import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function QuizzesScreen() {
  const router = useRouter();

  const quizCategories = [
    {
      id: '1',
      title: 'Grammar Quizzes',
      description: 'Test your grammar knowledge with our comprehensive quizzes',
      icon: 'document-text',
      bgColor: ['#4A90E2', '#5A5DE8'],
      link: '/grammar_quizzes',
    },
    {
      id: '2',
      title: 'Vocabulary Quizzes',
      description: 'Expand and check your vocabulary range with fun challenges',
      icon: 'book',
      bgColor: ['#FF9966', '#FF5E62'],
      link: '/vocabulary_quizzes',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1124&q=100' }}
        style={styles.headerBackground}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'transparent']}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Quiz Center</Text>
            <Text style={styles.subtitle}>Challenge yourself and improve your skills</Text>
          </View>
        </LinearGradient>
      </ImageBackground>


      <ScrollView 
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Quiz Categories</Text>
        
        {quizCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => router.push(category.link as any)}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={category.bgColor as any}
              style={styles.categoryCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name={category.icon as any} size={32} color="#FFFFFF" />
              </View>
              <View style={styles.categoryContent}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
                <View style={styles.categoryFooter}>
                  <View style={styles.categoryStats}>
                    <Ionicons name="time-outline" size={14} color="#FFFFFF" />
                    <Text style={styles.categoryStatsText}>15 min</Text>
                  </View>
                  <View style={styles.categoryStats}>
                    <Ionicons name="help-circle-outline" size={14} color="#FFFFFF" />
                    <Text style={styles.categoryStatsText}>20 questions</Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#FFFFFF" style={styles.arrowIcon} />
            </LinearGradient>
          </TouchableOpacity>
        ))}

        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerBackground: {
    height: 180,
  },
  headerGradient: {
    height: 180,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: -30,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statItemBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  categoriesContainer: {
    flex: 1,
    marginTop: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#333',
  },
  categoryCard: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  categoryCardGradient: {
    borderRadius: 16,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 10,
  },
  categoryFooter: {
    flexDirection: 'row',
  },
  categoryStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryStatsText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  arrowIcon: {
    opacity: 0.7,
  },
  featuredSection: {
    marginTop: 10,
  },
  featuredCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  featuredBackground: {
    height: 180,
  },
  featuredBackgroundImage: {
    borderRadius: 16,
  },
  featuredGradient: {
    height: 180,
    justifyContent: 'flex-end',
  },
  featuredContent: {
    padding: 20,
  },
  featuredBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  featuredDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
  },
  featuredButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 6,
  },
});