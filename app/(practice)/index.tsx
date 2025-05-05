import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const features: Feature[] = [
  {
    id: 'vocabulary',
    title: 'Vocabulary',
    description: 'Learn and practice English vocabulary',
    icon: 'book-outline',
    color: '#4CAF50',
  },
  {
    id: 'grammar',
    title: 'Grammar',
    description: 'Study English grammar rules',
    icon: 'document-text-outline',
    color: '#2196F3',
  },
  {
    id: 'listening',
    title: 'Listening',
    description: 'Improve your listening skills',
    icon: 'headset-outline',
    color: '#FF9800',
  },
  {
    id: 'speaking',
    title: 'Speaking',
    description: 'Practice speaking English',
    icon: 'mic-outline',
    color: '#E91E63',
  },
  {
    id: 'reading',
    title: 'Reading',
    description: 'Enhance reading comprehension',
    icon: 'newspaper-outline',
    color: '#9C27B0',
  },
  {
    id: 'writing',
    title: 'Writing',
    description: 'Practice writing skills',
    icon: 'pencil-outline',
    color: '#607D8B',
  },
];

export default function HomeScreen() {
  const handleFeaturePress = (featureId: string) => {
    router.push(`/(practice)/${featureId}` as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>English Learning</Text>
        <Text style={styles.subtitle}>Choose a feature to start learning</Text>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.featuresContainer}>
          {features.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              style={styles.featureCard}
              onPress={() => handleFeaturePress(feature.id)}
            >
              <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
                <Ionicons name={feature.icon as any} size={32} color="white" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  featuresContainer: {
    padding: 20,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
});
