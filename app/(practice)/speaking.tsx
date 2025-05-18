import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { useRouter } from 'expo-router';

// Topic data with added icon names for visual enhancement
const topics = [
  { id: 'greetings', title: 'Greetings', icon: '👋', color: '#4BC6B9', description: 'Learn common greetings and introductions' },
  { id: 'introductions', title: 'Introductions', icon: '🤝', color: '#FF8484', description: 'Present yourself and meet new people' },
  { id: 'daily-conversations', title: 'Daily Conversations', icon: '💬', color: '#90A8ED', description: 'Common phrases for everyday situations' },
  { id: 'travel', title: 'Travel', icon: '✈️', color: '#FFB347', description: 'Essential phrases when traveling' },
  { id: 'work', title: 'Work', icon: '💼', color: '#B19CD9', description: 'Professional vocabulary and expressions' },
];

export default function SpeakingTopics() {
  const router = useRouter();

  const handleTopicPress = (topicId: string) => {
    console.log('Navigating to topicId:', topicId);
    router.push({
      pathname: '/speakingDetail',
      params: { topicId },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#6C63FF" />
      
      {/* Header with gradient overlay and illustration */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Speaking Practice</Text>
          <Text style={styles.headerSubtitle}>Master your pronunciation with daily practice</Text>
        </View>
      </View>
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Categories heading */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Topics</Text>
          <Text style={styles.sectionSubtitle}>Choose one to start practicing</Text>
        </View>
        
        <View style={styles.topicsContainer}>
          {topics.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={styles.topicCard}
              onPress={() => handleTopicPress(topic.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.topicIconContainer, { backgroundColor: topic.color }]}>
                <Text style={styles.topicIcon}>{topic.icon}</Text>
              </View>
              <View style={styles.topicContent}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicDescription}>{topic.description}</Text>
              </View>
              <View style={styles.arrowContainer}>
                <Text style={styles.arrow}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
       
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
  },
  header: {
    height: 140,
    backgroundColor: '#6C63FF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    marginBottom: 15,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    maxWidth: '80%',
  },
  sectionHeader: {
    marginTop: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  topicsContainer: {
    marginBottom: 20,
  },
  topicCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    alignItems: 'center',
  },
  topicIconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    margin: 12,
  },
  topicIcon: {
    fontSize: 28,
  },
  topicContent: {
    flex: 1,
    padding: 12,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333333',
  },
  topicDescription: {
    fontSize: 14,
    color: '#666666',
  },
  arrowContainer: {
    padding: 16,
  },
  arrow: {
    fontSize: 20,
    color: '#6C63FF',
    fontWeight: 'bold',
  },
  howToContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stepNumber: {
    backgroundColor: '#6C63FF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  tipsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF9E6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  tipsIconContainer: {
    marginRight: 12,
  },
  tipsIcon: {
    fontSize: 28,
  },
  tipsContent: {
    flex: 1,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  tipsDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});