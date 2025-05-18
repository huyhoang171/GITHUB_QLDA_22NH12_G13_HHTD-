import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CategoryData, Lesson } from '../types/navigation';
import { styles } from '../styles/BasicGrammarStyle';

interface ProgressData {
  subtopicId: string; // Khớp với cache (chuỗi)
  progress: 0 | 1;
}

const BasicGrammarScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [progressData, setProgressData] = useState<ProgressData[]>([]);

  // Khởi tạo category mặc định
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
      category = JSON.parse(params.category);
    }
  } catch (error) {
    console.error('Error parsing category JSON:', error);
  }

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

  // Hàm cập nhật tiến trình trong AsyncStorage
  const updateProgress = async (subtopicId: number) => {
    try {
      const storedProgress = await AsyncStorage.getItem('progressListGrammar');
      if (storedProgress) {
        const progressList = JSON.parse(storedProgress);
        const updatedList = progressList.map(item => ({
          ...item,
          progress: item.subtopicId === subtopicId.toString() ? 1 : item.progress,
        }));
        await AsyncStorage.setItem('progressListGrammar', JSON.stringify(updatedList));
        await getProgressListGrammar(); // Cập nhật progressData để làm mới giao diện
        console.log(`Đã cập nhật tiến trình cho bài học ${subtopicId} thành đã học`);
      } else {
        console.warn('Không tìm thấy progressListGrammar trong AsyncStorage');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật tiến trình:', error);
    }
  };

  // Lấy tiến trình khi component mount
  useEffect(() => {
    getProgressListGrammar();
  }, []);

  // Kiểm tra trạng thái hoàn thành của bài học
  const isLessonCompleted = (lessonId: number): boolean => {
    const progressItem = progressData.find(item => item.subtopicId === lessonId.toString());
    return progressItem ? progressItem.progress === 1 : false;
  };

  const handleStartLearning = async (lesson: Lesson) => {
    try {
      // Kiểm tra nếu bài học chưa hoàn thành thì cập nhật thành đã học
      if (!isLessonCompleted(lesson.id)) {
        await updateProgress(lesson.id);
      }

      // Lưu category vào AsyncStorage
      await AsyncStorage.setItem('current_category', JSON.stringify(category));

      // Chuyển hướng đến TopicDetail
      router.push({
        pathname: '/(practice)/TopicDetail',
        params: { lesson: JSON.stringify(lesson) },
      });
    } catch (error) {
      console.error('Lỗi khi xử lý start learning:', error);
    }
  };

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
      </View>

      <View style={styles.topicsGrid}>
        {category.lessons?.map((lesson) => (
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
            {/* Icon hoàn thành/chưa hoàn thành */}
            <Icon
              name={isLessonCompleted(lesson.id) ? 'check-circle' : 'radio-button-unchecked'}
              size={24}
              color={isLessonCompleted(lesson.id) ? '#4CAF50' : '#999'}
              style={styles.completionIcon}
            />
          </TouchableOpacity>
        ))}
      </View>

     
    </ScrollView>
  );
};

export default BasicGrammarScreen;