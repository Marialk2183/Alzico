import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

interface TestQuestion {
  id: string;
  type: 'multiple-choice' | 'text-input' | 'recall' | 'recognition' | 'drawing' | 'timed' | 'sequence';
  question: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
  timeLimit?: number;
  image?: string;
  audio?: string;
}

interface ProfessionalTestInterfaceProps {
  testId: string;
  testName: string;
  questions: TestQuestion[];
  onComplete: (score: number, answers: any[]) => void;
  onBack: () => void;
}

const ProfessionalTestInterface: React.FC<ProfessionalTestInterfaceProps> = ({
  testId,
  testName,
  questions,
  onComplete,
  onBack,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion?.timeLimit && !isComplete) {
      setTimeLeft(currentQuestion.timeLimit);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev && prev <= 1) {
            clearInterval(timer);
            handleNextQuestion();
            return null;
          }
          return prev ? prev - 1 : null;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, isComplete]);

  const handleAnswer = (answer: any) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      questionId: currentQuestion.id,
      answer,
      timeSpent: currentQuestion.timeLimit ? (currentQuestion.timeLimit - (timeLeft || 0)) : 0,
    };
    setAnswers(newAnswers);
    setCurrentAnswer('');
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(null);
    } else {
      completeTest();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimeLeft(null);
    }
  };

  const completeTest = () => {
    setIsComplete(true);
    const score = calculateScore();
    onComplete(score, answers);
  };

  const calculateScore = (): number => {
    // Simple scoring - can be enhanced based on specific test requirements
    let totalScore = 0;
    let maxPossibleScore = 0;

    questions.forEach((question, index) => {
      maxPossibleScore += question.points;
      if (answers[index] && answers[index].answer) {
        totalScore += question.points;
      }
    });

    return Math.round((totalScore / maxPossibleScore) * 100);
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <View style={styles.optionsContainer}>
              {currentQuestion.options?.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionButton}
                  onPress={() => handleAnswer(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'text-input':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <TextInput
              style={styles.textInput}
              value={currentAnswer}
              onChangeText={setCurrentAnswer}
              placeholder="Enter your answer..."
              multiline
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => handleAnswer(currentAnswer)}
            >
              <Text style={styles.submitButtonText}>Submit Answer</Text>
            </TouchableOpacity>
          </View>
        );

      case 'recall':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <TextInput
              style={styles.textInput}
              value={currentAnswer}
              onChangeText={setCurrentAnswer}
              placeholder="Type what you remember..."
              multiline
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => handleAnswer(currentAnswer)}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        );

      case 'timed':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>Time: {timeLeft}s</Text>
            </View>
            <TextInput
              style={styles.textInput}
              value={currentAnswer}
              onChangeText={setCurrentAnswer}
              placeholder="Your response..."
              multiline
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => handleAnswer(currentAnswer)}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <Text style={styles.instructionText}>
              Please follow the instructions for this question type.
            </Text>
          </View>
        );
    }
  };

  if (isComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completionContainer}>
          <Text style={styles.completionIcon}>✅</Text>
          <Text style={styles.completionTitle}>Test Complete!</Text>
          <Text style={styles.completionText}>
            You have completed the {testName} assessment.
          </Text>
          <TouchableOpacity style={styles.completionButton} onPress={onBack}>
            <Text style={styles.completionButtonText}>Return to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{testName}</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1} / {questions.length}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      {/* Timer */}
      {timeLeft && (
        <View style={styles.timerDisplay}>
          <Text style={styles.timerDisplayText}>⏱️ {timeLeft}s remaining</Text>
        </View>
      )}

      {/* Question Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderQuestion()}
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentQuestionIndex === 0 && styles.navButtonDisabled
          ]}
          onPress={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={handleNextQuestion}
        >
          <Text style={styles.navButtonText}>
            {currentQuestionIndex === questions.length - 1 ? 'Complete' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    textAlign: 'center',
  },
  progressContainer: {
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  progressBarContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 4,
  },
  timerDisplay: {
    backgroundColor: '#FFF3CD',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  timerDisplayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#856404',
  },
  contentContainer: {
    padding: 20,
    flexGrow: 1,
  },
  questionContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 20,
    lineHeight: 24,
  },
  instructionText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontStyle: 'italic',
  },
  optionsContainer: {
    marginTop: 15,
  },
  optionButton: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E5E5EA',
  },
  optionText: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  navButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#E5E5EA',
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  completionIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  completionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    textAlign: 'center',
  },
  completionText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  completionButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  completionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfessionalTestInterface; 