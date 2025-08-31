import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getTestById, CognitiveTest, TestQuestion } from '../utils/cognitiveTests';
import { TestResultsManager } from '../utils/testResults';
import EnhancedTestInterface from '../components/EnhancedTestInterface';

type TestInterfaceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TestInterface'>;
type TestInterfaceScreenRouteProp = RouteProp<RootStackParamList, 'TestInterface'>;

const { width, height } = Dimensions.get('window');

const TestInterfaceScreen = () => {
  const navigation = useNavigation<TestInterfaceScreenNavigationProp>();
  const route = useRoute<TestInterfaceScreenRouteProp>();
  const { testId, testName } = route.params;
  
  const [test, setTest] = useState<CognitiveTest | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [testStartTime, setTestStartTime] = useState<Date | null>(null);
  const [testDuration, setTestDuration] = useState(0);

  useEffect(() => {
    loadTest();
  }, [testId]);

  useEffect(() => {
    if (isTestStarted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && isTestStarted) {
      handleTimeUp();
    }
  }, [timeRemaining, isTestStarted]);

  // Update test duration
  useEffect(() => {
    if (isTestStarted && testStartTime) {
      const interval = setInterval(() => {
        const duration = Math.floor((new Date().getTime() - testStartTime.getTime()) / 1000 / 60);
        setTestDuration(duration);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTestStarted, testStartTime]);

  const loadTest = () => {
    try {
      const testData = getTestById(testId);
      if (testData) {
        setTest(testData);
        if (testData.questions[0]?.timeLimit) {
          setTimeRemaining(testData.questions[0].timeLimit);
        }
      }
    } catch (error) {
      console.error('Error loading test:', error);
    } finally {
      setLoading(false);
    }
  };

  const startTest = () => {
    setIsTestStarted(true);
    setTestStartTime(new Date());
    if (test?.questions[0]?.timeLimit) {
      setTimeRemaining(test.questions[0].timeLimit);
    }
  };

  const handleTimeUp = () => {
    Alert.alert(
      'Time Up!',
      'Time limit reached for this question. Moving to next question.',
      [
        {
          text: 'OK',
          onPress: () => handleNextQuestion()
        }
      ]
    );
  };

  const handleAnswerSubmit = (answer: any) => {
    if (!test) return;

    const currentQuestion = test.questions[currentQuestionIndex];
    if (!currentQuestion) return;

    // Store the answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));

    // Calculate score for this question
    let questionScore = 0;
    if (currentQuestion.type === 'multiple-choice') {
      questionScore = answer === currentQuestion.correctAnswer ? currentQuestion.points : 0;
    } else if (currentQuestion.type === 'text-input' || currentQuestion.type === 'recall') {
      // For text input, give partial credit for close answers
      if (typeof answer === 'string' && answer.trim().length > 0) {
        questionScore = currentQuestion.points;
      }
    } else if (currentQuestion.type === 'drawing') {
      // For drawing, give credit if drawing exists or description provided
      if (answer.drawing && answer.drawing.length > 0) {
        questionScore = currentQuestion.points;
      } else if (answer.description && answer.description.trim().length > 0) {
        questionScore = Math.round(currentQuestion.points * 0.5);
      }
    } else if (currentQuestion.type === 'sequence') {
      // For sequence, give credit based on steps completed
      if (answer.steps && answer.steps.length > 0) {
        questionScore = Math.min(currentQuestion.points, answer.steps.length);
      }
    } else if (currentQuestion.type === 'timed') {
      // For timed questions, score based on performance
      if (answer.text && answer.text.trim().length > 0) {
        const timeRatio = Math.max(0, 1 - (answer.timeSpent / (currentQuestion.timeLimit || 1)));
        questionScore = Math.round(currentQuestion.points * timeRatio);
      }
    } else {
      // For other question types, give full credit for any answer
      questionScore = currentQuestion.points;
    }

    setScore(prev => prev + questionScore);
  };

  const handleNextQuestion = () => {
    if (test && currentQuestionIndex < test.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      const nextQuestion = test.questions[nextIndex];
      if (nextQuestion?.timeLimit) {
        setTimeRemaining(nextQuestion.timeLimit);
      }
    } else {
      completeTest();
    }
  };

  const handlePreviousQuestion = () => {
    if (test && currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      const prevQuestion = test.questions[prevIndex];
      if (prevQuestion?.timeLimit) {
        setTimeRemaining(prevQuestion.timeLimit);
      }
    }
  };

  const completeTest = async () => {
    try {
      setIsTestCompleted(true);
      const finalScore = Math.round((score / (test?.scoring.totalPoints || 1)) * 100);
      
      // Save test results
      const testResultsManager = new TestResultsManager();
      const testResult = {
        testId,
        testName: test?.name || testName,
        userId: 'current_user', // TODO: Get from auth context
        score: score,
        maxScore: test?.scoring.totalPoints || 100,
        percentage: finalScore,
        severity: determineSeverity(finalScore, test),
        duration: testDuration,
        date: new Date().toISOString().split('T')[0],
        testNumber: 1, // TODO: Get from user's test history
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          userAnswer: answer,
          timestamp: new Date()
        }))
      };

      await testResultsManager.addResult(testResult);
      
      // Navigate to results
      navigation.navigate('Results', {
        testId,
        testName,
        score: finalScore
      });
    } catch (error) {
      console.error('Error completing test:', error);
      Alert.alert(
        'Error',
        'There was an error saving your test results. Please try again.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Results', {
              testId,
              testName,
              score: Math.round((score / (test?.scoring.totalPoints || 1)) * 100)
            })
          }
        ]
      );
    }
  };

  const determineSeverity = (score: number, testData: CognitiveTest | null): string => {
    if (!testData) return 'Unknown';
    
    const { cutoffScores } = testData.scoring;
    
    if (testData.id === 'adas-cog13') {
      // ADAS-Cog13: Lower scores are better
      if (score <= cutoffScores.mild) return 'Normal';
      if (score <= cutoffScores.moderate) return 'Mild';
      if (score <= cutoffScores.severe) return 'Moderate';
      return 'Severe';
    } else {
      // Other tests: Higher scores are better
      if (score >= cutoffScores.normal) return 'Normal';
      if (score >= cutoffScores.mild) return 'Mild';
      if (score >= cutoffScores.moderate) return 'Moderate';
      return 'Severe';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading test...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!test) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Test not found</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!isTestStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* Test Introduction */}
          <View style={styles.introContainer}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoIcon}>🧠</Text>
              <Text style={styles.logoText}>Alzico</Text>
            </View>
            
            <Text style={styles.testTitle}>{test.fullName}</Text>
            <Text style={styles.testDescription}>{test.description}</Text>
            
            <View style={styles.testInfoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Category:</Text>
                <Text style={styles.infoValue}>{test.category}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Duration:</Text>
                <Text style={styles.infoValue}>{test.duration} minutes</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Difficulty:</Text>
                <Text style={styles.infoValue}>{test.difficulty}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Questions:</Text>
                <Text style={styles.infoValue}>{test.questions.length}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Max Score:</Text>
                <Text style={styles.infoValue}>{test.maxScore} points</Text>
              </View>
            </View>

            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsTitle}>📋 Instructions:</Text>
              <Text style={styles.instructionsText}>{test.instructions}</Text>
            </View>

            <View style={styles.warningContainer}>
              <Text style={styles.warningTitle}>⚠️ Important:</Text>
              <Text style={styles.warningText}>
                • Find a quiet environment for the test{'\n'}
                • Ensure you have enough time to complete{'\n'}
                • Answer all questions to the best of your ability{'\n'}
                • Don't rush - accuracy is more important than speed
              </Text>
            </View>

            <TouchableOpacity
              style={styles.startButton}
              onPress={startTest}
              activeOpacity={0.8}
            >
              <Text style={styles.startButtonText}>Start Test</Text>
              <Text style={styles.startButtonIcon}>🚀</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (isTestCompleted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completedContainer}>
          <Text style={styles.completedTitle}>Test Completed!</Text>
          <Text style={styles.completedText}>
            Redirecting to results...
          </Text>
          <ActivityIndicator size="large" color="#4A90E2" style={{ marginTop: 20 }} />
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = test.questions[currentQuestionIndex];
  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Question not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <EnhancedTestInterface
        test={test}
        currentQuestion={currentQuestion}
        questionIndex={currentQuestionIndex}
        totalQuestions={test.questions.length}
        timeRemaining={timeRemaining}
        onAnswerSubmit={handleAnswerSubmit}
        onNextQuestion={handleNextQuestion}
        onPreviousQuestion={handlePreviousQuestion}
        answers={answers}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  introContainer: {
    padding: 24,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoIcon: {
    fontSize: 48,
    marginRight: 12,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  testTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 32,
  },
  testDescription: {
    fontSize: 16,
    color: '#B0B0B0',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 350,
  },
  testInfoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    color: '#888',
    fontSize: 14,
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  instructionsContainer: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    width: '100%',
  },
  instructionsTitle: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  instructionsText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  warningContainer: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    width: '100%',
  },
  warningTitle: {
    color: '#FFC107',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  warningText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 12,
  },
  startButtonIcon: {
    fontSize: 24,
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  completedTitle: {
    color: '#34C759',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  completedText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default TestInterfaceScreen; 