import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const { width } = Dimensions.get('window');

const MainScreen = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();

  const handleStartTest = () => {
    navigation.navigate('TestList');
  };

  const handleHelp = () => {
    navigation.navigate('Help');
  };

  const handleSOS = () => {
    navigation.navigate('SOS');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🧠 Alzico</Text>
          <Text style={styles.subtitle}>Alzheimer's Detection App</Text>
        </View>

        {/* Main Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={handleStartTest}
            activeOpacity={0.8}
          >
            <Text style={styles.mainButtonText}>Start Cognitive Test</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={handleHelp}
            activeOpacity={0.8}
          >
            <Text style={styles.quickActionText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sosButton}
            onPress={handleSOS}
            activeOpacity={0.8}
          >
            <Text style={styles.sosButtonText}>SOS</Text>
          </TouchableOpacity>
        </View>

        {/* Information Cards */}
        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>About Cognitive Tests</Text>
            <Text style={styles.infoCardContent}>
              Cognitive tests help detect early signs of Alzheimer's disease and other cognitive impairments.
            </Text>
          </View>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  actionContainer: {
    marginBottom: 30,
  },
  mainButton: {
    backgroundColor: '#4A90E2',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mainButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  quickActionButton: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  sosButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  quickActionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sosButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoCardContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default MainScreen; 