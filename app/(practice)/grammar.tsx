import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { CategoryData } from '../types/navigation';
import { styles } from '../styles/grammarStyle'
import { CATEGORIES } from '../../constants/CategoryDataGrammar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';

// export const options = {
//   headerShown: false, // Tắt header mặc định của navigation
// };
const GrammarScreen = () => {
  const [categories] = useState<CategoryData[]>(CATEGORIES);
  const router = useRouter();
  const [learningStatus, setLearningStatus] = useState<{ [key: string]: boolean }>({});
  const [completionStatus, setCompletionStatus] = useState<{ [key: string]: boolean }>({});

  // Load saved status when component mounts
  useEffect(() => {
    loadSavedStatus();
  }, []);

  const loadSavedStatus = async () => {
    try {
      const savedLearningStatus = await AsyncStorage.getItem('learning_grammar');
      const savedCompletionStatus = await AsyncStorage.getItem('completion_grammar');

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
      await AsyncStorage.setItem(`${type}_grammar`, JSON.stringify(status));
    } catch (error) {
      console.error('Error saving status:', error);
    }
  };

  const toggleLearning = async (categoryId: string) => {
    const newStatus = {
      ...learningStatus,
      [categoryId]: !learningStatus[categoryId]
    };
    setLearningStatus(newStatus);
    await saveStatus('learning', newStatus);
  };

  const toggleCompletion = async (categoryId: string) => {
    const newStatus = {
      ...completionStatus,
      [categoryId]: !completionStatus[categoryId]
    };
    setCompletionStatus(newStatus);
    await saveStatus('completion', newStatus);
  };
  

  const navigateToLessons = (category: CategoryData): void => {
    router.push({
      pathname: '/(practice)/BasicGrammarScreen',
      params: { category: JSON.stringify(category) }
    });
    // console.log('Navigating to BasicGrammar with category:', category);
  };

  const renderItem = ({ item }: { item: CategoryData }): React.ReactElement => (
    <TouchableOpacity style={styles.cardContainer} onPress={() => navigateToLessons(item)}>
      <View style={styles.cardRow}>
        <View style={styles.cardTextContent}>
          <View style={styles.iconContainer}>
            {!completionStatus[item.id] && (
              <TouchableOpacity onPress={() => toggleLearning(item.id)}>
                <FontAwesome5
                  name={learningStatus[item.id] ? 'book-open' : 'book'}
                  size={26}
                  color={learningStatus[item.id] ? '#4a90e2' : '#BBBBBB'}
                  style={{ marginRight: 12, marginBottom: 15 }}
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => toggleCompletion(item.id)}>
              <AntDesign
                name={completionStatus[item.id] ? 'checksquare' : 'checksquareo'}
                size={28}
                color={completionStatus[item.id] ? '#4CAF50' : '#EE0000'}
                style={{ marginBottom: 15 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <View style={styles.exploreButton}>
            <Text style={styles.exploreText}>Explore topics →</Text>
          </View>
        </View>
        <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Grammar</Text>
      </View>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => `category-${item.id}`}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};



export default GrammarScreen;