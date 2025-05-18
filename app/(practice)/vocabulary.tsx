import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  const saveProgress = async (subtopicId: string, index: number) => {
    try {
      const progressListJson = await AsyncStorage.getItem('progressList');
      let progressList = progressListJson ? JSON.parse(progressListJson) : [];
      const progressIndex = progressList.findIndex(
        (item: { subtopicId: string }) => item.subtopicId === subtopicId
      );
      const currentProgress = progressIndex !== -1 ? progressList[progressIndex].progress : 0;

      if (index > currentProgress) {
        if (progressIndex !== -1) {
          progressList[progressIndex].progress = index;
        } else {
          progressList.push({ subtopicId, progress: index });
        }
        await AsyncStorage.setItem('progressList', JSON.stringify(progressList));
      }
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const loadProgress = async (subtopicId: string) => {
    try {
      const progressListJson = await AsyncStorage.getItem('progressList');
      const progressList = progressListJson ? JSON.parse(progressListJson) : [];
      const progressItem = progressList.find(
        (item: { subtopicId: string }) => item.subtopicId === subtopicId
      );
      return progressItem ? progressItem.progress : 0;
    } catch (error) {
      console.error("Error loading progress:", error);
      return 0;
    }
  };

  const loadVocabularyData = async (topicId: string, subtopicId: string) => {
    try {
      setShowAnswer(false);
      const data = vocabularyFiles[topicId]?.[subtopicId] || [];
      setVocabularyItems(data);
      const savedIndex = await loadProgress(subtopicId);
      setCurrentIndex(Math.min(savedIndex, data.length - 1));
    } catch (error) {
      console.error(`Error loading vocabulary data for ${topicId}/${subtopicId}:`, error);
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

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % vocabularyItems.length;
    setCurrentIndex(nextIndex);
    setShowAnswer(false);
    if (selectedSubtopic) {
      saveProgress(selectedSubtopic, nextIndex);
    }
  };

  const handlePrevious = () => {
    if (currentIndex === 0) return;
    const prevIndex = (currentIndex - 1 + vocabularyItems.length) % vocabularyItems.length;
    setCurrentIndex(prevIndex);
    setShowAnswer(false);
    if (selectedSubtopic) {
      saveProgress(selectedSubtopic, prevIndex);
    }
  };

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
            setTranslatedSenses(null);
            setTranslatedWord(null);
            setTranslationError(null);
            setIsTranslating(false);
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
          onPrevious={handlePrevious}
          onNext={handleNext}
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
          currentTopic={selectedTopic || ''}
          isPreviousDisabled={currentIndex === 0}
          wordIndex={currentIndex + 1} // Truyền số thứ tự (bắt đầu từ 1)
          setShowAnswer={setShowAnswer}
          setTranslationError={setTranslationError}
          setIsTranslating={setIsTranslating}
          setTranslatedWord={setTranslatedWord}
          setTranslatedSenses={setTranslatedSenses}
        />
      ) : (
        <Text style={styles.loadingText}>Loading vocabulary data...</Text>
      )}
    </View>
  );
}