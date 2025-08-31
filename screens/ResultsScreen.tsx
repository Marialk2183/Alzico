import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getTestById, CognitiveTest } from '../utils/cognitiveTests';
import { TestResultsManager, TestResult } from '../utils/testResults';

type ResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Results'>;
type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

const { width, height } = Dimensions.get('window');

const ResultsScreen = () => {
  const navigation = useNavigation<ResultsScreenNavigationProp>();
  const route = useRoute<ResultsScreenRouteProp>();
  const { testId, testName, score } = route.params;
  
  const [test, setTest] = useState<CognitiveTest | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDetailedResults, setShowDetailedResults] = useState(false);

  useEffect(() => {
    loadTestData();
  }, [testId]);

  const loadTestData = async () => {
    try {
      // Load test definition
      const testData = getTestById(testId);
      if (testData) {
        setTest(testData);
      }

      // Load test result
      const testResultsManager = new TestResultsManager();
      await testResultsManager.loadResults();
      const results = testResultsManager.getResultsByTest(testId);
      if (results.length > 0) {
        // Get the most recent result
        const latestResult = results[results.length - 1];
        setTestResult(latestResult);
      }
    } catch (error) {
      console.error('Error loading test data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'normal':
        return '#34C759';
      case 'mild':
        return '#FFC107';
      case 'moderate':
        return '#FF9500';
      case 'severe':
        return '#FF3B30';
      default:
        return '#888';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'normal':
        return '✅';
      case 'mild':
        return '⚠️';
      case 'moderate':
        return '🔶';
      case 'severe':
        return '🚨';
      default:
        return '❓';
    }
  };

  const getInterpretation = (severity: string) => {
    if (!test) return '';
    
    const { interpretation } = test;
    switch (severity.toLowerCase()) {
      case 'normal':
        return interpretation.normal;
      case 'mild':
        return interpretation.mild;
      case 'moderate':
        return interpretation.moderate;
      case 'severe':
        return interpretation.severe;
      default:
        return interpretation.normal;
    }
  };

  const getRecommendations = (severity: string) => {
    if (!test) return [];
    
    return test.interpretation.recommendations || [];
  };

  const handleRetakeTest = () => {
    Alert.alert(
      'Retake Test',
      'Are you sure you want to retake this test? Your previous results will be saved.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Retake', 
          onPress: () => navigation.navigate('TestInterface', { testId, testName })
        }
      ]
    );
  };

  const handleViewHistory = () => {
    navigation.navigate('History');
  };

  const handleShareResults = () => {
    Alert.alert(
      'Share Results',
      'This feature will allow you to share your test results with healthcare providers or family members.',
      [{ text: 'OK' }]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading results...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!test || !testResult) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Results not found</Text>
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

  const severity = testResult.severity || 'Unknown';
  const severityColor = getSeverityColor(severity);
  const severityIcon = getSeverityIcon(severity);
  const interpretation = getInterpretation(severity);
  const recommendations = getRecommendations(severity);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🧠</Text>
            <Text style={styles.logoText}>Alzico</Text>
          </View>
          <Text style={styles.headerTitle}>Test Results</Text>
        </View>

        {/* Test Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.testName}>{test.fullName}</Text>
          <Text style={styles.testDescription}>{test.description}</Text>
          
          <View style={styles.scoreContainer}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreText}>{testResult.percentage}%</Text>
              <Text style={styles.scoreLabel}>Score</Text>
            </View>
            
            <View style={styles.scoreDetails}>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>Raw Score:</Text>
                <Text style={styles.scoreValue}>{testResult.score}/{testResult.maxScore}</Text>
              </View>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>Duration:</Text>
                <Text style={styles.scoreValue}>{testResult.duration} min</Text>
              </View>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>Date:</Text>
                <Text style={styles.scoreValue}>{testResult.date}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Severity Assessment */}
        <View style={styles.severityContainer}>
          <Text style={styles.sectionTitle}>Cognitive Assessment</Text>
          <View style={[styles.severityCard, { borderColor: severityColor }]}>
            <View style={styles.severityHeader}>
              <Text style={styles.severityIcon}>{severityIcon}</Text>
              <Text style={[styles.severityText, { color: severityColor }]}>
                {severity} Cognitive Function
              </Text>
            </View>
            <Text style={styles.interpretationText}>{interpretation}</Text>
          </View>
        </View>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <View style={styles.recommendationsContainer}>
            <Text style={styles.sectionTitle}>Recommendations</Text>
            <View style={styles.recommendationsCard}>
              {recommendations.map((recommendation, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <Text style={styles.recommendationBullet}>•</Text>
                  <Text style={styles.recommendationText}>{recommendation}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Detailed Results Toggle */}
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowDetailedResults(!showDetailedResults)}
        >
          <Text style={styles.toggleButtonText}>
            {showDetailedResults ? 'Hide' : 'Show'} Detailed Results
          </Text>
          <Text style={styles.toggleIcon}>
            {showDetailedResults ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>

        {/* Detailed Results */}
        {showDetailedResults && testResult.answers && (
          <View style={styles.detailedResultsContainer}>
            <Text style={styles.sectionTitle}>Question Analysis</Text>
            {testResult.answers.map((answer, index) => {
              const question = test.questions.find(q => q.id === answer.questionId);
              return (
                <View key={index} style={styles.questionResult}>
                  <Text style={styles.questionNumber}>Q{index + 1}</Text>
                  <Text style={styles.questionText}>
                    {question?.question || 'Question not found'}
                  </Text>
                  <View style={styles.answerContainer}>
                    <Text style={styles.answerLabel}>Your Answer:</Text>
                    <Text style={styles.answerText}>
                      {typeof answer.userAnswer === 'string' 
                        ? answer.userAnswer 
                        : JSON.stringify(answer.userAnswer)
                      }
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleRetakeTest}
          >
            <Text style={styles.actionButtonText}>🔄 Retake Test</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleViewHistory}
          >
            <Text style={styles.actionButtonText}>📊 View History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleShareResults}
          >
            <Text style={styles.actionButtonText}>📤 Share Results</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Results are for informational purposes only. Consult with healthcare professionals for medical advice.
          </Text>
        </View>
      </ScrollView>
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
  header: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoIcon: {
    fontSize: 32,
    marginRight: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 20,
    color: '#4A90E2',
    fontWeight: '600',
  },
  summaryContainer: {
    padding: 24,
    paddingTop: 0,
  },
  testName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 28,
  },
  testDescription: {
    fontSize: 16,
    color: '#B0B0B0',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  scoreDetails: {
    flex: 1,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  scoreValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  severityContainer: {
    padding: 24,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  severityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
  },
  severityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  severityIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  severityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  interpretationText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  recommendationsContainer: {
    padding: 24,
    paddingTop: 0,
  },
  recommendationsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
  },
  recommendationItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  recommendationBullet: {
    color: '#4A90E2',
    fontSize: 18,
    marginRight: 12,
    fontWeight: 'bold',
  },
  recommendationText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  toggleButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleIcon: {
    color: '#4A90E2',
    fontSize: 16,
  },
  detailedResultsContainer: {
    padding: 24,
    paddingTop: 0,
  },
  questionResult: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  questionNumber: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  answerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
  },
  answerLabel: {
    color: '#888',
    fontSize: 12,
    marginBottom: 4,
  },
  answerText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
  },
  actionButtonsContainer: {
    padding: 24,
    paddingTop: 0,
  },
  actionButton: {
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.3)',
  },
  actionButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    paddingTop: 0,
  },
  footerText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    fontStyle: 'italic',
  },
});

export default ResultsScreen; 