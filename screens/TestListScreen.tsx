import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type TestListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TestList'>;

const TestListScreen = () => {
  const navigation = useNavigation<TestListScreenNavigationProp>();

  const tests = [
    {
      id: 'memory',
      name: 'Memory Test',
      description: 'Test your short-term memory and recall abilities',
      icon: '🧠',
    },
    {
      id: 'attention',
      name: 'Attention Test',
      description: 'Measure your focus and attention span',
      icon: '👁️',
    },
    {
      id: 'processing',
      name: 'Processing Speed',
      description: 'Evaluate how quickly you can process information',
      icon: '⚡',
    },
    {
      id: 'language',
      name: 'Language Test',
      description: 'Assess your language skills',
      icon: '💬',
    },
    {
      id: 'visuospatial',
      name: 'Visuospatial Test',
      description: 'Test your spatial awareness',
      icon: '🎨',
    },
    {
      id: 'executive',
      name: 'Executive Function',
      description: 'Evaluate your planning and decision-making abilities',
      icon: '🎯',
    },
  ];

  const handleTestSelect = (testId: string, testName: string) => {
    navigation.navigate('TestInterface', { testId, testName });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Cognitive Tests</Text>
          <Text style={styles.subtitle}>Choose a test to begin</Text>
        </View>

        <View style={styles.testList}>
          {tests.map((test) => (
            <TouchableOpacity
              key={test.id}
              style={styles.testItem}
              onPress={() => handleTestSelect(test.id, test.name)}
            >
              <Text style={styles.testIcon}>{test.icon}</Text>
              <View style={styles.testInfo}>
                <Text style={styles.testName}>{test.name}</Text>
                <Text style={styles.testDescription}>{test.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
    color: '#4A90E2',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  testList: {
    marginBottom: 20,
  },
  testItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  testIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  testDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default TestListScreen; 