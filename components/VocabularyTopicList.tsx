import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Topic } from '../app/types/navigation';
import { styles} from '../app/styles/vocabularyStyle'
import { StyleSheet } from 'react-native';


const { width } = Dimensions.get('window');

interface TopicListProps {
  topics: Topic[];
  onSelectTopic: (topicId: string) => void;
}

export const TopicList: React.FC<TopicListProps> = ({ topics, onSelectTopic }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={['#f0f7ff', '#eefbf5', '#f7f8fc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGradient}
      />

      {/* Decorative elements */}
      <View style={styles.decorContainer}>
        <View style={[styles.decorBlob, styles.decorBlob1]} />
        <View style={[styles.decorBlob, styles.decorBlob2]} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          style={[
            styles.headerContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Learn vocabulary by topic</Text>
          <Text style={styles.description}>
            Choose a topic to start learning vocabulary in a fun way!
          </Text>
        </Animated.View>

        {/* Topics Grid */}
        <View style={styles.topicsGrid}>
          {topics.map((topic) => (
            <Animated.View
              key={topic.id}
              style={[
                styles.topicCard,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => onSelectTopic(topic.id)}
                activeOpacity={0.8}
              >
                <Image
                  source={topic.image}
                  style={styles.topicImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
                  style={styles.topicInfo}
                >
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  <Text style={styles.topicTitleVN}>{topic.titleVN}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

