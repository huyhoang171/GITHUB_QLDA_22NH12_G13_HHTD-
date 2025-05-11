import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Topic } from '../app/types/navigation';
import { styles } from '../app/styles/vocabularyStyle';
import { getRandomColor } from '../hooks/useVocabulary';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';

interface SubtopicListProps {
  topic: Topic;
  onSelectSubtopic: (subtopicId: string) => void;
  onBack: () => void;
}

export const SubtopicList: React.FC<SubtopicListProps> = ({ topic, onSelectSubtopic, onBack }) => {
  const [learningStatus, setLearningStatus] = useState<{ [key: string]: boolean }>({});
  const [completionStatus, setCompletionStatus] = useState<{ [key: string]: boolean }>({});

  // Load saved status when component mounts
  useEffect(() => {
    loadSavedStatus();
  }, []);

  const loadSavedStatus = async () => {
    try {
      const savedLearningStatus = await AsyncStorage.getItem(`learning_${topic.id}`);
      const savedCompletionStatus = await AsyncStorage.getItem(`completion_${topic.id}`);

      if (savedLearningStatus) {
        setLearningStatus(JSON.parse(savedLearningStatus));
      }
      if (savedCompletionStatus) {
        setCompletionStatus(JSON.parse(savedCompletionStatus));
      }
    } catch (error) {
      console.error('Error loading saved status:', error);
    }
  };

  const saveStatus = async (type: 'learning' | 'completion', status: { [key: string]: boolean }) => {
    try {
      await AsyncStorage.setItem(`${type}_${topic.id}`, JSON.stringify(status));
    } catch (error) {
      console.error('Error saving status:', error);
    }
  };

  const toggleLearning = async (subtopicId: string) => {
    const newStatus = {
      ...learningStatus,
      [subtopicId]: !learningStatus[subtopicId]
    };
    setLearningStatus(newStatus);
    await saveStatus('learning', newStatus);
  };

  const toggleCompletion = async (subtopicId: string) => {
    const newStatus = {
      ...completionStatus,
      [subtopicId]: !completionStatus[subtopicId]
    };
    setCompletionStatus(newStatus);
    await saveStatus('completion', newStatus);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back to Topics</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{topic.title}</Text>
      </View>
      <ScrollView style={styles.subtopicsContainer}>
        {topic.subtopics?.map((subtopic) => (
          <TouchableOpacity
            key={subtopic.id}
            style={[styles.subtopicCard, { backgroundColor: getRandomColor(subtopic.id) }]}
            onPress={() => onSelectSubtopic(subtopic.id)}
          >
            <Text style={styles.subtopicTitle}>{subtopic.title}</Text>
            <Text style={styles.subtopicTitleVN}>{subtopic.titleVN}</Text>
            <View style={styles.iconContainer}>
              {!completionStatus[subtopic.id] && (
                <TouchableOpacity onPress={() => toggleLearning(subtopic.id)}>
                  <FontAwesome5
                    name={learningStatus[subtopic.id] ? 'book-open' : 'book'}
                    size={26}
                    color={learningStatus[subtopic.id] ? '#4a90e2' : '#BBBBBB'}
                    style={{ marginRight: 12, marginBottom: 15 }}
                  />
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={() => toggleCompletion(subtopic.id)}>
                <AntDesign
                  name={completionStatus[subtopic.id] ? 'checksquare' : 'checksquareo'}
                  size={28}
                  color={completionStatus[subtopic.id] ? '#4CAF50' : '#EE0000'}
                  style={{ marginBottom: 15 }}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};