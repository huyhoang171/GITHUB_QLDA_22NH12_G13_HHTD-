import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const lessons = [
  { id: '1', title: 'Basic Vocabulary', level: 'Beginner', progress: 0.3 },
  { id: '2', title: 'Common Phrases', level: 'Beginner', progress: 0.1 },
  { id: '3', title: 'Grammar Basics', level: 'Beginner', progress: 0 },
  { id: '4', title: 'Daily Conversations', level: 'Intermediate', progress: 0 },
];

export default function LessonsScreen() {
  const renderLesson = ({ item }) => (
    <TouchableOpacity style={styles.lessonCard}>
      <View style={styles.lessonHeader}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
        <Text style={styles.lessonLevel}>{item.level}</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${item.progress * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>{Math.round(item.progress * 100)}% Complete</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Learning Path</Text>
      <FlatList
        data={lessons}
        renderItem={renderLesson}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  lessonCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  lessonLevel: {
    fontSize: 14,
    color: '#666',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
}); 