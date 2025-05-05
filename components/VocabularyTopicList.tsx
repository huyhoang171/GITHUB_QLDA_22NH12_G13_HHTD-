import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Topic } from '../app/types/navigation';
import { styles } from '../app/styles/vocabularyStyle';

interface TopicListProps {
  topics: Topic[];
  onSelectTopic: (topicId: string) => void;
}

export const TopicList: React.FC<TopicListProps> = ({ topics, onSelectTopic }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Learn vocabulary by topic</Text>
      <View style={styles.topicsGrid}>
        {topics.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={styles.topicCard}
            onPress={() => onSelectTopic(topic.id)}
          >
            <Image
              source={topic.image}
              style={styles.topicImage}
              resizeMode="cover"
            />
            <View style={styles.topicInfo}>
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Text style={styles.topicTitleVN}>{topic.titleVN}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};