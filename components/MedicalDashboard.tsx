import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface MedicalDashboardProps {
  onTestSelect: (testId: string) => void;
  onViewResults: () => void;
  onViewHistory: () => void;
}

const MedicalDashboard: React.FC<MedicalDashboardProps> = ({
  onTestSelect,
  onViewResults,
  onViewHistory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const testCategories = [
    { id: 'all', name: 'All Tests', color: '#4A90E2' },
    { id: 'Global Cognitive Assessment', name: 'Global Assessment', color: '#34C759' },
    { id: 'Alzheimer\'s Specific', name: 'Alzheimer\'s', color: '#FF6B6B' },
    { id: 'Dementia Staging', name: 'Dementia Staging', color: '#FF9500' },
    { id: 'Memory & Learning', name: 'Memory', color: '#9C27B0' },
    { id: 'Attention & Executive', name: 'Attention', color: '#607D8B' },
    { id: 'Language & Memory', name: 'Language', color: '#795548' },
    { id: 'Visuospatial & Executive', name: 'Visuospatial', color: '#2196F3' },
    { id: 'Executive Function', name: 'Executive', color: '#E91E63' },
  ];

  const cognitiveTests = [
    {
      id: 'mmse',
      name: 'MMSE',
      fullName: 'Mini-Mental State Examination',
      category: 'Global Cognitive Assessment',
      duration: 10,
      difficulty: 'Easy',
      description: '30-point global cognitive assessment',
      icon: '🧠',
      color: '#34C759'
    },
    {
      id: 'adas-cog13',
      name: 'ADAS-Cog13',
      fullName: 'Alzheimer\'s Disease Assessment Scale',
      category: 'Alzheimer\'s Specific',
      duration: 20,
      difficulty: 'Medium',
      description: '13-item Alzheimer\'s specific assessment',
      icon: '🔬',
      color: '#FF6B6B'
    },
    {
      id: 'cdr',
      name: 'CDR',
      fullName: 'Clinical Dementia Rating Scale',
      category: 'Dementia Staging',
      duration: 15,
      difficulty: 'Medium',
      description: 'Dementia staging and severity assessment',
      icon: '📊',
      color: '#FF9500'
    },
    {
      id: 'clock-drawing',
      name: 'Clock Drawing',
      fullName: 'Clock Drawing Test',
      category: 'Visuospatial & Executive',
      duration: 5,
      difficulty: 'Medium',
      description: 'Visuospatial and executive function test',
      icon: '🕐',
      color: '#2196F3'
    },
    {
      id: 'trail-making',
      name: 'Trail Making',
      fullName: 'Trail Making Test',
      category: 'Attention & Executive',
      duration: 8,
      difficulty: 'Medium',
      description: 'Attention and executive function assessment',
      icon: '🔄',
      color: '#607D8B'
    },
    {
      id: 'verbal-fluency',
      name: 'Verbal Fluency',
      fullName: 'Verbal Fluency Test (FAS)',
      category: 'Language & Memory',
      duration: 6,
      difficulty: 'Medium',
      description: 'Language ability and executive function',
      icon: '💬',
      color: '#795548'
    },
    {
      id: 'digit-span',
      name: 'Digit Span',
      fullName: 'Digit Span Test',
      category: 'Memory & Learning',
      duration: 7,
      difficulty: 'Medium',
      description: 'Immediate and working memory test',
      icon: '🔢',
      color: '#9C27B0'
    },
    {
      id: 'boston-naming',
      name: 'Boston Naming',
      fullName: 'Boston Naming Test',
      category: 'Language & Memory',
      duration: 8,
      difficulty: 'Medium',
      description: 'Confrontational naming ability',
      icon: '🖼️',
      color: '#795548'
    },
    {
      id: 'rey-auditory',
      name: 'Rey Auditory',
      fullName: 'Rey Auditory Verbal Learning Test',
      category: 'Memory & Learning',
      duration: 12,
      difficulty: 'Hard',
      description: 'Verbal learning and memory assessment',
      icon: '🎧',
      color: '#9C27B0'
    },
    {
      id: 'stroop-test',
      name: 'Stroop Test',
      fullName: 'Stroop Color and Word Test',
      category: 'Executive Function',
      duration: 8,
      difficulty: 'Hard',
      description: 'Cognitive interference and executive function',
      icon: '🎨',
      color: '#E91E63'
    },
    {
      id: 'category-fluency',
      name: 'Category Fluency',
      fullName: 'Category Fluency Test',
      category: 'Language & Memory',
      duration: 5,
      difficulty: 'Easy',
      description: 'Semantic memory and verbal fluency',
      icon: '📝',
      color: '#795548'
    },
    {
      id: 'block-design',
      name: 'Block Design',
      fullName: 'Block Design Test',
      category: 'Visuospatial & Executive',
      duration: 10,
      difficulty: 'Medium',
      description: 'Visuospatial ability and construction',
      icon: '🧩',
      color: '#2196F3'
    },
    {
      id: 'logical-memory',
      name: 'Logical Memory',
      fullName: 'Logical Memory Test',
      category: 'Memory & Comprehension',
      duration: 8,
      difficulty: 'Medium',
      description: 'Story recall and comprehension',
      icon: '📖',
      color: '#9C27B0'
    }
  ];

  const filteredTests = selectedCategory === 'all' 
    ? cognitiveTests 
    : cognitiveTests.filter(test => test.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#34C759';
      case 'Medium': return '#FF9500';
      case 'Hard': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🧠 Alzico Medical Dashboard</Text>
          <Text style={styles.subtitle}>Professional Cognitive Assessment Platform</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>13</Text>
            <Text style={styles.statLabel}>Cognitive Tests</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>85%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
        </View>

        {/* Category Filter */}
        <View style={styles.categoryContainer}>
          <Text style={styles.sectionTitle}>Test Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {testCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category.id && styles.categoryButtonTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tests Grid */}
        <View style={styles.testsContainer}>
          <Text style={styles.sectionTitle}>Available Cognitive Assessments</Text>
          <View style={styles.testsGrid}>
            {filteredTests.map((test) => (
              <TouchableOpacity
                key={test.id}
                style={styles.testCard}
                onPress={() => onTestSelect(test.id)}
              >
                <View style={styles.testHeader}>
                  <Text style={styles.testIcon}>{test.icon}</Text>
                  <View style={styles.testInfo}>
                    <Text style={styles.testName}>{test.name}</Text>
                    <Text style={styles.testFullName}>{test.fullName}</Text>
                  </View>
                </View>
                
                <Text style={styles.testDescription}>{test.description}</Text>
                
                <View style={styles.testFooter}>
                  <View style={styles.testMeta}>
                    <Text style={styles.testDuration}>⏱️ {test.duration} min</Text>
                    <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(test.difficulty) + '20' }]}>
                      <Text style={[styles.difficultyText, { color: getDifficultyColor(test.difficulty) }]}>
                        {test.difficulty}
                      </Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity
                    style={[styles.startButton, { backgroundColor: test.color }]}
                    onPress={() => onTestSelect(test.id)}
                  >
                    <Text style={styles.startButtonText}>Start</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={onViewResults}>
            <Text style={styles.actionButtonText}>📊 View Test Results</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onViewHistory}>
            <Text style={styles.actionButtonText}>📈 Assessment History</Text>
          </TouchableOpacity>
        </View>

        {/* Medical Disclaimer */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerTitle}>⚠️ Medical Disclaimer</Text>
          <Text style={styles.disclaimerText}>
            This cognitive assessment platform is designed for educational and screening purposes only. 
            It is not a substitute for professional medical diagnosis, treatment, or advice. 
            Always consult with qualified healthcare professionals for medical concerns.
          </Text>
        </View>
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
    color: '#2C3E50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  categoryContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  categoryScroll: {
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#E5E5EA',
  },
  categoryButtonActive: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  categoryButtonTextActive: {
    color: 'white',
  },
  testsContainer: {
    marginBottom: 30,
  },
  testsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  testCard: {
    backgroundColor: 'white',
    width: (width - 60) / 2,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  testHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  testIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  testFullName: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  testDescription: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 15,
    lineHeight: 16,
  },
  testFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  testMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testDuration: {
    fontSize: 10,
    color: '#7F8C8D',
    marginRight: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  startButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  startButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionContainer: {
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disclaimerContainer: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 16,
  },
});

export default MedicalDashboard; 