import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';

// Topic data with added icon names for visual enhancement
const topics = [
  { id: 'greetings', title: 'Greetings', icon: '👋', color: '#4BC6B9', description: 'Learn common greetings and introductions', totalWords: 57 },
  { id: 'introductions', title: 'Introductions', icon: '🤝', color: '#FF8484', description: 'Present yourself and meet new people', totalWords: 56 },
  { id: 'daily-conversations', title: 'Daily Conversations', icon: '💬', color: '#90A8ED', description: 'Common phrases for everyday situations', totalWords: 51 },
  { id: 'travel', title: 'Travel', icon: '✈️', color: '#FFB347', description: 'Essential phrases when traveling', totalWords: 60 },
  { id: 'work', title: 'Work', icon: '💼', color: '#B19CD9', description: 'Professional vocabulary and expressions', totalWords: 50 },
];

interface ProgressData {
  subtopicId: string;
  progress: number; // Cho phép progress là số bất kỳ (số từ hoàn thành)
}

export default function SpeakingTopics() {
  const router = useRouter();
  const [progressData, setProgressData] = useState<ProgressData[]>([]);

  // Hàm lấy tiến trình từ AsyncStorage
  const getProgressListSpeaking = async () => {
    try {
      const storedProgress = await AsyncStorage.getItem('progressListSpeaking');
      const progressList = storedProgress ? JSON.parse(storedProgress) : [];
      setProgressData(progressList);
    } catch (error) {
      console.error('Lỗi khi lấy tiến trình speaking:', error);
      setProgressData([]);
    }
  };

  // Làm mới tiến trình khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      getProgressListSpeaking();
    }, [])
  );

  // Tính phần trăm tiến độ cho một chủ đề
  const getProgressPercent = (topicId: string, totalWords: number): number => {
    const progressItem = progressData.find(item => item.subtopicId === topicId);
    const completedWords = progressItem ? Math.min(progressItem.progress, totalWords) : 0; // Giới hạn completedWords <= totalWords
    return Math.floor((completedWords / totalWords) * 100);
  };

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
                {/* Hiển thị phần trăm tiến độ */}
                <Text style={styles.progressText}>
                  Progress: {getProgressPercent(topic.id, topic.totalWords)}%
                </Text>
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
    shadowColor: '#6C63FF',
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
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  arrowContainer: {
    padding: 16,
  },
  arrow: {
    fontSize: 20,
    color: '#6C63FF',
    fontWeight: 'bold',
  },
});