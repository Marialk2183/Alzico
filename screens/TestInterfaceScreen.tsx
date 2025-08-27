import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type TestInterfaceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TestInterface'>;
type TestInterfaceScreenRouteProp = RouteProp<RootStackParamList, 'TestInterface'>;

const TestInterfaceScreen = () => {
  const navigation = useNavigation<TestInterfaceScreenNavigationProp>();
  const route = useRoute<TestInterfaceScreenRouteProp>();
  const { testId, testName } = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Initialize questions based on test type
    if (testId === 'memory') {
      setQuestions([
        'What is the capital of France?',
        'What is the largest planet in our solar system?',
        'What is the name of the first president of the United States?',
        'What is the name of the first president of the United States?',
        'What is the name of the first president of the United States?',
      ]);
    } else if (testId === 'attention') {
      setQuestions([
        'Focus on the number 7',
        'Count the number of times the letter A appears in the sentence: "The quick brown fox jumps over the lazy dog"',
        'Focus on the number 3',
        'Count the number of times the letter E appears in the sentence: "The quick brown fox jumps over the lazy dog"',
        'Focus on the number 5',
      ]);
    } else {
      setQuestions([
        'Question 1',
        'Question 2',
        'Question 3',
        'Question 4',
        'Question 5',
      ]);
    }
  }, [testId]);

  const handleAnswer = (answer: string) => {
    // Simple scoring logic
    if (answer === 'correct') {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Test completed
      const finalScore = Math.round((score / questions.length) * 100);
      navigation.navigate('Results', { testId, testName, score: finalScore });
    }
  };

  const handleBackToMain = () => {
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>{testName}</Text>
          <Text style={styles.subtitle}>Question {currentQuestion + 1} of {questions.length}</Text>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{questions[currentQuestion]}</Text>
        </View>

        <View style={styles.answerContainer}>
          <TouchableOpacity
            style={styles.answerButton}
            onPress={() => handleAnswer('correct')}
          >
            <Text style={styles.answerButtonText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.answerButton}
            onPress={() => handleAnswer('incorrect')}
          >
            <Text style={styles.answerButtonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToMain}
        >
          <Text style={styles.backButtonText}>Back to Main</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  questionContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  questionText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  answerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  answerButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  answerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TestInterfaceScreen; 