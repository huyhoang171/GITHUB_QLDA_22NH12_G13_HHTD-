import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router'; // Thêm useFocusEffect
import { useCallback } from 'react'; // Thêm useCallback
import { CategoryData } from '../types/navigation';
import { styles } from '../styles/grammarStyle';
import { CATEGORIES } from '../../constants/CategoryDataGrammar';

interface ProgressData {
  subtopicId: string; // Khớp với cache (chuỗi)
  progress: 0 | 1;
}

const GrammarScreen = () => {
  const [categories, setCategories] = useState<CategoryData[]>(CATEGORIES);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const router = useRouter();

  // Hàm lấy tiến trình từ AsyncStorage
  const getProgressListGrammar = async () => {
    try {
      const storedProgress = await AsyncStorage.getItem('progressListGrammar');
      const progressList = storedProgress ? JSON.parse(storedProgress) : [];
      setProgressData(progressList);
    } catch (error) {
      console.error('Lỗi khi lấy tiến trình:', error);
      setProgressData([]);
    }
  };

  // Làm mới tiến trình khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      getProgressListGrammar();
    }, [])
  );

  // Hàm tính số bài học đã hoàn thành cho một danh mục
  const getCompletedLessonsCount = (category: CategoryData): number => {
    const lessonIds = category.lessons.map(lesson => lesson.id); // lesson.id là số
    return progressData.filter(
      item => lessonIds.includes(Number(item.subtopicId)) && item.progress === 1
    ).length;
  };

  const navigateToLessons = (category: CategoryData): void => {
    router.push({
      pathname: '/(practice)/BasicGrammarScreen',
      params: { category: JSON.stringify(category) },
    });
  };

  const renderItem = ({ item }: { item: CategoryData }): React.ReactElement => {
    const completedLessons = getCompletedLessonsCount(item);
    const totalLessons = item.total;

    return (
      <TouchableOpacity style={styles.cardContainer} onPress={() => navigateToLessons(item)}>
        <View style={styles.cardRow}>
          <View style={styles.cardTextContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            {/* Hiển thị số bài học đã học */}
            <Text style={styles.progressText}>
              Đã học: {completedLessons}/{totalLessons} bài
            </Text>
            <View style={styles.exploreButton}>
              <Text style={styles.exploreText}>Explore topics →</Text>
            </View>
          </View>
          <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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