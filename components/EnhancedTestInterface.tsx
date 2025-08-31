import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Image,
  Animated,
  PanResponder,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { TestQuestion, CognitiveTest } from '../utils/cognitiveTests';

const { width, height } = Dimensions.get('window');

interface EnhancedTestInterfaceProps {
  test: CognitiveTest;
  currentQuestion: TestQuestion;
  questionIndex: number;
  totalQuestions: number;
  timeRemaining: number;
  onAnswerSubmit: (answer: any) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  answers: Record<string, any>;
}

interface DrawingPoint {
  x: number;
  y: number;
  timestamp: number;
}

const EnhancedTestInterface: React.FC<EnhancedTestInterfaceProps> = ({
  test,
  currentQuestion,
  questionIndex,
  totalQuestions,
  timeRemaining,
  onAnswerSubmit,
  onNextQuestion,
  onPreviousQuestion,
  answers,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [textAnswer, setTextAnswer] = useState<string>('');
  const [drawingPoints, setDrawingPoints] = useState<DrawingPoint[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<Audio.Sound | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [sequenceSteps, setSequenceSteps] = useState<string[]>([]);
  
  const drawingCanvasRef = useRef<View>(null);
  const audioProgressRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize answer from previous attempts
  useEffect(() => {
    const existingAnswer = answers[currentQuestion.id];
    if (existingAnswer) {
      if (typeof existingAnswer === 'string') {
        setSelectedAnswer(existingAnswer);
        setTextAnswer(existingAnswer);
      } else if (existingAnswer.drawing) {
        setDrawingPoints(existingAnswer.drawing);
      }
    }
  }, [currentQuestion.id, answers]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioPlayer) {
        audioPlayer.unloadAsync();
      }
      if (audioProgressRef.current) {
        clearInterval(audioProgressRef.current);
      }
    };
  }, []);

  // PanResponder for drawing
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        setIsDrawing(true);
        const { locationX, locationY } = evt.nativeEvent;
        setDrawingPoints([{ x: locationX, y: locationY, timestamp: Date.now() }]);
      },
      onPanResponderMove: (evt) => {
        if (isDrawing) {
          const { locationX, locationY } = evt.nativeEvent;
          setDrawingPoints(prev => [...prev, { x: locationX, y: locationY, timestamp: Date.now() }]);
        }
      },
      onPanResponderRelease: () => {
        setIsDrawing(false);
      },
    })
  ).current;

  // Audio playback functions
  const playAudio = async () => {
    try {
      if (audioPlayer) {
        if (isAudioPlaying) {
          await audioPlayer.stopAsync();
          setIsAudioPlaying(false);
        } else {
          await audioPlayer.playAsync();
          setIsAudioPlaying(true);
          startAudioProgress();
        }
      } else {
        // Create new audio player
        const { sound } = await Audio.Sound.createAsync(
          { uri: currentQuestion.audio || '' },
          { shouldPlay: true }
        );
        setAudioPlayer(sound);
        setIsAudioPlaying(true);
        startAudioProgress();
        
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            setIsAudioPlaying(false);
            setAudioProgress(0);
          }
        });
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      Alert.alert('Audio Error', 'Unable to play audio file. Please try again.');
    }
  };

  const startAudioProgress = () => {
    if (audioProgressRef.current) {
      clearInterval(audioProgressRef.current);
    }
    
    audioProgressRef.current = setInterval(() => {
      setAudioProgress(prev => {
        if (prev >= 100) {
          clearInterval(audioProgressRef.current!);
          return 0;
        }
        return prev + 1;
      });
    }, 100);
  };

  const stopAudio = async () => {
    if (audioPlayer) {
      await audioPlayer.stopAsync();
      setIsAudioPlaying(false);
      setAudioProgress(0);
    }
  };

  // Handle answer submission
  const handleSubmitAnswer = () => {
    let answer: any = '';
    
    switch (currentQuestion.type) {
      case 'multiple-choice':
        answer = selectedAnswer;
        break;
      case 'text-input':
      case 'recall':
        answer = textAnswer;
        break;
      case 'drawing':
        answer = { drawing: drawingPoints, description: textAnswer };
        break;
      case 'sequence':
        answer = { steps: sequenceSteps, description: textAnswer };
        break;
      case 'story-reading':
        answer = 'completed';
        break;
      case 'audio-recall':
        answer = textAnswer;
        break;
      case 'timed':
        answer = { text: textAnswer, timeSpent: timeRemaining };
        break;
      default:
        answer = textAnswer || selectedAnswer;
    }

    if (answer && (typeof answer === 'string' ? answer.trim() : true)) {
      onAnswerSubmit(answer);
      
      // Reset form for next question
      setSelectedAnswer('');
      setTextAnswer('');
      setDrawingPoints([]);
      setSequenceSteps([]);
    } else {
      Alert.alert('Answer Required', 'Please provide an answer before continuing.');
    }
  };

  // Validate answer based on question type
  const isAnswerValid = (): boolean => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return !!selectedAnswer;
      case 'text-input':
      case 'recall':
        return textAnswer.trim().length > 0;
      case 'drawing':
        return drawingPoints.length > 0 || textAnswer.trim().length > 0;
      case 'sequence':
        return sequenceSteps.length > 0 || textAnswer.trim().length > 0;
      case 'story-reading':
        return true; // Always valid for reading
      case 'audio-recall':
        return textAnswer.trim().length > 0;
      case 'timed':
        return textAnswer.trim().length > 0;
      default:
        return true;
    }
  };

  // Render different question types
  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            {currentQuestion.options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === option && styles.selectedOption
                ]}
                onPress={() => setSelectedAnswer(option)}
              >
                <Text style={[
                  styles.optionText,
                  selectedAnswer === option && styles.selectedOptionText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'text-input':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Type your answer here..."
              value={textAnswer}
              onChangeText={setTextAnswer}
              multiline
              numberOfLines={4}
              maxLength={500}
            />
            <Text style={styles.characterCount}>
              {textAnswer.length}/500 characters
            </Text>
          </View>
        );

      case 'recall':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            {currentQuestion.id === 'logical_immediate' && (
              <View style={styles.recallInstructions}>
                <Text style={styles.recallInstructionsText}>
                  ⚠️ The story is now hidden. Recall as many details as possible.
                </Text>
              </View>
            )}
            {currentQuestion.id === 'logical_delayed' && (
              <View style={styles.recallInstructions}>
                <Text style={styles.recallInstructionsText}>
                  ⏰ Delayed recall: Try to remember the story from earlier.
                </Text>
              </View>
            )}
            <TextInput
              style={styles.textInput}
              placeholder="Type your recall here..."
              value={textAnswer}
              onChangeText={setTextAnswer}
              multiline
              numberOfLines={6}
              maxLength={1000}
            />
            <Text style={styles.characterCount}>
              {textAnswer.length}/1000 characters
            </Text>
          </View>
        );

      case 'recognition':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            {currentQuestion.image && (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: currentQuestion.image }}
                  style={styles.questionImage}
                  resizeMode="contain"
                  defaultSource={require('../assets/images/tests/placeholder.png')}
                />
              </View>
            )}
            {currentQuestion.options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === option && styles.selectedOption
                ]}
                onPress={() => setSelectedAnswer(option)}
              >
                <Text style={[
                  styles.optionText,
                  selectedAnswer === option && styles.selectedOptionText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'drawing':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            {currentQuestion.image && (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: currentQuestion.image }}
                  style={styles.questionImage}
                  resizeMode="contain"
                  defaultSource={require('../assets/images/tests/placeholder.png')}
                />
                <Text style={styles.imageCaption}>Reference image to copy</Text>
              </View>
            )}
            <View style={styles.drawingContainer}>
              <Text style={styles.drawingInstructions}>
                🎨 Draw your response in the space below:
              </Text>
              <View 
                ref={drawingCanvasRef}
                style={styles.drawingArea}
                {...panResponder.panHandlers}
              >
                {drawingPoints.length > 0 && (
                  <View style={styles.drawingCanvas}>
                    {drawingPoints.map((point, index) => {
                      if (index === 0) return null;
                      const prevPoint = drawingPoints[index - 1];
                      return (
                        <View
                          key={index}
                          style={[
                            styles.drawingLine,
                            {
                              left: Math.min(prevPoint.x, point.x),
                              top: Math.min(prevPoint.y, point.y),
                              width: Math.abs(point.x - prevPoint.x),
                              height: Math.abs(point.y - prevPoint.y),
                            }
                          ]}
                        />
                      );
                    })}
                  </View>
                )}
                {drawingPoints.length === 0 && (
                  <Text style={styles.drawingPlaceholder}>
                    Draw here by dragging your finger
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.clearDrawingButton}
                onPress={() => setDrawingPoints([])}
              >
                <Text style={styles.clearDrawingText}>Clear Drawing</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.textInput}
                placeholder="Describe your drawing or response..."
                value={textAnswer}
                onChangeText={setTextAnswer}
                multiline
                numberOfLines={3}
                maxLength={300}
              />
            </View>
          </View>
        );

      case 'timed':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>
                ⏱️ Time remaining: {timeRemaining}s
              </Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Type your answer here..."
              value={textAnswer}
              onChangeText={setTextAnswer}
              multiline
              numberOfLines={4}
              maxLength={500}
            />
          </View>
        );

      case 'sequence':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <View style={styles.sequenceContainer}>
              <Text style={styles.sequenceInstructions}>
                📋 Follow the sequence of instructions above
              </Text>
              <View style={styles.sequenceSteps}>
                {sequenceSteps.map((step, index) => (
                  <View key={index} style={styles.sequenceStep}>
                    <Text style={styles.stepNumber}>{index + 1}.</Text>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                style={styles.addStepButton}
                onPress={() => {
                  if (textAnswer.trim()) {
                    setSequenceSteps(prev => [...prev, textAnswer.trim()]);
                    setTextAnswer('');
                  }
                }}
              >
                <Text style={styles.addStepText}>Add Step</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.textInput}
                placeholder="Describe the next step..."
                value={textAnswer}
                onChangeText={setTextAnswer}
                multiline
                numberOfLines={2}
                maxLength={200}
              />
            </View>
          </View>
        );

      case 'story-reading':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <View style={styles.storyContainer}>
              <Text style={styles.storyTitle}>📖 Story to Read:</Text>
              <ScrollView style={styles.storyScrollView}>
                <Text style={styles.storyContent}>
                  {currentQuestion.storyContent}
                </Text>
              </ScrollView>
              <View style={styles.storyInstructions}>
                <Text style={styles.storyInstructionsText}>
                  ⏰ Take your time to read carefully. You will be asked to recall this story later.
                </Text>
              </View>
            </View>
          </View>
        );

      case 'audio-recall':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <View style={styles.audioContainer}>
              <View style={styles.audioControls}>
                <TouchableOpacity
                  style={[styles.audioButton, isAudioPlaying && styles.audioButtonPlaying]}
                  onPress={playAudio}
                >
                  <Text style={styles.audioButtonText}>
                    {isAudioPlaying ? '⏸️ Pause' : '▶️ Play'}
                  </Text>
                </TouchableOpacity>
                {isAudioPlaying && (
                  <TouchableOpacity
                    style={styles.audioStopButton}
                    onPress={stopAudio}
                  >
                    <Text style={styles.audioStopText}>⏹️ Stop</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.audioProgressBar}>
                <View 
                  style={[styles.audioProgress, { width: `${audioProgress}%` }]} 
                />
              </View>
              <Text style={styles.audioFile}>
                Audio: {currentQuestion.audio?.split('/').pop() || 'Unknown file'}
              </Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Type what you remember from the audio..."
              value={textAnswer}
              onChangeText={setTextAnswer}
              multiline
              numberOfLines={4}
              maxLength={500}
            />
          </View>
        );

      default:
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>Unsupported question type</Text>
          </View>
        );
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Progress Header */}
      <View style={styles.progressHeader}>
        <View style={styles.progressBar}>
          <View 
            style={[styles.progressFill, { width: `${((questionIndex + 1) / totalQuestions) * 100}%` }]} 
          />
        </View>
        <Text style={styles.progressText}>
          Question {questionIndex + 1} of {totalQuestions}
        </Text>
        {timeRemaining > 0 && (
          <Text style={styles.timeText}>
            ⏱️ {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
          </Text>
        )}
      </View>

      {/* Question Content */}
      {renderQuestion()}

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, styles.previousButton]}
          onPress={onPreviousQuestion}
          disabled={questionIndex === 0}
        >
          <Text style={styles.navButtonText}>← Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton, 
            styles.submitButton,
            !isAnswerValid() && styles.submitButtonDisabled
          ]}
          onPress={handleSubmitAnswer}
          disabled={!isAnswerValid()}
        >
          <Text style={styles.submitButtonText}>
            {questionIndex === totalQuestions - 1 ? 'Complete Test' : 'Next →'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  progressHeader: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 3,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  timeText: {
    color: '#FFC107',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  questionContainer: {
    padding: 20,
  },
  questionText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 20,
    lineHeight: 26,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: 'rgba(74, 144, 226, 0.3)',
    borderColor: '#4A90E2',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    textAlignVertical: 'top',
  },
  characterCount: {
    color: '#888',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 5,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  questionImage: {
    width: width * 0.8,
    height: width * 0.6,
    borderRadius: 12,
    marginBottom: 10,
  },
  imageCaption: {
    color: '#888',
    fontSize: 14,
    fontStyle: 'italic',
  },
  drawingContainer: {
    marginBottom: 20,
  },
  drawingInstructions: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  drawingArea: {
    width: width * 0.8,
    height: width * 0.6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderStyle: 'dashed',
    alignSelf: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  drawingCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  drawingLine: {
    position: 'absolute',
    backgroundColor: '#4A90E2',
    borderRadius: 2,
  },
  drawingPlaceholder: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: '50%',
  },
  clearDrawingButton: {
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
    borderRadius: 8,
    padding: 10,
    alignSelf: 'center',
    marginBottom: 15,
  },
  clearDrawingText: {
    color: '#FFC107',
    fontSize: 14,
    fontWeight: '600',
  },
  timerContainer: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  timerText: {
    color: '#FFC107',
    fontSize: 16,
    fontWeight: '600',
  },
  sequenceContainer: {
    marginBottom: 20,
  },
  sequenceInstructions: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  sequenceSteps: {
    marginBottom: 15,
  },
  sequenceStep: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  stepNumber: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    minWidth: 25,
  },
  stepText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  addStepButton: {
    backgroundColor: 'rgba(52, 199, 89, 0.2)',
    borderRadius: 8,
    padding: 10,
    alignSelf: 'center',
    marginBottom: 15,
  },
  addStepText: {
    color: '#34C759',
    fontSize: 14,
    fontWeight: '600',
  },
  storyContainer: {
    marginBottom: 20,
  },
  storyTitle: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  storyScrollView: {
    maxHeight: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  storyContent: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  storyInstructions: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  storyInstructionsText: {
    color: '#FFC107',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  audioContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  audioControls: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  audioButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 5,
  },
  audioButtonPlaying: {
    backgroundColor: '#FFC107',
  },
  audioButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  audioStopButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 5,
  },
  audioStopText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  audioProgressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginBottom: 10,
  },
  audioProgress: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 2,
  },
  audioFile: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },
  recallInstructions: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  recallInstructionsText: {
    color: '#FFC107',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 0,
  },
  navButton: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  previousButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  submitButton: {
    backgroundColor: '#4A90E2',
  },
  submitButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EnhancedTestInterface; 