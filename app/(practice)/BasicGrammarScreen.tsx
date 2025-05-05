import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CategoryData, Lesson } from '../types/navigation';
import {styles} from '../styles/BasicGrammarStyle'


const BasicGrammarScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Thêm kiểm tra an toàn cho params.category
  let category: CategoryData = {
    id: 0,
    title: '',
    description: '',
    progress: 0,
    total: 0,
    image: null,
    lessons: []
  };

  try {
    if (params.category && typeof params.category === 'string') {
      category = JSON.parse(params.category);
    }
  } catch (error) {
    console.error('Error parsing category JSON:', error);
    // Trong trường hợp lỗi, sử dụng giá trị mặc định đã khai báo
  }

  const handleStartLearning = (lesson: Lesson) => {
    router.push({
      pathname: '/(practice)/TopicDetail',
      params: { lesson: JSON.stringify(lesson) }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{category.title}</Text>
        {category.image && (
          <Image 
            style={styles.headerImage} 
            source={category.image} 
          />
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
          </TouchableOpacity>
        ))}
      </View>

      {category.lessons && category.lessons.length > 0 && (
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => handleStartLearning(category.lessons[0])}
        >
          <Text style={styles.startButtonText}>Start Learning</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};



export default BasicGrammarScreen;