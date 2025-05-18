import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Animated,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { VocabularyItem } from '../app/types/vocabularyType';
import { styles } from '../app/styles/vocabularyStyle';
import { vocabularyFiles } from '../constants/Topic';
import { translateSenses } from '../hooks/useVocabulary';

const COLORS = {
  primary: '#00C5CD',
  primaryLight: 'rgba(1, 132, 146, 0.15)',
  primaryUltraLight: 'rgba(4, 74, 82, 0.07)',
  secondary: '#20B2AA',
  text: '#2D3748',
  textLight: '#718096',
  background: '#FFFFFF',
  backgroundLight: '#F7FAFC',
  error: '#FF6B6B',
  white: '#FFFFFF',
  red: '#FF0000',
  blue: '#0000FF',
};

interface VocabularyCardProps {
  item: VocabularyItem;
  showAnswer: boolean;
  isTranslating: boolean;
  translatedWord: string | null;
  translatedSenses: string | null;
  translationError: string | null;
  onShowAnswer: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onPlaySound: (url: string) => void;
  onTranslate: () => void;
  onResetTranslation: () => void;
  onRetryTranslation: () => void;
  currentTopic: string;
  isPreviousDisabled: boolean;
  wordIndex: number; // Prop mới để hiển thị số thứ tự
  setShowAnswer: (show: boolean) => void;
  setTranslationError: (error: string | null) => void;
  setIsTranslating: (isTranslating: boolean) => void;
  setTranslatedWord: (word: string | null) => void;
  setTranslatedSenses: (senses: string | null) => void;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  item,
  showAnswer,
  isTranslating,
  translatedWord,
  translatedSenses,
  translationError,
  onShowAnswer,
  onPrevious,
  onNext,
  onPlaySound,
  onTranslate,
  onResetTranslation,
  onRetryTranslation,
  currentTopic,
  isPreviousDisabled,
  wordIndex,
  setShowAnswer,
  setTranslationError,
  setIsTranslating,
  setTranslatedWord,
  setTranslatedSenses,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<VocabularyItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSearchItem, setSelectedSearchItem] = useState<VocabularyItem | null>(null);

  const searchVocabulary = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const results: VocabularyItem[] = [];
    const searchTerm = query.toLowerCase();

    const currentTopicData = vocabularyFiles[currentTopic];
    if (currentTopicData) {
      Object.entries(currentTopicData).forEach(([subtopic, words]) => {
        if (Array.isArray(words)) {
          words.forEach((word: VocabularyItem) => {
            if (word.word.toLowerCase().includes(searchTerm)) {
              results.push(word);
              console.log(`Found word: ${word.word} in subtopic: ${subtopic}`);
            }
          });
        }
      });
    }

    console.log(`Total words found in topic ${currentTopic}: ${results.length}`);
    console.log('Found words:', results.map(word => word.word).join(', '));
    
    setSearchResults(results);
    setIsSearching(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchVocabulary(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSelectSearchItem = (selectedItem: VocabularyItem) => {
    setSelectedSearchItem(selectedItem);
    setSearchQuery('');
    setSearchResults([]);
    setShowAnswer(false);
    onResetTranslation();
    setTranslationError(null);
    setIsTranslating(false);
  };

  const displayItem = selectedSearchItem || item;

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.containerVocabularyCard}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm từ vựng..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => {
              setShowAnswer(false);
              onResetTranslation();
              setTranslationError(null);
              setIsTranslating(false);
            }}
          />
          <FontAwesome5 name="search" size={20} color={COLORS.primary} style={styles.searchIcon} />
        </View>

        {searchQuery && (
          <View style={styles.searchResultsContainer}>
            {isSearching ? (
              <ActivityIndicator size="small" color={COLORS.primary} />
            ) : searchResults.length > 0 ? (
              <ScrollView 
                style={styles.searchResultsScrollView}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
              >
                {searchResults.map((result, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.searchResultItem}
                    onPress={() => handleSelectSearchItem(result)}
                  >
                    <Text style={styles.searchResultText}>{result.word}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.noResultsText}>Không tìm thấy kết quả</Text>
            )}
          </View>
        )}

        <View style={styles.card}>
          <View style={styles.wordHeader}>
            {!selectedSearchItem && (
              <Text style={styles.wordIndex}>#{wordIndex}</Text> // Hiển thị số thứ tự
            )}
            <Text style={styles.word}>{displayItem.word}</Text>
            {isTranslating ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={COLORS.primary} />
              </View>
            ) : translatedWord ? (
              <Text style={styles.wordVN}>{translatedWord}</Text>
            ) : null}
          </View>

          <View style={styles.pronunciationContainer}>
            <View style={styles.pronunciationCard}>
              <View style={styles.pronunciationHeader}>
                <Text style={styles.pronunciationLabel}>UK</Text>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={() => onPlaySound(displayItem.phonetic)}
                >
                  <FontAwesome5 name="volume-up" size={18} color={COLORS.red} />
                </TouchableOpacity>
              </View>
              <Text style={styles.phoneticText}>{displayItem.phonetic_text}</Text>
            </View>

            <View style={styles.pronunciationCard}>
              <View style={styles.pronunciationHeader}>
                <Text style={styles.pronunciationLabel}>US</Text>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={() => onPlaySound(displayItem.phonetic_am)}
                >
                  <FontAwesome5 name="volume-up" size={18} color={COLORS.red} />
                </TouchableOpacity>
              </View>
              <Text style={styles.phoneticText}>{displayItem.phonetic_am_text}</Text>
            </View>
          </View>

          {showAnswer ? (
            <View style={styles.contentSection}>
              <View style={styles.definitionBox}>
                <Text style={styles.meaning}>{displayItem.senses[0].definition}</Text>
              </View>

              {isTranslating ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={COLORS.primary} />
                  <Text style={styles.loadingText}>Đang dịch...</Text>
                </View>
              ) : translationError ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{translationError}</Text>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => translateSenses(
                      displayItem.word,
                      displayItem.senses[0].definition,
                      setIsTranslating,
                      setTranslationError,
                      setTranslatedWord,
                      setTranslatedSenses
                    )}
                  >
                    <Text style={styles.actionButtonText}>Thử lại</Text>
                  </TouchableOpacity>
                </View>
              ) : translatedSenses ? (
                <>
                  <View style={styles.translatedBox}>
                    <Text style={styles.translatedText}>{translatedSenses}</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.examplesButton]}
                    onPress={onResetTranslation}
                  >
                    <FontAwesome5 name="list" size={16} color={COLORS.white} />
                    <Text style={styles.actionButtonText}>Xem ví dụ</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <View style={styles.examplesContainer}>
                    {displayItem.senses[0].examples.map((example, index) => (
                      <View key={index} style={styles.exampleItem}>
                        <FontAwesome5 name="quote-left" size={12} color={COLORS.primary} style={styles.quoteIcon} />
                        <Text style={styles.example}>{example.x}</Text>
                      </View>
                    ))}
                  </View>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.translateButton]}
                    onPress={() => translateSenses(
                      displayItem.word,
                      displayItem.senses[0].definition,
                      setIsTranslating,
                      setTranslationError,
                      setTranslatedWord,
                      setTranslatedSenses
                    )}
                  >
                    <FontAwesome5 name="language" size={16} color={COLORS.white} />
                    <Text style={styles.actionButtonText}>Dịch</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          ) : (
            <TouchableOpacity
              style={styles.showAnswerButton}
              onPress={onShowAnswer}
            >
              <FontAwesome5 name="eye" size={18} color={COLORS.white} style={styles.buttonIcon} />
              <Text style={styles.showAnswerText}>Xem nghĩa</Text>
            </TouchableOpacity>
          )}

          {!selectedSearchItem ? (
            <View style={styles.navigationButtons}>
              <TouchableOpacity
                style={[styles.navButton, styles.prevButton, isPreviousDisabled && styles.disabledButton]}
                onPress={onPrevious}
                disabled={isPreviousDisabled}
              >
                <FontAwesome5 name="chevron-left" size={16} color={COLORS.primary} />
                <Text style={styles.navButtonText}>Trước</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navButton, styles.nextButton]} onPress={onNext}>
                <Text style={styles.navButtonText}>Tiếp</Text>
                <FontAwesome5 name="chevron-right" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={[styles.navButton, styles.allButton]} 
              onPress={() => {
                setSelectedSearchItem(null);
                onResetTranslation();
                setShowAnswer(false);
              }}
            >
              <FontAwesome5 name="list" size={16} color={COLORS.white} />
              <Text style={[styles.navButtonText, styles.allButtonText]}>Xem tất cả</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};