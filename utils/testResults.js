// Test Results Management System
class TestResultsManager {
    constructor() {
        this.storageKey = 'alzico_test_results';
        this.results = this.loadResults();
    }

    // Load results from localStorage
    loadResults() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading test results:', error);
            return [];
        }
    }

    // Save results to localStorage
    saveResults() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.results));
        } catch (error) {
            console.error('Error saving test results:', error);
        }
    }

    // Add new test result
    addResult(testResult) {
        const result = {
            ...testResult,
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };

        this.results.push(result);
        this.saveResults();
        return result;
    }

    // Get all results
    getAllResults() {
        return this.results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    // Get results for specific test
    getTestResults(testId) {
        return this.results.filter(result => result.testId === testId);
    }

    // Get latest result for specific test
    getLatestTestResult(testId) {
        const testResults = this.getTestResults(testId);
        return testResults.length > 0 ? testResults[0] : null;
    }

    // Get user progress over time
    getUserProgress() {
        const progress = {};
        
        this.results.forEach(result => {
            if (!progress[result.testId]) {
                progress[result.testId] = [];
            }
            progress[result.testId].push({
                date: result.date,
                score: result.score,
                percentage: result.percentage,
                timestamp: result.timestamp
            });
        });

        return progress;
    }

    // Generate test report
    generateReport(testId) {
        const testResults = this.getTestResults(testId);
        if (testResults.length === 0) return null;

        const latest = testResults[0];
        const average = testResults.reduce((sum, r) => sum + r.percentage, 0) / testResults.length;
        const trend = this.calculateTrend(testResults);

        return {
            testId: testId,
            testName: latest.testName,
            latestScore: latest.percentage,
            averageScore: Math.round(average),
            totalTests: testResults.length,
            trend: trend,
            firstTest: testResults[testResults.length - 1].date,
            lastTest: latest.date,
            recommendations: this.getRecommendations(latest.percentage, testId)
        };
    }

    // Calculate trend (improving, declining, stable)
    calculateTrend(results) {
        if (results.length < 2) return 'stable';

        const recent = results.slice(0, 3).reduce((sum, r) => sum + r.percentage, 0) / Math.min(3, results.length);
        const older = results.slice(-3).reduce((sum, r) => sum + r.percentage, 0) / Math.min(3, results.length);

        if (recent > older + 5) return 'improving';
        if (recent < older - 5) return 'declining';
        return 'stable';
    }

    // Get recommendations based on score
    getRecommendations(percentage, testId) {
        const recommendations = [];

        if (percentage >= 80) {
            recommendations.push('Excellent cognitive performance');
            recommendations.push('Continue current cognitive activities');
            recommendations.push('Consider annual cognitive screening');
        } else if (percentage >= 60) {
            recommendations.push('Good cognitive performance');
            recommendations.push('Monitor for any changes');
            recommendations.push('Engage in cognitive training exercises');
        } else if (percentage >= 40) {
            recommendations.push('Mild cognitive concerns detected');
            recommendations.push('Consult with healthcare provider');
            recommendations.push('Implement cognitive training program');
            recommendations.push('Monitor closely for changes');
        } else {
            recommendations.push('Significant cognitive concerns detected');
            recommendations.push('Immediate consultation with healthcare provider recommended');
            recommendations.push('Consider comprehensive neuropsychological evaluation');
            recommendations.push('Implement support services as needed');
        }

        // Test-specific recommendations
        const testSpecific = this.getTestSpecificRecommendations(testId, percentage);
        recommendations.push(...testSpecific);

        return recommendations;
    }

    // Get test-specific recommendations
    getTestSpecificRecommendations(testId, percentage) {
        const recommendations = [];

        switch (testId) {
            case 'mmse':
                if (percentage < 60) {
                    recommendations.push('Consider MMSE follow-up with healthcare provider');
                    recommendations.push('Monitor daily cognitive function');
                }
                break;
            case 'adas-cog13':
                if (percentage < 60) {
                    recommendations.push('ADAS-Cog13 results suggest cognitive decline');
                    recommendations.push('Neurological evaluation recommended');
                }
                break;
            case 'cdr':
                if (percentage < 60) {
                    recommendations.push('CDR results indicate functional impairment');
                    recommendations.push('Comprehensive dementia evaluation recommended');
                }
                break;
            case 'clock-drawing':
                if (percentage < 60) {
                    recommendations.push('Visuospatial difficulties detected');
                    recommendations.push('Occupational therapy evaluation recommended');
                }
                break;
            case 'trail-making':
                if (percentage < 60) {
                    recommendations.push('Attention and processing speed concerns');
                    recommendations.push('Cognitive training for attention recommended');
                }
                break;
            case 'verbal-fluency':
                if (percentage < 60) {
                    recommendations.push('Language and executive function concerns');
                    recommendations.push('Speech therapy evaluation recommended');
                }
                break;
            case 'digit-span':
                if (percentage < 60) {
                    recommendations.push('Memory and attention concerns');
                    recommendations.push('Memory training exercises recommended');
                }
                break;
            case 'boston-naming':
                if (percentage < 60) {
                    recommendations.push('Naming and language difficulties');
                    recommendations.push('Language assessment recommended');
                }
                break;
            case 'rey-auditory':
                if (percentage < 60) {
                    recommendations.push('Verbal learning and memory concerns');
                    recommendations.push('Memory rehabilitation program recommended');
                }
                break;
            case 'stroop-test':
                if (percentage < 60) {
                    recommendations.push('Executive function and inhibition concerns');
                    recommendations.push('Executive function training recommended');
                }
                break;
            case 'category-fluency':
                if (percentage < 60) {
                    recommendations.push('Semantic memory and fluency concerns');
                    recommendations.push('Category-based cognitive training recommended');
                }
                break;
            case 'block-design':
                if (percentage < 60) {
                    recommendations.push('Visuospatial and constructional concerns');
                    recommendations.push('Spatial reasoning training recommended');
                }
                break;
            case 'logical-memory':
                if (percentage < 60) {
                    recommendations.push('Story recall and comprehension concerns');
                    recommendations.push('Memory and comprehension training recommended');
                }
                break;
        }

        return recommendations;
    }

    // Export results as JSON
    exportResults() {
        const dataStr = JSON.stringify(this.results, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `alzico_test_results_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    // Clear all results
    clearResults() {
        if (confirm('Are you sure you want to clear all test results? This action cannot be undone.')) {
            this.results = [];
            this.saveResults();
        }
    }

    // Get statistics
    getStatistics() {
        if (this.results.length === 0) return null;

        const totalTests = this.results.length;
        const totalScore = this.results.reduce((sum, r) => sum + r.percentage, 0);
        const averageScore = totalScore / totalTests;
        
        const testCounts = {};
        this.results.forEach(result => {
            testCounts[result.testId] = (testCounts[result.testId] || 0) + 1;
        });

        const recentResults = this.results.slice(0, 5);
        const recentAverage = recentResults.reduce((sum, r) => sum + r.percentage, 0) / recentResults.length;

        return {
            totalTests: totalTests,
            averageScore: Math.round(averageScore),
            recentAverage: Math.round(recentAverage),
            testCounts: testCounts,
            firstTest: this.results[this.results.length - 1].date,
            lastTest: this.results[0].date,
            totalTime: this.results.reduce((sum, r) => sum + (r.timeSpent || 0), 0)
        };
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestResultsManager;
} else {
    window.TestResultsManager = TestResultsManager;
} 