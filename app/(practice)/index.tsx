import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string[];
  image: any;
}

const features: Feature[] = [
  {
    id: 'vocabulary',
    title: 'Vocabulary',
    description: 'Build your English vocabulary with interactive flashcards and games',
    icon: 'book-outline',
    color: '#4CAF50',
    gradient: ['#4CAF50', '#2E7D32'],
    image: require('../../assets/images/vocabulary-bg.jpg'),
  },
  {
    id: 'grammar',
    title: 'Grammar',
    description: 'Master English grammar rules through engaging exercises',
    icon: 'document-text-outline',
    color: '#2196F3',
    gradient: ['#2196F3', '#0D47A1'],
    image: require('../../assets/images/grammar-bg.png'),
  },
  {
    id: 'speaking',
    title: 'Speaking',
    description: 'Improve your pronunciation and fluency with AI-powered feedback',
    icon: 'mic-outline',
    color: '#E91E63',
    gradient: ['#E91E63', '#C2185B'],
    image: require('../../assets/images/speaking-bg.png'),
  },
];

// Custom progress component
interface ProgressCircleProps {
  progress: number;
  size?: number;
  color?: string;
}

const ProgressCircle = ({ progress, size = 70, color = '#4CAF50' }: ProgressCircleProps) => {
  return (
    <View style={[styles.progressContainer, { width: size, height: size }]}>
      <View style={styles.progressBackground} />
      <View
        style={[
          styles.progressFill,
          {
            backgroundColor: color,
            width: `${progress}%`,
          },
        ]}
      />
      <View style={styles.progressCenter}>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
    </View>
  );
};

// Feature card component
interface FeatureCardProps {
  feature: Feature;
  onPress: () => void;
  progress?: number;
}

const FeatureCard = ({ feature, onPress, progress }: FeatureCardProps) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={[styles.featureCardContainer, animatedStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.featureCard}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <ImageBackground
          source={feature.image}
          style={styles.cardBackground}
          imageStyle={styles.cardBackgroundImage}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.cardGradient}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
                <Ionicons name={feature.icon as any} size={28} color="white" />
              </View>
              {/* Hiển thị ProgressCircle cho cả Vocabulary và Grammar */}
              {(feature.id === 'vocabulary' || feature.id === 'grammar') && (
                <ProgressCircle progress={progress ?? 0} color={feature.color} size={50} />
              )}
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>

              <View style={styles.cardFooter}>
                <View style={styles.tagContainer}>
                  <Text style={styles.tagText}>Popular</Text>
                </View>
                <TouchableOpacity
                  style={[styles.startButton, { backgroundColor: feature.color }]}
                  onPress={onPress}
                >
                  <Text style={styles.startButtonText}>Start</Text>
                  <Ionicons name="arrow-forward" size={14} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function HomeScreen() {
  const [vocabProgress, setVocabProgress] = useState(0);
  const [grammarProgress, setGrammarProgress] = useState(0);

  const loadProgress = async () => {
    try {
      // Load Vocabulary progress
      const vocabJson = await AsyncStorage.getItem('progressList');
      if (vocabJson) {
        const vocabList = JSON.parse(vocabJson);
        const totalVocab = 28369;
        const totalVocabProgress = vocabList.reduce((sum: number, item: any) => sum + item.progress, 0);
        const vocabPercent = Math.floor((totalVocabProgress / totalVocab) * 100);
        setVocabProgress(vocabPercent);
      }

      // Load Grammar progress
      const grammarJson = await AsyncStorage.getItem('progressListGrammar');
      if (grammarJson) {
        const grammarList = JSON.parse(grammarJson);
        const totalGrammar = 35; // Tổng số bài học grammar
        const totalGrammarProgress = grammarList.reduce(
          (sum: number, item: { progress: 0 | 1 }) => sum + item.progress,
          0
        );
        const grammarPercent = Math.floor((totalGrammarProgress / totalGrammar) * 100);
        setGrammarProgress(grammarPercent);
      }
    } catch (err) {
      console.log('Lỗi đọc tiến độ:', err);
    }
  };

  // Sử dụng useFocusEffect để reload tiến độ khi màn hình được focus
  useFocusEffect(
    React.useCallback(() => {
      loadProgress();
    }, [])
  );

  const handleFeaturePress = (featureId: string) => {
    router.push(`/(practice)/${featureId}` as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Let's Learn English</Text>
        <Text style={styles.subtitle}>Continue your language journey</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuresContainer}>
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              onPress={() => handleFeaturePress(feature.id)}
              progress={
                feature.id === 'vocabulary'
                  ? vocabProgress
                  : feature.id === 'grammar'
                  ? grammarProgress
                  : 0
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  featuresContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  featureCardContainer: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  featureCard: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 180,
  },
  cardBackground: {
    flex: 1,
  },
  cardBackgroundImage: {
    borderRadius: 16,
  },
  cardGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardContent: {
    justifyContent: 'flex-end',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  tagContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  tagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  startButtonText: {
    color: 'white',
    fontWeight: '600',
    marginRight: 4,
  },
  progressContainer: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressFill: {
    position: 'absolute',
    height: '100%',
    left: 0,
  },
  progressCenter: {
    width: '80%',
    height: '80%',
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});