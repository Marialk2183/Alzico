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
import Icon from '../components/IconReplacement';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { BottomTabParamList } from '../navigation/BottomTabNavigator';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleStartDailyChallenge = () => {
    navigation.navigate('TestSequence');
  };

  const handleViewProgress = () => {
    navigation.navigate('History');
  };

  const handleQuickTest = () => {
    navigation.navigate('TestList');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome Header */}
        <View style={styles.welcomeHeader}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeText}>Good morning!</Text>
            <Text style={styles.welcomeSubtext}>Ready for today's brain workout?</Text>
          </View>
          <View style={styles.avatarContainer}>
            <Icon name="person-circle" size={60} color="#4A90E2" />
          </View>
        </View>

        {/* Daily Challenge Card */}
        <View style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <Icon name="trophy" size={32} color="#FFD700" />
            <Text style={styles.challengeTitle}>Daily Challenge</Text>
          </View>
          <Text style={styles.challengeDescription}>
            Complete today's cognitive exercises to maintain your brain health
          </Text>
          <TouchableOpacity
            style={styles.challengeButton}
            onPress={handleStartDailyChallenge}
            activeOpacity={0.8}
          >
            <Text style={styles.challengeButtonText}>Start Challenge</Text>
            <Icon name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Progress Overview */}
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.progressCards}>
            <View style={styles.progressCard}>
              <View style={styles.progressIconContainer}>
                <Icon name="flame" size={24} color="#FF6B35" />
              </View>
              <Text style={styles.progressNumber}>7</Text>
              <Text style={styles.progressLabel}>Day Streak</Text>
            </View>
            
            <View style={styles.progressCard}>
              <View style={styles.progressIconContainer}>
                <Icon name="star" size={24} color="#FFD700" />
              </View>
              <Text style={styles.progressNumber}>23</Text>
              <Text style={styles.progressLabel}>Tests Completed</Text>
            </View>
            
            <View style={styles.progressCard}>
              <View style={styles.progressIconContainer}>
                <Icon name="trending-up" size={24} color="#34C759" />
              </View>
              <Text style={styles.progressNumber}>85%</Text>
              <Text style={styles.progressLabel}>Average Score</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={handleQuickTest}
              activeOpacity={0.8}
            >
              <View style={styles.quickActionIcon}>
                <Icon name="clipboard" size={32} color="#4A90E2" />
              </View>
              <Text style={styles.quickActionTitle}>Take a Test</Text>
              <Text style={styles.quickActionSubtitle}>Individual cognitive test</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={handleViewProgress}
              activeOpacity={0.8}
            >
              <View style={styles.quickActionIcon}>
                <Icon name="analytics" size={32} color="#34C759" />
              </View>
              <Text style={styles.quickActionTitle}>View Progress</Text>
              <Text style={styles.quickActionSubtitle}>Track your results</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('About')}
              activeOpacity={0.8}
            >
              <View style={styles.quickActionIcon}>
                <Icon name="information-circle" size={32} color="#FF9500" />
              </View>
              <Text style={styles.quickActionTitle}>Learn More</Text>
              <Text style={styles.quickActionSubtitle}>About Alzheimer's</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Profile')}
              activeOpacity={0.8}
            >
              <View style={styles.quickActionIcon}>
                <Icon name="settings" size={32} color="#8E8E93" />
              </View>
              <Text style={styles.quickActionTitle}>Settings</Text>
              <Text style={styles.quickActionSubtitle}>Customize your app</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Motivational Quote */}
        <View style={styles.quoteCard}>
          <Icon name="heart" size={24} color="#FF6B6B" />
          <Text style={styles.quoteText}>
            "Every day is a new opportunity to strengthen your mind and maintain your independence."
          </Text>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Daily Brain Health Tips</Text>
          <View style={styles.tipCard}>
            <Icon name="bulb" size={20} color="#FFD700" />
            <Text style={styles.tipText}>
              Stay socially active - regular conversations help maintain cognitive function
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Icon name="leaf" size={20} color="#34C759" />
            <Text style={styles.tipText}>
              Eat a balanced diet rich in omega-3 fatty acids and antioxidants
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Icon name="walk" size={20} color="#4A90E2" />
            <Text style={styles.tipText}>
              Regular physical exercise improves blood flow to the brain
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
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  challengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  challengeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginLeft: 12,
  },
  challengeDescription: {
    fontSize: 16,
    color: '#7F8C8D',
    lineHeight: 24,
    marginBottom: 24,
  },
  challengeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  challengeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  progressSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  progressCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    fontWeight: '500',
  },
  quickActionsSection: {
    marginBottom: 30,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 16,
  },
  quoteCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    alignItems: 'flex-start',
  },
  quoteText: {
    flex: 1,
    fontSize: 16,
    color: '#E53E3E',
    fontStyle: 'italic',
    lineHeight: 24,
    marginLeft: 12,
  },
  tipsSection: {
    marginBottom: 20,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
    marginLeft: 12,
  },
});

export default HomeScreen; 