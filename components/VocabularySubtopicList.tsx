import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Topic } from '../app/types/navigation';
import { styles } from '../app/styles/subvocabularyStyle';
import { getRandomColor } from '../hooks/useVocabulary';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Dữ liệu từ file JSON đã convert
const vocabularyCountByTopicId: { [key: string]: number } = {
  animals: 530,
  birds: 265,
  fish_and_shellfish: 150,
  insects_worms_etc: 128,
  appearance: 504,
  body: 333,
  clothes_and_fashion: 589,
  colours_and_shapes: 357,
  language: 170,
  phones_email_and_the_internet: 168,
  art: 158,
  film_and_theatre: 155,
  literature_and_writing: 353,
  music: 592,
  tv_radio_and_news: 452,
  cooking_and_eating: 516,
  drinks: 161,
  food: 825,
  discussion_and_agreement: 307,
  doubt_guessing_and_certainty: 228,
  opinion_and_argument: 981,
  permission_and_obligation: 179,
  preferences_and_decisions: 234,
  suggestions_and_advice: 165,
  disability: 72,
  health_and_fitness: 135,
  health_problems: 559,
  healthcare: 470,
  mental_health: 109,
  buildings: 553,
  gardens: 128,
  house_and_homes: 507,
  games_and_toys: 243,
  hobbies: 134,
  shopping: 326,
  change_cause_and_effect: 232,
  danger: 158,
  difficulty_and_failure: 407,
  success: 694,
  education: 583,
  family_and_relationships: 374,
  feelings: 975,
  life_stages: 444,
  personal_qualities: 801,
  crime_and_punishment: 610,
  law_and_justice: 419,
  people_in_society: 327,
  politics: 589,
  religion_and_festivals: 707,
  social_issues: 458,
  biology: 224,
  computers: 549,
  engineering: 189,
  maths_and_measurement: 302,
  physics_and_chemistry: 316,
  scientific_research: 146,
  sports_ball_and_racket_sports: 633,
  sports_other_sports: 498,
  sports_water_sports: 131,
  farming: 247,
  geography: 374,
  plants_and_trees: 207,
  the_environment: 271,
  weather: 242,
  history: 232,
  space: 150,
  time: 312,
  holidays: 228,
  transport_by_air: 297,
  transport_by_bus_and_train: 195,
  transport_by_car_or_lorry: 823,
  transport_by_water: 438,
  business: 523,
  jobs: 496,
  money: 612,
  working_life: 210
};

interface SubtopicListProps {
  topic: Topic;
  onSelectSubtopic: (subtopicId: string) => void;
  onBack: () => void;
}

export const SubtopicList: React.FC<SubtopicListProps> = ({ topic, onSelectSubtopic, onBack }) => {
  const [progressStatus, setProgressStatus] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    loadSavedProgress();
  }, []);

  const loadSavedProgress = async () => {
    try {
      const json = await AsyncStorage.getItem('progressList');
      if (!json) return;

      const list: { subtopicId: string; progress: number }[] = JSON.parse(json);
      const newStatus: { [key: string]: number } = {};

      for (const subtopic of topic.subtopics || []) {
        const record = list.find((item) => item.subtopicId === subtopic.id);
        if (record) {
          newStatus[subtopic.id] = record.progress;
        }
      }

      setProgressStatus(newStatus);
    } catch (err) {
      console.error('Error loading progressList:', err);
    }
  };

  const saveProgress = async (status: { [key: string]: number }) => {
    try {
      await AsyncStorage.setItem(`progress_${topic.id}`, JSON.stringify(status));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const getProgressColor = (percent: number) => {
    if (percent < 25) return '#ff6b6b';
    if (percent < 50) return '#ffa06b';
    if (percent < 75) return '#ffd166';
    if (percent < 100) return '#96d666';
    return '#4CAF50';
  };

  const getProgressEmoji = (percent: number) => {
    if (percent < 25) return '🔴';
    if (percent < 50) return '🟠';
    if (percent < 75) return '🟡';
    if (percent < 100) return '🟢';
    return '🌟';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#4a90e2" />
          <Text style={styles.backButtonText}>Topics</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{topic.title}</Text>
      </View>

      <ScrollView style={styles.subtopicsContainer}>
        {topic.subtopics?.map((subtopic) => {
          const totalWords = vocabularyCountByTopicId[subtopic.id] || 100;
          const learnedWords = progressStatus[subtopic.id] || 0;
          const percent = Math.round((learnedWords / totalWords) * 100);
          const progressColor = getProgressColor(percent);
          const progressEmoji = getProgressEmoji(percent);

          return (
            <TouchableOpacity
              key={subtopic.id}
              style={[styles.subtopicCard, { backgroundColor: getRandomColor(subtopic.id) }]}
              onPress={() => onSelectSubtopic(subtopic.id)}
            >
              <View style={styles.subtopicContent}>
                <View style={styles.titleContainer}>
                  <Text style={styles.subtopicTitle}>{subtopic.title}</Text>
                  <Text style={styles.subtopicTitleVN}>{subtopic.titleVN}</Text>
                </View>

                <View style={styles.progressDisplay}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${percent}%`,
                          backgroundColor: progressColor
                        }
                      ]}
                    />
                  </View>
                  <View style={styles.progressInfo}>
                    <Text style={styles.progressEmoji}>{progressEmoji}</Text>
                    <Text style={[styles.progressText, { color: progressColor }]}>
                      {percent}% ({learnedWords}/{totalWords})
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};