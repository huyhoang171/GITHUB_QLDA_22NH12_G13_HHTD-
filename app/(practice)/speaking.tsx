import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router'; // CHỈNH lại từ "router" sang "useRouter"

const topics = [
  { id: 'greetings', title: 'Greetings' },
  { id: 'introductions', title: 'Introductions' },
  { id: 'daily-conversations', title: 'Daily Conversations' },
  { id: 'travel', title: 'Travel' },
  { id: 'work', title: 'Work' },
];

export default function SpeakingTopics() {
  const router = useRouter(); // CHỈNH: Khởi tạo hook useRouter

  const handleTopicPress = (topicId: string) => {
    console.log('Navigating to topicId:', topicId);
    router.push({
      pathname: '/speakingDetail', // Corrected the path to match the route structure
      params: { topicId },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Speaking Topics</Text>
      {topics.map((topic) => (
        <TouchableOpacity
          key={topic.id}
          style={styles.topicCard}
          onPress={() => handleTopicPress(topic.id)}
        >
          <Text style={styles.topicTitle}>{topic.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  topicCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
