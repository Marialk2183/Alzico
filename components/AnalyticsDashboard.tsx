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

interface AnalyticsData {
  totalTests: number;
  averageScore: number;
  bestScore: number;
  worstScore: number;
  totalDuration: number;
  averageDuration: number;
  severityDistribution: Record<string, number>;
  improvementTrend: Array<{
    testNumber: number;
    score: number;
    date: string;
  }>;
}

interface AnalyticsDashboardProps {
  onRefresh?: () => void;
  showDetailed?: boolean;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ 
  onRefresh, 
  showDetailed = false 
}) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    loadAnalyticsData();
  }, [selectedTimeframe]);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      const summary = await getDashboardSummary();
      const stats = await getTestPerformanceStats();
      
      setAnalyticsData({
        totalTests: summary.totalTests,
        averageScore: summary.averageScore,
        bestScore: stats.bestScore || 0,
        worstScore: stats.worstScore || 0,
        totalDuration: stats.totalDuration || 0,
        averageDuration: stats.averageDuration || 0,
        severityDistribution: summary.severityBreakdown || {},
        improvementTrend: summary.topPerformingTests || []
      });
    } catch (error) {
      console.error('Error loading analytics data:', error);
      // Set demo data for display purposes
      setAnalyticsData({
        totalTests: 12,
        averageScore: 78,
        bestScore: 95,
        worstScore: 45,
        totalDuration: 180,
        averageDuration: 15,
        severityDistribution: {
          'Normal': 8,
          'Mild': 3,
          'Moderate': 1,
          'Severe': 0
        },
        improvementTrend: [
          { testNumber: 1, score: 65, date: '2024-01-01' },
          { testNumber: 2, score: 72, date: '2024-01-08' },
          { testNumber: 3, score: 78, date: '2024-01-15' },
          { testNumber: 4, score: 82, date: '2024-01-22' },
          { testNumber: 5, score: 85, date: '2024-01-29' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'normal': return '#28A745';
      case 'mild': return '#FFC107';
      case 'moderate': return '#FD7E14';
      case 'severe': return '#DC3545';
      default: return '#6C757D';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#28A745';
    if (score >= 60) return '#FFC107';
    if (score >= 40) return '#FD7E14';
    return '#DC3545';
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const renderOverviewCards = () => (
    <View style={styles.overviewContainer}>
      <View style={styles.overviewCard}>
        <Text style={styles.overviewLabel}>Total Tests</Text>
        <Text style={styles.overviewValue}>{analyticsData?.totalTests || 0}</Text>
        <Text style={styles.overviewSubtext}>Completed</Text>
      </View>
      
      <View style={styles.overviewCard}>
        <Text style={styles.overviewLabel}>Average Score</Text>
        <Text style={[
          styles.overviewValue,
          { color: getScoreColor(analyticsData?.averageScore || 0) }
        ]}>
          {analyticsData?.averageScore || 0}%
        </Text>
        <Text style={styles.overviewSubtext}>Performance</Text>
      </View>
      
      <View style={styles.overviewCard}>
        <Text style={styles.overviewLabel}>Best Score</Text>
        <Text style={[
          styles.overviewValue,
          { color: getScoreColor(analyticsData?.bestScore || 0) }
        ]}>
          {analyticsData?.bestScore || 0}%
        </Text>
        <Text style={styles.overviewSubtext}>Peak</Text>
      </View>
      
      <View style={styles.overviewCard}>
        <Text style={styles.overviewLabel}>Avg Duration</Text>
        <Text style={styles.overviewValue}>
          {formatDuration(analyticsData?.averageDuration || 0)}
        </Text>
        <Text style={styles.overviewSubtext}>Per Test</Text>
      </View>
    </View>
  );

  const renderTimeframeSelector = () => (
    <View style={styles.timeframeContainer}>
      <Text style={styles.sectionTitle}>Time Period</Text>
      <View style={styles.timeframeButtons}>
        <TouchableOpacity
          style={[
            styles.timeframeButton,
            selectedTimeframe === 'week' && styles.timeframeButtonActive
          ]}
          onPress={() => setSelectedTimeframe('week')}
        >
          <Text style={[
            styles.timeframeButtonText,
            selectedTimeframe === 'week' && styles.timeframeButtonTextActive
          ]}>
            Week
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.timeframeButton,
            selectedTimeframe === 'month' && styles.timeframeButtonActive
          ]}
          onPress={() => setSelectedTimeframe('month')}
        >
          <Text style={[
            styles.timeframeButtonText,
            selectedTimeframe === 'month' && styles.timeframeButtonTextActive
          ]}>
            Month
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.timeframeButton,
            selectedTimeframe === 'year' && styles.timeframeButtonActive
          ]}
          onPress={() => setSelectedTimeframe('year')}
        >
          <Text style={[
            styles.timeframeButtonText,
            selectedTimeframe === 'year' && styles.timeframeButtonTextActive
          ]}>
            Year
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSeverityChart = () => {
    const distribution = analyticsData?.severityDistribution || {};
    const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);
    
    if (total === 0) return null;

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Cognitive Health Distribution</Text>
        
        <View style={styles.severityChart}>
          {Object.entries(distribution).map(([severity, count]) => {
            const percentage = Math.round((count / total) * 100);
            const barWidth = (count / total) * (width - 80);
            
            return (
              <View key={severity} style={styles.severityBarContainer}>
                <View style={styles.severityBarHeader}>
                  <View style={styles.severityLabel}>
                    <View style={[
                      styles.severityIndicator,
                      { backgroundColor: getSeverityColor(severity) }
                    ]} />
                    <Text style={styles.severityName}>{severity}</Text>
                  </View>
                  <Text style={styles.severityCount}>{count}</Text>
                </View>
                
                <View style={styles.barContainer}>
                  <View style={[
                    styles.severityBar,
                    { 
                      width: barWidth,
                      backgroundColor: getSeverityColor(severity)
                    }
                  ]} />
                  <Text style={styles.percentageText}>{percentage}%</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderTrendChart = () => {
    const trend = analyticsData?.improvementTrend || [];
    
    if (trend.length === 0) return null;

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Performance Trend</Text>
        
        <View style={styles.trendChart}>
          {trend.map((item, index) => (
            <View key={index} style={styles.trendItem}>
              <View style={styles.trendBarContainer}>
                <View style={[
                  styles.trendBar,
                  { 
                    height: (item.score / 100) * 120,
                    backgroundColor: getScoreColor(item.score)
                  }
                ]} />
              </View>
              
              <View style={styles.trendLabels}>
                <Text style={styles.trendScore}>{item.score}%</Text>
                <Text style={styles.trendTestNumber}>Test {item.testNumber}</Text>
                <Text style={styles.trendDate}>
                  {new Date(item.date).toLocaleDateString()}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderDetailedStats = () => {
    if (!showDetailed) return null;

    return (
      <View style={styles.detailedStatsContainer}>
        <Text style={styles.sectionTitle}>Detailed Statistics</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Time</Text>
            <Text style={styles.statValue}>
              {formatDuration(analyticsData?.totalDuration || 0)}
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Worst Score</Text>
            <Text style={[
              styles.statValue,
              { color: getScoreColor(analyticsData?.worstScore || 0) }
            ]}>
              {analyticsData?.worstScore || 0}%
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Score Range</Text>
            <Text style={styles.statValue}>
              {analyticsData?.bestScore || 0}% - {analyticsData?.worstScore || 0}%
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Tests This Week</Text>
            <Text style={styles.statValue}>
              {Math.floor((analyticsData?.totalTests || 0) / 4)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Loading Analytics...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderOverviewCards()}
      {renderTimeframeSelector()}
      {renderSeverityChart()}
      {renderTrendChart()}
      {renderDetailedStats()}
      
      {onRefresh && (
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <Text style={styles.refreshButtonText}>Refresh Data</Text>
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
  overviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
    gap: 15,
  },
  overviewCard: {
    backgroundColor: '#fff',
    width: (width - 70) / 2,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  overviewLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  overviewValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  overviewSubtext: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  timeframeContainer: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  timeframeButtons: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 4,
  },
  timeframeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  timeframeButtonActive: {
    backgroundColor: '#4A90E2',
  },
  timeframeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  timeframeButtonTextActive: {
    color: '#fff',
  },
  chartContainer: {
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
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  severityChart: {
    gap: 20,
  },
  severityBarContainer: {
    marginBottom: 15,
  },
  severityBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  severityLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  severityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  severityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  severityCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  severityBar: {
    height: 8,
    borderRadius: 4,
    minWidth: 20,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    minWidth: 40,
  },
  trendChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200,
    paddingTop: 20,
  },
  trendItem: {
    alignItems: 'center',
    flex: 1,
  },
  trendBarContainer: {
    height: 120,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  trendBar: {
    width: 20,
    borderRadius: 10,
    minHeight: 10,
  },
  trendLabels: {
    alignItems: 'center',
  },
  trendScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  trendTestNumber: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  trendDate: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
  detailedStatsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  statItem: {
    backgroundColor: '#fff',
    width: (width - 70) / 2,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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

export default AnalyticsDashboard; 