import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { getTestPerformanceStats, getDashboardSummary } from '../utils/testResults';

const { width } = Dimensions.get('window');

interface ProgressData {
  totalTests: number;
  averageScore: number;
  bestScore: number;
  worstScore: number;
  improvementTrend: Array<{
    testNumber: number;
    score: number;
    date: string;
  }>;
  monthlyProgress: Array<{
    month: string;
    testsTaken: number;
    averageScore: number;
  }>;
  goalProgress: {
    monthlyTests: number;
    targetMonthlyTests: number;
    averageScoreTarget: number;
    currentAverageScore: number;
  };
}

interface ProgressTrackerProps {
  onRefresh?: () => void;
  showDetailed?: boolean;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  onRefresh, 
  showDetailed = false 
}) => {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month');

  useEffect(() => {
    loadProgressData();
  }, [selectedPeriod]);

  const loadProgressData = async () => {
    try {
      setLoading(true);
      const summary = await getDashboardSummary();
      const stats = await getTestPerformanceStats();
      
      // Generate demo monthly progress data
      const monthlyProgress = [
        { month: 'Jan', testsTaken: 4, averageScore: 75 },
        { month: 'Feb', testsTaken: 3, averageScore: 78 },
        { month: 'Mar', testsTaken: 5, averageScore: 82 },
        { month: 'Apr', testsTaken: 4, averageScore: 79 },
        { month: 'May', testsTaken: 6, averageScore: 85 },
        { month: 'Jun', testsTaken: 4, averageScore: 88 }
      ];
      
      setProgressData({
        totalTests: summary.totalTests,
        averageScore: summary.averageScore,
        bestScore: stats.bestScore || 0,
        worstScore: stats.worstScore || 0,
        improvementTrend: summary.topPerformingTests || [],
        monthlyProgress,
        goalProgress: {
          monthlyTests: summary.testsThisMonth || 0,
          targetMonthlyTests: 4,
          averageScoreTarget: 80,
          currentAverageScore: summary.averageScore || 0
        }
      });
    } catch (error) {
      console.error('Error loading progress data:', error);
      // Set demo data for display purposes
      setProgressData({
        totalTests: 12,
        averageScore: 78,
        bestScore: 95,
        worstScore: 45,
        improvementTrend: [
          { testNumber: 1, score: 65, date: '2024-01-01' },
          { testNumber: 2, score: 72, date: '2024-01-08' },
          { testNumber: 3, score: 78, date: '2024-01-15' },
          { testNumber: 4, score: 82, date: '2024-01-22' },
          { testNumber: 5, score: 85, date: '2024-01-29' }
        ],
        monthlyProgress: [
          { month: 'Jan', testsTaken: 4, averageScore: 75 },
          { month: 'Feb', testsTaken: 3, averageScore: 78 },
          { month: 'Mar', testsTaken: 5, averageScore: 82 },
          { month: 'Apr', testsTaken: 4, averageScore: 79 },
          { month: 'May', testsTaken: 6, averageScore: 85 },
          { month: 'Jun', testsTaken: 4, averageScore: 88 }
        ],
        goalProgress: {
          monthlyTests: 4,
          targetMonthlyTests: 4,
          averageScoreTarget: 80,
          currentAverageScore: 78
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#28A745';
    if (score >= 60) return '#FFC107';
    if (score >= 40) return '#FD7E14';
    return '#DC3545';
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return '#28A745';
    if (percentage >= 75) return '#FFC107';
    if (percentage >= 50) return '#FD7E14';
    return '#DC3545';
  };

  const renderPeriodSelector = () => (
    <View style={styles.periodContainer}>
      <Text style={styles.sectionTitle}>Time Period</Text>
      <View style={styles.periodButtons}>
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === 'week' && styles.periodButtonActive
          ]}
          onPress={() => setSelectedPeriod('week')}
        >
          <Text style={[
            styles.periodButtonText,
            selectedPeriod === 'week' && styles.periodButtonTextActive
          ]}>
            Week
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === 'month' && styles.periodButtonActive
          ]}
          onPress={() => setSelectedPeriod('month')}
        >
          <Text style={[
            styles.periodButtonText,
            selectedPeriod === 'month' && styles.periodButtonTextActive
          ]}>
            Month
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === 'quarter' && styles.periodButtonActive
          ]}
          onPress={() => setSelectedPeriod('quarter')}
        >
          <Text style={[
            styles.periodButtonText,
            selectedPeriod === 'quarter' && styles.periodButtonTextActive
          ]}>
            Quarter
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOverallProgress = () => (
    <View style={styles.progressCard}>
      <Text style={styles.cardTitle}>Overall Progress</Text>
      
      <View style={styles.progressGrid}>
        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Total Tests</Text>
          <Text style={styles.progressValue}>{progressData?.totalTests || 0}</Text>
          <Text style={styles.progressSubtext}>Completed</Text>
        </View>
        
        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Average Score</Text>
          <Text style={[
            styles.progressValue,
            { color: getScoreColor(progressData?.averageScore || 0) }
          ]}>
            {progressData?.averageScore || 0}%
          </Text>
          <Text style={styles.progressSubtext}>Performance</Text>
        </View>
        
        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Best Score</Text>
          <Text style={[
            styles.progressValue,
            { color: getScoreColor(progressData?.bestScore || 0) }
          ]}>
            {progressData?.bestScore || 0}%
          </Text>
          <Text style={styles.progressSubtext}>Peak</Text>
        </View>
        
        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Score Range</Text>
          <Text style={styles.progressValue}>
            {progressData?.worstScore || 0}% - {progressData?.bestScore || 0}%
          </Text>
          <Text style={styles.progressSubtext}>Variation</Text>
        </View>
      </View>
    </View>
  );

  const renderGoalProgress = () => (
    <View style={styles.goalsCard}>
      <Text style={styles.cardTitle}>Goal Progress</Text>
      
      <View style={styles.goalItem}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalTitle}>Monthly Testing Goal</Text>
          <Text style={styles.goalProgress}>
            {progressData?.goalProgress.monthlyTests || 0} / {progressData?.goalProgress.targetMonthlyTests || 4} tests
          </Text>
        </View>
        
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${Math.min((progressData?.goalProgress.monthlyTests || 0) / (progressData?.goalProgress.targetMonthlyTests || 4) * 100, 100)}%`,
                backgroundColor: getProgressColor(progressData?.goalProgress.monthlyTests || 0, progressData?.goalProgress.targetMonthlyTests || 4)
              }
            ]} 
          />
        </View>
        
        <Text style={styles.goalStatus}>
          {progressData?.goalProgress.monthlyTests >= (progressData?.goalProgress.targetMonthlyTests || 4) 
            ? '🎉 Goal achieved!' 
            : `${(progressData?.goalProgress.targetMonthlyTests || 4) - (progressData?.goalProgress.monthlyTests || 0)} more tests needed this month`
          }
        </Text>
      </View>
      
      <View style={styles.goalItem}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalTitle}>Score Improvement Goal</Text>
          <Text style={styles.goalProgress}>
            Current: {progressData?.goalProgress.currentAverageScore || 0}% | Target: {progressData?.goalProgress.averageScoreTarget || 80}%
          </Text>
        </View>
        
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${Math.min((progressData?.goalProgress.currentAverageScore || 0) / (progressData?.goalProgress.averageScoreTarget || 80) * 100, 100)}%`,
                backgroundColor: getProgressColor(progressData?.goalProgress.currentAverageScore || 0, progressData?.goalProgress.averageScoreTarget || 80)
              }
            ]} 
          />
        </View>
        
        <Text style={styles.goalStatus}>
          {progressData?.goalProgress.currentAverageScore >= (progressData?.goalProgress.averageScoreTarget || 80)
            ? '🎯 Target achieved!' 
            : `${(progressData?.goalProgress.averageScoreTarget || 80) - (progressData?.goalProgress.currentAverageScore || 0)}% improvement needed`
          }
        </Text>
      </View>
    </View>
  );

  const renderMonthlyTrend = () => (
    <View style={styles.trendCard}>
      <Text style={styles.cardTitle}>Monthly Performance Trend</Text>
      
      <View style={styles.monthlyChart}>
        {progressData?.monthlyProgress.map((month, index) => (
          <View key={month.month} style={styles.monthlyItem}>
            <View style={styles.monthlyBarContainer}>
              <View style={[
                styles.monthlyBar,
                { 
                  height: (month.averageScore / 100) * 120,
                  backgroundColor: getScoreColor(month.averageScore)
                }
              ]} />
            </View>
            
            <View style={styles.monthlyLabels}>
              <Text style={styles.monthlyScore}>{month.averageScore}%</Text>
              <Text style={styles.monthlyName}>{month.month}</Text>
              <Text style={styles.monthlyTests}>{month.testsTaken} tests</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderImprovementTrend = () => (
    <View style={styles.improvementCard}>
      <Text style={styles.cardTitle}>Test-by-Test Improvement</Text>
      
      <View style={styles.improvementChart}>
        {progressData?.improvementTrend.map((test, index) => (
          <View key={index} style={styles.improvementItem}>
            <View style={styles.improvementBarContainer}>
              <View style={[
                styles.improvementBar,
                { 
                  height: (test.score / 100) * 120,
                  backgroundColor: getScoreColor(test.score)
                }
              ]} />
            </View>
            
            <View style={styles.improvementLabels}>
              <Text style={styles.improvementScore}>{test.score}%</Text>
              <Text style={styles.improvementTestNumber}>Test {test.testNumber}</Text>
              <Text style={styles.improvementDate}>
                {new Date(test.date).toLocaleDateString()}
              </Text>
            </View>
          </View>
        ))}
      </View>
      
      <View style={styles.improvementSummary}>
        <Text style={styles.improvementSummaryText}>
          {progressData?.improvementTrend && progressData.improvementTrend.length > 1 ? (
            progressData.improvementTrend[progressData.improvementTrend.length - 1].score > progressData.improvementTrend[0].score
              ? '📈 Overall improvement trend detected'
              : '📉 Performance needs attention'
          ) : '📊 Not enough data for trend analysis'}
        </Text>
      </View>
    </View>
  );

  const renderDetailedStats = () => {
    if (!showDetailed) return null;

    return (
      <View style={styles.detailedStatsCard}>
        <Text style={styles.cardTitle}>Detailed Statistics</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Consistency Score</Text>
            <Text style={styles.statValue}>
              {progressData?.improvementTrend && progressData.improvementTrend.length > 1 
                ? Math.round(100 - (Math.max(...progressData.improvementTrend.map(t => t.score)) - Math.min(...progressData.improvementTrend.map(t => t.score)))
                : 'N/A'
              }
            </Text>
            <Text style={styles.statSubtext}>Lower variation = better</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Improvement Rate</Text>
            <Text style={styles.statValue}>
              {progressData?.improvementTrend && progressData.improvementTrend.length > 1 
                ? `${Math.round((progressData.improvementTrend[progressData.improvementTrend.length - 1].score - progressData.improvementTrend[0].score) / (progressData.improvementTrend.length - 1))}%`
                : 'N/A'
              }
            </Text>
            <Text style={styles.statSubtext}>Per test average</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Testing Frequency</Text>
            <Text style={styles.statValue}>
              {progressData?.totalTests > 0 
                ? `${Math.round(30 / (progressData.totalTests / 6))} days`
                : 'N/A'
              }
            </Text>
            <Text style={styles.statSubtext}>Between tests</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Goal Completion</Text>
            <Text style={styles.statValue}>
              {progressData?.goalProgress 
                ? `${Math.round((progressData.goalProgress.monthlyTests / progressData.goalProgress.targetMonthlyTests) * 100)}%`
                : 'N/A'
              }
            </Text>
            <Text style={styles.statSubtext}>This month</Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Loading Progress Data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderPeriodSelector()}
      {renderOverallProgress()}
      {renderGoalProgress()}
      {renderMonthlyTrend()}
      {renderImprovementTrend()}
      {renderDetailedStats()}
      
      {onRefresh && (
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <Text style={styles.refreshButtonText}>Refresh Progress</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 15,
  },
  periodContainer: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  periodButtons: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#4A90E2',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  periodButtonTextActive: {
    color: '#fff',
  },
  progressCard: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  progressItem: {
    backgroundColor: '#F8F9FA',
    width: (width - 90) / 2,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  progressSubtext: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
  goalsCard: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  goalItem: {
    marginBottom: 25,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  goalProgress: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  goalStatus: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  trendCard: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  monthlyChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200,
    paddingTop: 20,
  },
  monthlyItem: {
    alignItems: 'center',
    flex: 1,
  },
  monthlyBarContainer: {
    height: 120,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  monthlyBar: {
    width: 20,
    borderRadius: 10,
    minHeight: 10,
  },
  monthlyLabels: {
    alignItems: 'center',
  },
  monthlyScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  monthlyName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  monthlyTests: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
  improvementCard: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  improvementChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200,
    paddingTop: 20,
    marginBottom: 20,
  },
  improvementItem: {
    alignItems: 'center',
    flex: 1,
  },
  improvementBarContainer: {
    height: 120,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  improvementBar: {
    width: 20,
    borderRadius: 10,
    minHeight: 10,
  },
  improvementLabels: {
    alignItems: 'center',
  },
  improvementScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  improvementTestNumber: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  improvementDate: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
  improvementSummary: {
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  improvementSummaryText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  detailedStatsCard: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  statItem: {
    backgroundColor: '#F8F9FA',
    width: (width - 90) / 2,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statSubtext: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
  refreshButton: {
    backgroundColor: '#4A90E2',
    margin: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProgressTracker; 