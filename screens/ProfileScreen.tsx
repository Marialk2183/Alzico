import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../components/IconReplacement';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { BottomTabParamList } from '../navigation/BottomTabNavigator';

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Profile'>,
  StackNavigationProp<RootStackParamList>
>;

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const handleSupport = () => {
    Alert.alert('Support', 'Contact support at support@memorycare.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Icon name="person-circle" size={100} color="#4A90E2" />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Icon name="camera" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userAge}>Age: 65</Text>
          <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
            <Icon name="create" size={16} color="#4A90E2" />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Icon name="flame" size={24} color="#FF6B35" />
              </View>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Icon name="star" size={24} color="#FFD700" />
              </View>
              <Text style={styles.statNumber}>23</Text>
              <Text style={styles.statLabel}>Tests Completed</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Icon name="trending-up" size={24} color="#34C759" />
              </View>
              <Text style={styles.statNumber}>85%</Text>
              <Text style={styles.statLabel}>Average Score</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Icon name="trophy" size={24} color="#9C27B0" />
              </View>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Achievements</Text>
            </View>
          </View>
        </View>

        {/* Achievements Section */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <View style={styles.achievementsList}>
            <View style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Icon name="medal" size={24} color="#FFD700" />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>First Test Complete</Text>
                <Text style={styles.achievementDescription}>
                  Completed your first cognitive assessment
                </Text>
                <Text style={styles.achievementDate}>2 days ago</Text>
              </View>
            </View>
            
            <View style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Icon name="flame" size={24} color="#FF6B35" />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>Week Warrior</Text>
                <Text style={styles.achievementDescription}>
                  Completed tests for 7 consecutive days
                </Text>
                <Text style={styles.achievementDate}>1 week ago</Text>
              </View>
            </View>
            
            <View style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Icon name="star" size={24} color="#4A90E2" />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>Perfect Score</Text>
                <Text style={styles.achievementDescription}>
                  Achieved 100% on Word Recall test
                </Text>
                <Text style={styles.achievementDate}>3 days ago</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard} onPress={handleSettings}>
              <View style={styles.quickActionIcon}>
                <Icon name="settings" size={32} color="#4A90E2" />
              </View>
              <Text style={styles.quickActionTitle}>Settings</Text>
              <Text style={styles.quickActionSubtitle}>App preferences</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard} onPress={handleSupport}>
              <View style={styles.quickActionIcon}>
                <Icon name="help-circle" size={32} color="#FF9500" />
              </View>
              <Text style={styles.quickActionTitle}>Support</Text>
              <Text style={styles.quickActionSubtitle}>Get help</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard}>
              <View style={styles.quickActionIcon}>
                <Icon name="share-social" size={32} color="#34C759" />
              </View>
              <Text style={styles.quickActionTitle}>Share</Text>
              <Text style={styles.quickActionSubtitle}>With family</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard}>
              <View style={styles.quickActionIcon}>
                <Icon name="document-text" size={32} color="#9C27B0" />
              </View>
              <Text style={styles.quickActionTitle}>Reports</Text>
              <Text style={styles.quickActionSubtitle}>View history</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Health Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Brain Health Tips</Text>
          <View style={styles.tipCard}>
            <Icon name="bulb" size={20} color="#FFD700" />
            <Text style={styles.tipText}>
              Regular cognitive exercises help maintain brain function
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Icon name="heart" size={20} color="#FF6B6B" />
            <Text style={styles.tipText}>
              Stay socially active and engaged with family and friends
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Icon name="leaf" size={20} color="#34C759" />
            <Text style={styles.tipText}>
              A balanced diet rich in omega-3s supports brain health
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
  profileHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  userAge: {
    fontSize: 18,
    color: '#7F8C8D',
    marginBottom: 16,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
    marginLeft: 6,
  },
  statsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    fontWeight: '500',
  },
  achievementsSection: {
    marginBottom: 30,
  },
  achievementsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: '#BDC3C7',
    fontStyle: 'italic',
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
    marginBottom: 16,
    alignItems: 'center',
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

export default ProfileScreen; 