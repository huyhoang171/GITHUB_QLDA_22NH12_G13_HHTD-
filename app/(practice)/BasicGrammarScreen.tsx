import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CategoryData, Lesson } from '../types/navigation';
import { styles } from '../styles/BasicGrammarStyle';
import { saveProgressGrammarApi } from '@/services/api.service';

interface ProgressData {
  subtopicId: string;
  progress: 0 | 1;
}

const BasicGrammarScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [grammarProgress, setGrammarProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  // Xác thực và khởi tạo category
  const validateCategory = (data: any): CategoryData => {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid category data');
    }
    return {
      id: data.id || 0,
      title: data.title || '',
      description: data.description || '',
      progress: data.progress || 0,
      total: data.total || 0,
      image: data.image || null,
      lessons: Array.isArray(data.lessons) ? data.lessons : [],
    };
  };

  let category: CategoryData = {
    id: 0,
    title: '',
    description: '',
    progress: 0,
    total: 0,
    image: null,
    lessons: [],
  };

  try {
    if (params.category && typeof params.category === 'string') {
      category = validateCategory(JSON.parse(params.category));
    }
  } catch (error) {
    console.error('Error parsing category JSON:', error);
  }

  // Hàm lấy tiến trình từ AsyncStorage
  const getProgressListGrammar = useCallback(async () => {
    setIsLoading(true);
    try {
      const totalGrammar = 35;
      const validSubtopicIds = Array.from({ length: totalGrammar }, (_, i) => (i + 1).toString());
      const storedProgress = await AsyncStorage.getItem('progressListGrammar');
      let progressList: ProgressData[] = [];

      if (storedProgress) {
        progressList = JSON.parse(storedProgress).map(item => ({
          ...item,
          progress: item.progress === 1 ? 1 : 0,
        }));
        // Kiểm tra và đồng bộ số lượng item
        if (progressList.length !== totalGrammar) {
          console.warn(`progressList có ${progressList.length} item, kỳ vọng ${totalGrammar}`);
          progressList = validSubtopicIds.map(id => ({
            subtopicId: id,
            progress: progressList.find(item => item.subtopicId === id)?.progress || 0,
          }));
          await AsyncStorage.setItem('progressListGrammar', JSON.stringify(progressList));
        }
      } else {
        // Khởi tạo với 35 bài học
        progressList = validSubtopicIds.map(id => ({
          subtopicId: id,
          progress: 0,
        }));
        await AsyncStorage.setItem('progressListGrammar', JSON.stringify(progressList));
      }

      // Tính phần trăm tiến độ
      const totalGrammarProgress = progressList.reduce(
        (sum: number, item: ProgressData) => sum + item.progress,
        0
      );
      const grammarPercent = Math.min(
        Math.floor((totalGrammarProgress / totalGrammar) * 100),
        100
      );

      console.log('progressList:', progressList);
      console.log('totalGrammarProgress:', totalGrammarProgress);
      console.log('grammarPercent:', grammarPercent);

      setProgressData(progressList);
      setGrammarProgress(grammarPercent);
    } catch (error) {
      console.error('Lỗi khi lấy tiến trình:', error);
      setProgressData([]);
      setGrammarProgress(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Hàm cập nhật tiến trình
  const updateProgress = useCallback(async (subtopicId: number) => {
    setIsLoading(true);
    try {
      const totalGrammar = 35;
      const validSubtopicIds = Array.from({ length: totalGrammar }, (_, i) => (i + 1).toString());
      if (!validSubtopicIds.includes(subtopicId.toString())) {
        console.warn(`subtopicId ${subtopicId} không hợp lệ`);
        return;
      }

      const storedProgress = await AsyncStorage.getItem('progressListGrammar');
      let progressList: ProgressData[] = [];

      if (storedProgress) {
        progressList = JSON.parse(storedProgress).map(item => ({
          ...item,
          progress: item.progress === 1 ? 1 : 0,
        }));
        // Kiểm tra và đồng bộ số lượng item
        if (progressList.length !== totalGrammar) {
          console.warn(`progressList có ${progressList.length} item, kỳ vọng ${totalGrammar}`);
          progressList = validSubtopicIds.map(id => ({
            subtopicId: id,
            progress: progressList.find(item => item.subtopicId === id)?.progress || 0,
          }));
        }
        // Cập nhật tiến trình
        const updatedList = progressList.map(item => ({
          ...item,
          progress: item.subtopicId === subtopicId.toString() ? 1 : item.progress,
        }));
        console.log('progressList trước update:', progressList);
        console.log('progressList sau update:', updatedList);
        await AsyncStorage.setItem('progressListGrammar', JSON.stringify(updatedList));
        setProgressData(updatedList);

        // Tính lại phần trăm tiến độ
        const totalGrammarProgress = updatedList.reduce(
          (sum: number, item: ProgressData) => sum + item.progress,
          0
        );
        const grammarPercent = Math.min(
          Math.floor((totalGrammarProgress / totalGrammar) * 100),
          100
        );
        setGrammarProgress(grammarPercent);
      } else {
        // Khởi tạo nếu không có dữ liệu
        progressList = validSubtopicIds.map(id => ({
          subtopicId: id,
          progress: id === subtopicId.toString() ? 1 : 0,
        }));
        await AsyncStorage.setItem('progressListGrammar', JSON.stringify(progressList));
        setProgressData(progressList);
        const grammarPercent = Math.min(
          Math.floor((1 / totalGrammar) * 100),
          100
        );
        setGrammarProgress(grammarPercent);
      }

      // Gửi tiến trình đến server
      const result = await saveProgressGrammarApi(subtopicId, 1);
      if (!result.success) {
        throw new Error('Gửi tiến trình đến server thất bại');
      }
      console.log(`Đã cập nhật tiến trình cho bài học ${subtopicId} thành đã học`);
    } catch (error) {
      console.error('Lỗi khi cập nhật tiến trình:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật tiến trình. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Lấy tiến trình khi component mount
  useEffect(() => {
    getProgressListGrammar();
  }, [getProgressListGrammar]);

  // Kiểm tra trạng thái hoàn thành của bài học
  const isLessonCompleted = (lessonId: number): boolean => {
    const progressItem = progressData.find(item => item.subtopicId === lessonId.toString());
    return progressItem ? progressItem.progress === 1 : false;
  };

  // Xử lý khi bắt đầu học
  const handleStartLearning = async (lesson: Lesson) => {
    try {
      if (!isLessonCompleted(lesson.id)) {
        await updateProgress(lesson.id);
      }
      await AsyncStorage.setItem('current_category', JSON.stringify(category));
      router.push({
        pathname: '/(practice)/TopicDetail',
        params: { lesson: JSON.stringify(lesson) },
      });
    } catch (error) {
      console.error('Lỗi khi xử lý start learning:', error);
      Alert.alert('Lỗi', 'Không thể bắt đầu bài học. Vui lòng thử lại.');
    }
  };

  // Reset tiến trình nếu cần (dùng khi debug)
  const resetProgress = async () => {
    try {
      const totalGrammar = 35;
      const initialProgress = Array.from({ length: totalGrammar }, (_, i) => ({
        subtopicId: (i + 1).toString(),
        progress: 0,
      }));
      await AsyncStorage.setItem('progressListGrammar', JSON.stringify(initialProgress));
      setProgressData(initialProgress);
      setGrammarProgress(0);
      console.log('Đã reset progressListGrammar');
    } catch (error) {
      console.error('Lỗi khi reset tiến trình:', error);
    }
  };

  const lessons = category.lessons || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{category.title}</Text>
        {category.image && (
          <Image style={styles.headerImage} source={category.image} />
        )}
        <Text style={styles.subHeaderText}>
          Nền tảng các kiến thức cơ bản của {category.title}. Tất cả bạn sẽ cần để học trong tương lai.
        </Text>
        <Text style={styles.progressText}>
          Tiến độ: {grammarProgress}%
        </Text>
      </View>

      {isLoading ? (
        <Text style={styles.loadingText}>Đang tải...</Text>
      ) : lessons.length > 0 ? (
        <View style={styles.topicsGrid}>
          {lessons.map((lesson) => (
            <TouchableOpacity
              key={lesson.id}
              style={styles.topicCard}
              onPress={() => handleStartLearning(lesson)}
            >
              <Image
                source={lesson.image || require('../../assets/png/png_topics/communication.png')}
                style={styles.topicIcon}
              />
              <Text style={styles.topicTitle}>{lesson.title}</Text>
              <Text style={styles.topicDescription}>{lesson.subTitle}</Text>
              <Icon
                name={isLessonCompleted(lesson.id) ? 'check-circle' : 'radio-button-unchecked'}
                size={24}
                color={isLessonCompleted(lesson.id) ? '#4CAF50' : '#999'}
                style={styles.completionIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.noLessonsText}>Không có bài học nào trong danh mục này.</Text>
      )}

      {__DEV__ && (
        <TouchableOpacity style={styles.resetButton} onPress={resetProgress}>
          <Text style={styles.resetButtonText}>Reset Tiến trình</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default BasicGrammarScreen;