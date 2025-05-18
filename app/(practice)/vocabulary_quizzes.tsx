import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  Image
} from 'react-native';
import quizzes from '../../assets/json/quiz/vocabulary.json';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Quiz data type
type Quiz = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

const { width } = Dimensions.get('window');

const QuizScreen = () => {
  const [shuffledQuizzes, setShuffledQuizzes] = useState<Quiz[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    // Simulate loading time for better UX
    setTimeout(() => {
      // Shuffle and pick 20 random questions
      const shuffled = [...quizzes]
        .sort(() => Math.random() - 0.5)
        .slice(0, 20);
      setShuffledQuizzes(shuffled);
      setLoading(false);
    }, 800);
  }, []);

  const handleSelect = (option: string) => {
    if (!isSubmitted) {
      setSelected(option);
      setResultMessage(null);
    }
  };

  const handleSubmit = () => {
    if (!selected) {
      setResultMessage("Please select an option.");
      return;
    }

    const currentQuiz = shuffledQuizzes[current];
    const isCorrect = currentQuiz.answer === selected;

    setResultMessage(
      isCorrect
        ? `🎉 Correct! The answer is "${currentQuiz.answer}".`
        : `❌ Incorrect! The correct answer is "${currentQuiz.answer}".`
    );

    setCorrectCount((prev) => prev + (isCorrect ? 1 : 0));
    setWrongCount((prev) => prev + (!isCorrect ? 1 : 0));
    setIsSubmitted(true);
  };

  const handleNext = () => {
    setSelected(null);
    setResultMessage(null);
    setIsSubmitted(false);

    if (current < shuffledQuizzes.length - 1) {
      setCurrent(current + 1);
    } else {
      // End of quiz
      setCurrent(current + 1); // To trigger result display
    }
  };

  const handleRestart = () => {
    setLoading(true);
    setTimeout(() => {
      const shuffled = [...quizzes]
        .sort(() => Math.random() - 0.5)
        .slice(0, 20);
      setShuffledQuizzes(shuffled);
      setCurrent(0);
      setSelected(null);
      setIsSubmitted(false);
      setCorrectCount(0);
      setWrongCount(0);
      setResultMessage(null);
      setLoading(false);
    }, 800);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f9ff" />
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Loading questions...</Text>
      </SafeAreaView>
    );
  }

  if (shuffledQuizzes.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f9ff" />
        <Text style={styles.errorText}>Failed to load questions. Please try again.</Text>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={handleRestart}
        >
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (current >= shuffledQuizzes.length) {
    // Calculate score percentage
    const scorePercentage = Math.round((correctCount / shuffledQuizzes.length) * 100);
    
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f9ff" />
        <View style={styles.resultContainer}>
          <Text style={styles.completedTitle}>✅ Quiz Completed!</Text>
          
          <View style={styles.scoreCard}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scorePercentage}>{scorePercentage}%</Text>
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                <Text style={styles.statText}>Correct: {correctCount}</Text>
              </View>
              
              <View style={styles.statItem}>
                <Ionicons name="close-circle" size={24} color="#f44336" />
                <Text style={styles.statText}>Incorrect: {wrongCount}</Text>
              </View>
              
              <View style={styles.statItem}>
                <Ionicons name="help-circle" size={24} color="#FFC107" />
                <Text style={styles.statText}>Total: {shuffledQuizzes.length}</Text>
              </View>
            </View>
          </View>

          {scorePercentage >= 80 ? (
            <Text style={styles.encouragementText}>Excellent! You did great.</Text>
          ) : scorePercentage >= 60 ? (
            <Text style={styles.encouragementText}>Good job! Keep practicing.</Text>
          ) : (
            <Text style={styles.encouragementText}>Keep studying and try again!</Text>
          )}

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
              <Ionicons name="refresh" size={20} color="#fff" />
              <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.homeButton} 
              onPress={() => router.push('/quizzes')}
            >
              <Ionicons name="home" size={20} color="#fff" />
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuiz = shuffledQuizzes[current];

  const getOptionStyle = (option: string) => {
    if (isSubmitted) {
      if (option === currentQuiz.answer) return styles.correctOption;
      if (option === selected && option !== currentQuiz.answer)
        return styles.incorrectOption;
    }
    if (option === selected) return styles.selectedOption;
    return styles.option;
  };

  const getOptionTextStyle = (option: string) => {
    if (isSubmitted) {
      if (option === currentQuiz.answer) return styles.correctOptionText;
      if (option === selected && option !== currentQuiz.answer)
        return styles.incorrectOptionText;
    }
    return styles.optionText;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f9ff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.push('/quizzes')}
        >
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((current + 1) / shuffledQuizzes.length) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {current + 1}/{shuffledQuizzes.length}
          </Text>
        </View>
      </View>

      <View style={styles.quizContainer}>
        {/* Score counter */}
        <View style={styles.scoreCounter}>
          <View style={styles.scoreItem}>
            <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
            <Text style={styles.scoreItemText}>{correctCount}</Text>
          </View>
          <View style={styles.scoreItem}>
            <Ionicons name="close-circle" size={18} color="#f44336" />
            <Text style={styles.scoreItemText}>{wrongCount}</Text>
          </View>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>Question {current + 1}</Text>
          <Text style={styles.question}>{currentQuiz.question}</Text>
        </View>

        {/* Options */}
        <FlatList
          data={currentQuiz.options}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.optionContainer, getOptionStyle(item)]}
              onPress={() => handleSelect(item)}
              disabled={isSubmitted}
              activeOpacity={0.7}
            >
              <Text style={getOptionTextStyle(item)}>{item}</Text>
              {isSubmitted && item === currentQuiz.answer && (
                <Ionicons name="checkmark-circle" size={22} color="#fff" style={styles.iconRight} />
              )}
              {isSubmitted && item === selected && item !== currentQuiz.answer && (
                <Ionicons name="close-circle" size={22} color="#fff" style={styles.iconRight} />
              )}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          style={styles.optionsList}
          showsVerticalScrollIndicator={false}
        />

        {/* Result Message */}
        {resultMessage && (
          <View style={styles.resultMessageContainer}>
            <Text style={styles.resultMessage}>{resultMessage}</Text>
          </View>
        )}

        {/* Action Button */}
        {!isSubmitted ? (
          <TouchableOpacity
            style={[
              styles.actionButton,
              !selected && styles.disabledButton
            ]}
            onPress={handleSubmit}
            disabled={!selected}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>Check Answer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>
              {current < shuffledQuizzes.length - 1 ? 'Next Question' : 'Show Results'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9ff'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f9ff'
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: '#4A90E2',
    fontWeight: '500'
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#f44336',
    margin: 20
  },
  retryButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignSelf: 'center'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#4A90E2',
    fontSize: 16,
    marginLeft: 4,
    fontWeight: '500'
  },
  progressContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  progressBar: {
    height: 6,
    width: 100,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 3
  },
  progressText: {
    fontSize: 14,
    color: '#555555',
    fontWeight: '500'
  },
  quizContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  scoreCounter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  scoreItemText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  questionContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  questionNumber: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
    marginBottom: 8
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    lineHeight: 26
  },
  optionsList: {
    marginBottom: 16
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  option: {
    backgroundColor: 'white',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
    flex: 1
  },
  selectedOption: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderColor: '#4A90E2',
  },
  correctOption: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: '#f44336',
    borderColor: '#f44336',
  },
  correctOptionText: {
    color: 'white',
    fontWeight: '600',
  },
  incorrectOptionText: {
    color: 'white',
    fontWeight: '600',
  },
  iconRight: {
    marginLeft: 10
  },
  resultMessageContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2'
  },
  resultMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
    fontWeight: '500'
  },
  actionButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 8
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 8
  },
  resultContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  completedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 24,
    textAlign: 'center'
  },
  scoreCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  scorePercentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white'
  },
  statsContainer: {
    width: '100%',
    marginTop: 16
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  statText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333333',
    fontWeight: '500'
  },
  encouragementText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 32,
    textAlign: 'center'
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  restartButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 8
  },
  homeButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 8
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  }
});

export default QuizScreen;