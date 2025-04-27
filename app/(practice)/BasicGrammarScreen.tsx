import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CategoryData, Lesson } from '../types/navigation';


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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  topicCard: {
    width: '48%',
    height: 170,
    backgroundColor: '#DEE2E6', // đậm hơn một bậc so với #E9ECEF
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  
    // Bóng sắc nét hơn
    elevation: 5, // Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  
  topicIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 8,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  topicDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerImage: {
    alignSelf: 'center',
    width: '95%',
    height: 350,
    marginVertical: 15,
    resizeMode: 'cover', 
    borderRadius: 40,
    overflow: 'hidden', 
  },
});

export default BasicGrammarScreen;