import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { VocabularyItem } from '../app/types/vocabularyType';
import { styles } from '../app/styles/vocabularyStyle';

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
}) => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.card}>
        <Text style={styles.word}>{item.word}</Text>
        {isTranslating ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#28a745" />
          </View>
        ) : translatedWord ? (
          <Text style={styles.wordVN}>{translatedWord}</Text>
        ) : null}

        <View style={styles.pronunciationContainer}>
          <View style={styles.pronunciation}>
            <Text style={styles.pronunciationLabel}>UK:</Text>
            <Text style={styles.phoneticText}>{item.phonetic_text}</Text>
            <TouchableOpacity
              style={styles.playButtonUK}
              onPress={() => onPlaySound(item.phonetic)}
            >
              <FontAwesome name="volume-up" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.pronunciation}>
            <Text style={styles.pronunciationLabel}>US:</Text>
            <Text style={styles.phoneticText}>{item.phonetic_am_text}</Text>
            <TouchableOpacity
              style={styles.playButtonUS}
              onPress={() => onPlaySound(item.phonetic_am)}
            >
              <FontAwesome name="volume-up" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {showAnswer ? (
          <>
            <Text style={styles.meaning}>{item.senses[0].definition}</Text>
            {isTranslating ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#28a745" />
                <Text style={styles.loadingText}>Đang dịch...</Text>
              </View>
            ) : translationError ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{translationError}</Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={onRetryTranslation}
                >
                  <Text style={styles.retryButtonText}>Thử lại</Text>
                </TouchableOpacity>
              </View>
            ) : translatedSenses ? (
              <>
                <Text style={styles.translatedText}>{translatedSenses}</Text>
                <TouchableOpacity
                  style={styles.showExamplesButton}
                  onPress={onResetTranslation}
                >
                  <Text style={styles.showExamplesButtonText}>Xem ví dụ</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {item.senses[0].examples.map((example, index) => (
                  <Text key={index} style={styles.example}>
                    {example.x}
                  </Text>
                ))}
                <TouchableOpacity
                  style={styles.translateButton}
                  onPress={onTranslate}
                >
                  <Text style={styles.translateButtonText}>Dịch</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        ) : (
          <TouchableOpacity
            style={styles.showAnswerButton}
            onPress={onShowAnswer}
          >
            <Text style={styles.showAnswerText}>Show Answer</Text>
          </TouchableOpacity>
        )}

        <View style={styles.navigationButtons}>
          <TouchableOpacity style={styles.button} onPress={onPrevious}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};