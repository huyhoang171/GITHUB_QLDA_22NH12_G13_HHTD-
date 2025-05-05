import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { Audio } from 'expo-av';
import { useFocusEffect } from 'expo-router';
import { Topic, VocabularyItem } from '../types/vocabularyType';
import { topics, vocabularyFiles } from '../../constants/Topic';
import { TopicList } from '../../components/VocabularyTopicList';
import { SubtopicList } from '../../components/VocabularySubtopicList';
import { VocabularyCard } from '../../components/vocabularyCard';
import { playSound, translateSenses } from '../../hooks/useVocabulary';
import { styles } from '../styles/vocabularyStyle';

export default function VocabularyScreen() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [vocabularyItems, setVocabularyItems] = useState<VocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [translatedSenses, setTranslatedSenses] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState<string | null>(null);
  const [translatedWord, setTranslatedWord] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      setSelectedTopic(null);
      setSelectedSubtopic(null);
      setVocabularyItems([]);
      setCurrentIndex(0);
      setShowAnswer(false);
      setTranslatedSenses(null);
      setTranslatedWord(null);
      setTranslationError(null);
      setIsTranslating(false);
      if (sound) {
        sound.unloadAsync();
        setSound(null);
      }
    }, [])
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (selectedSubtopic) {
        setSelectedSubtopic(null);
        setVocabularyItems([]);
        setCurrentIndex(0);
        setShowAnswer(false);
        return true;
      } else if (selectedTopic) {
        setSelectedTopic(null);
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [selectedTopic, selectedSubtopic]);

  useEffect(() => {
    setTranslatedSenses(null);
    setTranslatedWord(null);
    setTranslationError(null);
    setIsTranslating(false);
  }, [currentIndex]);

  useEffect(() => {
    if (selectedTopic && selectedSubtopic) {
      loadVocabularyData(selectedTopic, selectedSubtopic);
    }
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [selectedTopic, selectedSubtopic]);

  const loadVocabularyData = async (topicId: string, subtopicId: string) => {
    try {
      setCurrentIndex(0);
      setShowAnswer(false);
      const data = vocabularyFiles[topicId]?.[subtopicId] || [];
      setVocabularyItems(data);
      if (data.length) {
        console.log(`Total words in topic '${topicId}/${subtopicId}': ${data.length}`);
      }
    } catch (error) {
      console.error(`Error loading vocabulary data for topic ${topicId}/${subtopicId}:`, error);
      setVocabularyItems([]);
    }
  };

  const currentItem = vocabularyItems[currentIndex];
  const currentTopic = topics.find((t) => t.id === selectedTopic);

  if (!selectedTopic) {
    return <TopicList topics={topics} onSelectTopic={setSelectedTopic} />;
  }

  if (!selectedSubtopic && currentTopic) {
    return (
      <SubtopicList
        topic={currentTopic}
        onSelectSubtopic={setSelectedSubtopic}
        onBack={() => setSelectedTopic(null)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            setSelectedSubtopic(null);
            setVocabularyItems([]);
            setCurrentIndex(0);
            setShowAnswer(false);
          }}
        >
          <Text style={styles.backButtonText}>← Back to {currentTopic?.title}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {currentTopic?.subtopics?.find((s) => s.id === selectedSubtopic)?.title}
        </Text>
      </View>
      {currentItem ? (
        <VocabularyCard
          item={currentItem}
          showAnswer={showAnswer}
          isTranslating={isTranslating}
          translatedWord={translatedWord}
          translatedSenses={translatedSenses}
          translationError={translationError}
          onShowAnswer={() => setShowAnswer(true)}
          onPrevious={() => {
            setShowAnswer(false);
            setCurrentIndex((prev) => (prev - 1 + vocabularyItems.length) % vocabularyItems.length);
          }}
          onNext={() => {
            setShowAnswer(false);
            setCurrentIndex((prev) => (prev + 1) % vocabularyItems.length);
          }}
          onPlaySound={(url) => playSound(url, setSound, sound)}
          onTranslate={() => translateSenses(
            currentItem.word,
            currentItem.senses[0].definition,
            setIsTranslating,
            setTranslationError,
            setTranslatedWord,
            setTranslatedSenses
          )}
          onResetTranslation={() => {
            setTranslatedSenses(null);
            setTranslatedWord(null);
          }}
          onRetryTranslation={() => translateSenses(
            currentItem.word,
            currentItem.senses[0].definition,
            setIsTranslating,
            setTranslationError,
            setTranslatedWord,
            setTranslatedSenses
          )}
        />
      ) : (
        <Text style={styles.loadingText}>Loading vocabulary data...</Text>
      )}
    </View>
  );
}