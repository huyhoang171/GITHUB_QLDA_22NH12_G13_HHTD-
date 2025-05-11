import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function QuizzesScreen() {
  const router = useRouter(); // ✅ Dùng router để điều hướng

  const quizCategories = [
    {
      id: '1',
      title: 'Grammar Quizzes',
      description: 'Test your grammar knowledge',
      icon: 'document-text' as const,
      link: '/grammar_quizzes',
    },
    {
      id: '2',
      title: 'Vocabulary Quizzes',
      description: 'Check your vocabulary range',
      icon: 'book' as const,
      link: '/vocabulary_quizzes', 
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Test your knowledge in different areas</Text>
      </View>

      <View style={styles.categoriesContainer}>
        {quizCategories.map((category) => (
          <View key={category.id} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <Ionicons name={category.icon} size={28} color="#4A90E2" />
            </View>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <Text style={styles.categoryDescription}>{category.description}</Text>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => router.push(category.link as any)} // ✅ Điều hướng sang trang tương ứng
            >
              <Text style={styles.startButtonText}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  categoriesContainer: {
    padding: 15,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  countBadge: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  startButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
