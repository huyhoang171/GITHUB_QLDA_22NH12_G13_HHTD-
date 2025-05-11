import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import quizzes from '../../assets/json/quiz/vocabulary.json'; // Static JSON import
import { useRouter } from 'expo-router';

// Quiz data type
type Quiz = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

const QuizScreen = () => {
  const [shuffledQuizzes, setShuffledQuizzes] = useState<Quiz[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    // Shuffle and pick 20 random questions on mount
    const shuffled = [...quizzes]
      .sort(() => Math.random() - 0.5)
      .slice(0, 20);
    setShuffledQuizzes(shuffled);
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
  };

  if (shuffledQuizzes.length === 0) {
    return <Text style={styles.loadingText}>Loading quizzes...</Text>;
  }

  if (current >= shuffledQuizzes.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.result}>✅ Quiz Completed!</Text>
        <Text style={styles.result}>Correct: {correctCount}</Text>
        <Text style={styles.result}>Incorrect: {wrongCount}</Text>

        <TouchableOpacity style={styles.button} onPress={handleRestart}>
          <Text style={styles.buttonText}>Restart Quiz</Text>
        </TouchableOpacity>
      </View>
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
    return {};
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.push('/quizzes')}>
        <Text style={styles.backText}>{'< Back to Quizzes'}</Text>
      </TouchableOpacity>

      {/* Question */}
      <Text style={styles.question}>
        Question {current + 1}: {currentQuiz.question}
      </Text>

      {/* Options */}
      <FlatList
        data={currentQuiz.options}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.option, getOptionStyle(item)]}
            onPress={() => handleSelect(item)}
            disabled={isSubmitted}
          >
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />

      {/* Submit Button */}
      {!isSubmitted && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={!selected}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      )}

      {/* Result Message */}
      {resultMessage && <Text style={styles.result}>{resultMessage}</Text>}

      {/* Next Button */}
      {isSubmitted && (
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {current < shuffledQuizzes.length - 1 ? 'Next' : 'Show Result'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#f9f9f9'
  },
  backText: {
    color: '#4A90E2',
    fontSize: 16,
    marginBottom: 10
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  option: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10
  },
  correctOption: {
    backgroundColor: '#4CAF50'
  },
  incorrectOption: {
    backgroundColor: '#f44336'
  },
  selectedOption: {
    backgroundColor: '#87cefa'
  },
  optionText: {
    fontSize: 18
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center'
  },
  loadingText: {
    marginTop: 50,
    fontSize: 18,
    textAlign: 'center'
  }
});

export default QuizScreen;
