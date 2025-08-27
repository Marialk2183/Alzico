// Complete Test Engine for All 13 Cognitive Tests
class CognitiveTestEngine {
    constructor() {
        this.currentTest = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.startTime = null;
        this.testResults = {};
    }

    // Get all available tests
    getAllTests() {
        return [
            {
                id: 'mmse',
                name: 'MMSE',
                fullName: 'Mini-Mental State Examination',
                description: '30-point global cognitive assessment covering orientation, memory, attention, language, and visuospatial skills.',
                duration: 10,
                difficulty: 'Easy',
                maxScore: 30,
                icon: '🧠',
                color: '#34C759'
            },
            {
                id: 'adas-cog13',
                name: 'ADAS-Cog13',
                fullName: 'Alzheimer\'s Disease Assessment Scale',
                description: '13-item comprehensive assessment specifically designed for Alzheimer\'s disease detection and monitoring.',
                duration: 20,
                difficulty: 'Medium',
                maxScore: 85,
                icon: '🔬',
                color: '#FF6B6B'
            },
            {
                id: 'cdr',
                name: 'CDR',
                fullName: 'Clinical Dementia Rating Scale',
                description: 'Dementia staging and severity assessment across six functional domains.',
                duration: 15,
                difficulty: 'Medium',
                maxScore: 3,
                icon: '📊',
                color: '#FF9500'
            },
            {
                id: 'clock-drawing',
                name: 'Clock Drawing',
                fullName: 'Clock Drawing Test',
                description: 'Visuospatial and executive function assessment requiring clock face construction.',
                duration: 5,
                difficulty: 'Medium',
                maxScore: 10,
                icon: '🕐',
                color: '#2196F3'
            },
            {
                id: 'trail-making',
                name: 'Trail Making',
                fullName: 'Trail Making Test',
                description: 'Attention and executive function assessment measuring processing speed and mental flexibility.',
                duration: 8,
                difficulty: 'Medium',
                maxScore: 20,
                icon: '🔄',
                color: '#607D8B'
            },
            {
                id: 'verbal-fluency',
                name: 'Verbal Fluency',
                fullName: 'Verbal Fluency Test (FAS)',
                description: 'Language ability and executive function assessment measuring word generation.',
                duration: 6,
                difficulty: 'Medium',
                maxScore: 15,
                icon: '💬',
                color: '#795548'
            },
            {
                id: 'digit-span',
                name: 'Digit Span',
                fullName: 'Digit Span Test',
                description: 'Immediate and working memory assessment measuring number sequence recall.',
                duration: 7,
                difficulty: 'Medium',
                maxScore: 16,
                icon: '🔢',
                color: '#9C27B0'
            },
            {
                id: 'boston-naming',
                name: 'Boston Naming',
                fullName: 'Boston Naming Test',
                description: 'Confrontational naming ability assessment measuring language function.',
                duration: 8,
                difficulty: 'Medium',
                maxScore: 15,
                icon: '🖼️',
                color: '#795548'
            },
            {
                id: 'rey-auditory',
                name: 'Rey Auditory',
                fullName: 'Rey Auditory Verbal Learning Test',
                description: 'Verbal learning and memory assessment measuring word list recall.',
                duration: 12,
                difficulty: 'Hard',
                maxScore: 20,
                icon: '🎧',
                color: '#9C27B0'
            },
            {
                id: 'stroop-test',
                name: 'Stroop Test',
                fullName: 'Stroop Color and Word Test',
                description: 'Cognitive interference and executive function assessment measuring response inhibition.',
                duration: 8,
                difficulty: 'Hard',
                maxScore: 15,
                icon: '🎨',
                color: '#E91E63'
            },
            {
                id: 'category-fluency',
                name: 'Category Fluency',
                fullName: 'Category Fluency Test',
                description: 'Semantic memory and verbal fluency assessment measuring category word generation.',
                duration: 5,
                difficulty: 'Easy',
                maxScore: 10,
                icon: '📝',
                color: '#795548'
            },
            {
                id: 'block-design',
                name: 'Block Design',
                fullName: 'Block Design Test',
                description: 'Visuospatial ability and constructional praxis assessment using geometric patterns.',
                duration: 10,
                difficulty: 'Medium',
                maxScore: 15,
                icon: '🧩',
                color: '#2196F3'
            },
            {
                id: 'logical-memory',
                name: 'Logical Memory',
                fullName: 'Logical Memory Test',
                description: 'Story recall and comprehension assessment measuring verbal memory.',
                duration: 8,
                difficulty: 'Medium',
                maxScore: 15,
                icon: '📖',
                color: '#9C27B0'
            }
        ];
    }

    // Start a specific test
    startTest(testId) {
        this.currentTest = testId;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.startTime = Date.now();
        
        return this.getTestData(testId);
    }

    // Get test data and questions
    getTestData(testId) {
        const testData = {
            'mmse': this.getMMSETest(),
            'adas-cog13': this.getADASCogTest(),
            'cdr': this.getCDRTest(),
            'clock-drawing': this.getClockDrawingTest(),
            'trail-making': this.getTrailMakingTest(),
            'verbal-fluency': this.getVerbalFluencyTest(),
            'digit-span': this.getDigitSpanTest(),
            'boston-naming': this.getBostonNamingTest(),
            'rey-auditory': this.getReyAuditoryTest(),
            'stroop-test': this.getStroopTest(),
            'category-fluency': this.getCategoryFluencyTest(),
            'block-design': this.getBlockDesignTest(),
            'logical-memory': this.getLogicalMemoryTest()
        };

        return testData[testId] || null;
    }

    // MMSE Test Implementation
    getMMSETest() {
        return {
            title: 'Mini-Mental State Examination (MMSE)',
            instructions: 'This test evaluates your overall cognitive function. Please answer each question to the best of your ability.',
            questions: [
                {
                    id: 'mmse_1',
                    type: 'text-input',
                    question: 'What year is it?',
                    points: 1,
                    timeLimit: 30,
                    correctAnswer: new Date().getFullYear().toString()
                },
                {
                    id: 'mmse_2',
                    type: 'multiple-choice',
                    question: 'What season is it?',
                    options: ['Spring', 'Summer', 'Fall', 'Winter'],
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'mmse_3',
                    type: 'text-input',
                    question: 'What month is it?',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'mmse_4',
                    type: 'multiple-choice',
                    question: 'What day of the week is it?',
                    options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'mmse_5',
                    type: 'text-input',
                    question: 'What date is it?',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'mmse_6',
                    type: 'text-input',
                    question: 'What country are we in?',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'mmse_7',
                    type: 'text-input',
                    question: 'What state/province are we in?',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'mmse_8',
                    type: 'text-input',
                    question: 'What city are we in?',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'mmse_9',
                    type: 'text-input',
                    question: 'What building are we in?',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'mmse_10',
                    type: 'text-input',
                    question: 'What floor are we on?',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'mmse_11',
                    type: 'recall',
                    question: 'I will say three words. Please repeat them: APPLE, PENNY, TABLE',
                    points: 3,
                    timeLimit: 60,
                    correctAnswer: 'apple penny table'
                },
                {
                    id: 'mmse_12',
                    type: 'sequence',
                    question: 'Spell the word "WORLD" backwards',
                    points: 1,
                    timeLimit: 60,
                    correctAnswer: 'dlrow'
                },
                {
                    id: 'mmse_13',
                    type: 'recall',
                    question: 'Now repeat the three words I said earlier: APPLE, PENNY, TABLE',
                    points: 3,
                    timeLimit: 60,
                    correctAnswer: 'apple penny table'
                },
                {
                    id: 'mmse_14',
                    type: 'recognition',
                    question: 'What is this object? (Show a pencil)',
                    points: 1,
                    timeLimit: 30,
                    correctAnswer: 'pencil'
                },
                {
                    id: 'mmse_15',
                    type: 'sequence',
                    question: 'Follow this command: "Take a piece of paper in your right hand, fold it in half, and put it on the floor"',
                    points: 3,
                    timeLimit: 120
                },
                {
                    id: 'mmse_16',
                    type: 'text-input',
                    question: 'Read and follow this instruction: "CLOSE YOUR EYES"',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'mmse_17',
                    type: 'text-input',
                    question: 'Write a complete sentence',
                    points: 1,
                    timeLimit: 60
                },
                {
                    id: 'mmse_18',
                    type: 'drawing',
                    question: 'Copy this design (Show intersecting pentagons)',
                    points: 1,
                    timeLimit: 120
                }
            ]
        };
    }

    // ADAS-Cog13 Test Implementation
    getADASCogTest() {
        return {
            title: 'ADAS-Cog13 Assessment',
            instructions: 'This test is specifically designed to assess cognitive changes associated with Alzheimer\'s disease. Please complete each task as instructed.',
            questions: [
                {
                    id: 'adas_1',
                    type: 'recall',
                    question: 'Word Recall: Remember these 10 words: Apple, Penny, Table, House, Ocean, Chair, Phone, Lamp, Book, Tree',
                    points: 10,
                    timeLimit: 60
                },
                {
                    id: 'adas_2',
                    type: 'sequence',
                    question: 'Commands: Follow these commands exactly: 1) Make a fist, 2) Point to ceiling then floor, 3) Put right hand on left ear',
                    points: 5,
                    timeLimit: 120
                },
                {
                    id: 'adas_3',
                    type: 'drawing',
                    question: 'Constructive Praxis: Copy this geometric shape exactly (Show a circle with a cross inside)',
                    points: 5,
                    timeLimit: 60
                },
                {
                    id: 'adas_4',
                    type: 'recognition',
                    question: 'Naming: Name these objects: Pencil, Watch, Shoe, Chair, Key',
                    points: 5,
                    timeLimit: 60
                },
                {
                    id: 'adas_5',
                    type: 'sequence',
                    question: 'Ideational Praxis: Show how to use: Comb, Toothbrush, Scissors, Spoon',
                    points: 5,
                    timeLimit: 120
                },
                {
                    id: 'adas_6',
                    type: 'text-input',
                    question: 'Orientation: What year, month, day, city, and building are we in?',
                    points: 8,
                    timeLimit: 90
                },
                {
                    id: 'adas_7',
                    type: 'recognition',
                    question: 'Word Recognition: Identify previously seen words from a list',
                    points: 12,
                    timeLimit: 90
                },
                {
                    id: 'adas_8',
                    type: 'sequence',
                    question: 'Comprehension: Follow complex instructions',
                    points: 5,
                    timeLimit: 120
                },
                {
                    id: 'adas_9',
                    type: 'text-input',
                    question: 'Word Finding: Complete sentences with missing words',
                    points: 5,
                    timeLimit: 90
                },
                {
                    id: 'adas_10',
                    type: 'multiple-choice',
                    question: 'Spoken Language Ability: Rate speech clarity and fluency',
                    options: ['Normal', 'Mild impairment', 'Moderate impairment', 'Severe impairment'],
                    points: 5,
                    timeLimit: 60
                },
                {
                    id: 'adas_11',
                    type: 'recall',
                    question: 'Delayed Word Recall: Remember the 10 words from earlier',
                    points: 10,
                    timeLimit: 60
                },
                {
                    id: 'adas_12',
                    type: 'text-input',
                    question: 'Remembering Test Instructions: What were you supposed to do?',
                    points: 5,
                    timeLimit: 60
                },
                {
                    id: 'adas_13',
                    type: 'recognition',
                    question: 'Number Cancellation: Find and mark all number "3" in this grid',
                    points: 5,
                    timeLimit: 90
                }
            ]
        };
    }

    // CDR Test Implementation
    getCDRTest() {
        return {
            title: 'Clinical Dementia Rating Scale (CDR)',
            instructions: 'This assessment evaluates your cognitive and functional abilities across multiple domains. Please answer each question honestly.',
            questions: [
                {
                    id: 'cdr_1',
                    type: 'multiple-choice',
                    question: 'Memory: How would you rate your memory problems?',
                    options: ['No memory problems', 'Mild memory problems', 'Moderate memory problems', 'Severe memory problems'],
                    points: 1,
                    timeLimit: 60
                },
                {
                    id: 'cdr_2',
                    type: 'multiple-choice',
                    question: 'Orientation: How well do you know where you are and what time it is?',
                    options: ['Fully oriented', 'Mildly disoriented', 'Moderately disoriented', 'Severely disoriented'],
                    points: 1,
                    timeLimit: 60
                },
                {
                    id: 'cdr_3',
                    type: 'multiple-choice',
                    question: 'Judgment: How well can you make decisions and solve problems?',
                    options: ['Good judgment', 'Mildly impaired', 'Moderately impaired', 'Severely impaired'],
                    points: 1,
                    timeLimit: 60
                },
                {
                    id: 'cdr_4',
                    type: 'multiple-choice',
                    question: 'Community Affairs: How well can you handle financial and community responsibilities?',
                    options: ['Independent', 'Mildly impaired', 'Moderately impaired', 'Severely impaired'],
                    points: 1,
                    timeLimit: 60
                },
                {
                    id: 'cdr_5',
                    type: 'multiple-choice',
                    question: 'Home and Hobbies: How well can you manage household tasks and hobbies?',
                    options: ['Independent', 'Mildly impaired', 'Moderately impaired', 'Severely impaired'],
                    points: 1,
                    timeLimit: 60
                },
                {
                    id: 'cdr_6',
                    type: 'multiple-choice',
                    question: 'Personal Care: How well can you take care of yourself?',
                    options: ['Fully independent', 'Mildly impaired', 'Moderately impaired', 'Severely impaired'],
                    points: 1,
                    timeLimit: 60
                }
            ]
        };
    }

    // Clock Drawing Test Implementation
    getClockDrawingTest() {
        return {
            title: 'Clock Drawing Test',
            instructions: 'Draw a clock face with all numbers and set the hands to show 10 minutes past 11 o\'clock.',
            questions: [
                {
                    id: 'clock_1',
                    type: 'drawing',
                    question: 'Draw a clock face with numbers 1-12 and set hands to 11:10',
                    points: 10,
                    timeLimit: 300
                }
            ]
        };
    }

    // Trail Making Test Implementation
    getTrailMakingTest() {
        return {
            title: 'Trail Making Test',
            instructions: 'Connect the dots in sequence as quickly as possible. Part A: Connect numbers 1-25. Part B: Connect numbers and letters alternately.',
            questions: [
                {
                    id: 'trail_a',
                    type: 'timed',
                    question: 'Part A: Connect numbers 1-25 in sequence',
                    points: 10,
                    timeLimit: 300
                },
                {
                    id: 'trail_b',
                    type: 'timed',
                    question: 'Part B: Connect numbers and letters alternately (1-A-2-B-3-C...)',
                    points: 10,
                    timeLimit: 300
                }
            ]
        };
    }

    // Verbal Fluency Test Implementation
    getVerbalFluencyTest() {
        return {
            title: 'Verbal Fluency Test (FAS)',
            instructions: 'Generate as many words as possible beginning with the letters F, A, and S. You have 60 seconds for each letter.',
            questions: [
                {
                    id: 'fluency_f',
                    type: 'timed',
                    question: 'Generate words beginning with F (60 seconds)',
                    points: 5,
                    timeLimit: 60
                },
                {
                    id: 'fluency_a',
                    type: 'timed',
                    question: 'Generate words beginning with A (60 seconds)',
                    points: 5,
                    timeLimit: 60
                },
                {
                    id: 'fluency_s',
                    type: 'timed',
                    question: 'Generate words beginning with S (60 seconds)',
                    points: 5,
                    timeLimit: 60
                }
            ]
        };
    }

    // Digit Span Test Implementation
    getDigitSpanTest() {
        return {
            title: 'Digit Span Test',
            instructions: 'Listen to sequences of numbers and repeat them. Forward: Repeat in same order. Backward: Repeat in reverse order.',
            questions: [
                {
                    id: 'digit_forward',
                    type: 'sequence',
                    question: 'Forward: Repeat these numbers in the same order: 3-7-9-1-4',
                    points: 8,
                    timeLimit: 120
                },
                {
                    id: 'digit_backward',
                    type: 'sequence',
                    question: 'Backward: Repeat these numbers in reverse order: 8-2-6-9-3',
                    points: 8,
                    timeLimit: 120
                }
            ]
        };
    }

    // Boston Naming Test Implementation
    getBostonNamingTest() {
        return {
            title: 'Boston Naming Test',
            instructions: 'Name the object shown in each picture. If you can\'t name it, try to describe what it is.',
            questions: [
                {
                    id: 'naming_1',
                    type: 'recognition',
                    question: 'Name this object (Picture 1)',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'naming_2',
                    type: 'recognition',
                    question: 'Name this object (Picture 2)',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'naming_3',
                    type: 'recognition',
                    question: 'Name this object (Picture 3)',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'naming_4',
                    type: 'recognition',
                    question: 'Name this object (Picture 4)',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'naming_5',
                    type: 'recognition',
                    question: 'Name this object (Picture 5)',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'naming_6',
                    type: 'recognition',
                    question: 'Name this object (Picture 6)',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'naming_7',
                    type: 'recognition',
                    question: 'Name this object (Picture 7)',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'naming_8',
                    type: 'recognition',
                    question: 'Name this object (Picture 8)',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'naming_9',
                    type: 'recognition',
                    question: 'Name this object (Picture 9)',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'naming_10',
                    type: 'recognition',
                    question: 'Name this object (Picture 10)',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'naming_11',
                    type: 'recognition',
                    question: 'Name this object (Picture 11)',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'naming_12',
                    question: 'Name this object (Picture 12)',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'naming_13',
                    type: 'recognition',
                    question: 'Name this object (Picture 13)',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'naming_14',
                    type: 'recognition',
                    question: 'Name this object (Picture 14)',
                    points: 1,
                    timeLimit: 30
                },
                {
                    id: 'naming_15',
                    type: 'recognition',
                    question: 'Name this object (Picture 15)',
                    points: 1,
                    timeLimit: 30
                }
            ]
        };
    }

    // Rey Auditory Test Implementation
    getReyAuditoryTest() {
        return {
            title: 'Rey Auditory Verbal Learning Test',
            instructions: 'Listen to a list of 15 words and try to remember them. You will be asked to recall them several times.',
            questions: [
                {
                    id: 'rey_trial1',
                    type: 'recall',
                    question: 'Trial 1: Recall as many words as you can remember',
                    points: 5,
                    timeLimit: 60
                },
                {
                    id: 'rey_trial2',
                    type: 'recall',
                    question: 'Trial 2: Recall as many words as you can remember',
                    points: 5,
                    timeLimit: 60
                },
                {
                    id: 'rey_trial3',
                    type: 'recall',
                    question: 'Trial 3: Recall as many words as you can remember',
                    points: 5,
                    timeLimit: 60
                },
                {
                    id: 'rey_delayed',
                    type: 'recall',
                    question: 'Delayed Recall: After a delay, recall as many words as you can remember',
                    points: 5,
                    timeLimit: 60
                }
            ]
        };
    }

    // Stroop Test Implementation
    getStroopTest() {
        return {
            title: 'Stroop Color and Word Test',
            instructions: 'Name the color of the ink, not the word. For example, if you see the word "RED" written in blue ink, say "blue".',
            questions: [
                {
                    id: 'stroop_congruent',
                    type: 'timed',
                    question: 'Congruent: Name the color of the ink (words match colors)',
                    points: 5,
                    timeLimit: 120
                },
                {
                    id: 'stroop_incongruent',
                    type: 'timed',
                    question: 'Incongruent: Name the color of the ink (words don\'t match colors)',
                    points: 5,
                    timeLimit: 120
                },
                {
                    id: 'stroop_interference',
                    type: 'timed',
                    question: 'Interference: Calculate the difference between congruent and incongruent times',
                    points: 5,
                    timeLimit: 60
                }
            ]
        };
    }

    // Category Fluency Test Implementation
    getCategoryFluencyTest() {
        return {
            title: 'Category Fluency Test',
            instructions: 'Generate as many animal names as possible in 60 seconds. Be specific (e.g., "African elephant" counts as one animal).',
            questions: [
                {
                    id: 'category_animals',
                    type: 'timed',
                    question: 'Name as many animals as you can think of in 60 seconds',
                    points: 10,
                    timeLimit: 60
                }
            ]
        };
    }

    // Block Design Test Implementation
    getBlockDesignTest() {
        return {
            title: 'Block Design Test',
            instructions: 'Copy the geometric pattern shown using the colored blocks provided. Work as quickly and accurately as possible.',
            questions: [
                {
                    id: 'block_1',
                    type: 'drawing',
                    question: 'Copy this geometric pattern using colored blocks',
                    points: 5,
                    timeLimit: 120
                },
                {
                    id: 'block_2',
                    type: 'drawing',
                    question: 'Copy this more complex geometric pattern',
                    points: 5,
                    timeLimit: 180
                },
                {
                    id: 'block_3',
                    type: 'drawing',
                    question: 'Copy this advanced geometric pattern',
                    points: 5,
                    timeLimit: 240
                }
            ]
        };
    }

    // Logical Memory Test Implementation
    getLogicalMemoryTest() {
        return {
            title: 'Logical Memory Test',
            instructions: 'Listen to a short story and then recall as many details as you can remember. You will be asked to recall it again later.',
            questions: [
                {
                    id: 'logical_immediate',
                    type: 'recall',
                    question: 'Immediate Recall: Recall the story you just heard',
                    points: 8,
                    timeLimit: 120
                },
                {
                    id: 'logical_delayed',
                    type: 'recall',
                    question: 'Delayed Recall: After a delay, recall the story again',
                    points: 7,
                    timeLimit: 120
                }
            ]
        };
    }

    // Submit answer for current question
    submitAnswer(answer) {
        this.userAnswers[this.currentQuestionIndex] = {
            questionId: this.currentTest.questions[this.currentQuestionIndex].id,
            answer: answer,
            timestamp: Date.now()
        };
    }

    // Move to next question
    nextQuestion() {
        if (this.currentQuestionIndex < this.currentTest.questions.length - 1) {
            this.currentQuestionIndex++;
            return true;
        }
        return false;
    }

    // Move to previous question
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            return true;
        }
        return false;
    }

    // Get current question
    getCurrentQuestion() {
        if (!this.currentTest) return null;
        return this.currentTest.questions[this.currentQuestionIndex];
    }

    // Check if test is complete
    isTestComplete() {
        return this.currentQuestionIndex >= this.currentTest.questions.length - 1;
    }

    // Calculate test score
    calculateScore() {
        if (!this.currentTest) return null;

        let totalScore = 0;
        let maxPossibleScore = 0;

        this.currentTest.questions.forEach((question, index) => {
            maxPossibleScore += question.points;
            if (this.userAnswers[index] && this.userAnswers[index].answer) {
                // Simple scoring - can be enhanced with more sophisticated algorithms
                totalScore += question.points;
            }
        });

        const percentage = Math.round((totalScore / maxPossibleScore) * 100);
        const timeSpent = Date.now() - this.startTime;

        return {
            score: totalScore,
            maxScore: maxPossibleScore,
            percentage: percentage,
            timeSpent: timeSpent,
            answers: this.userAnswers,
            testId: this.currentTest.id,
            testName: this.currentTest.title,
            timestamp: Date.now()
        };
    }

    // Get test interpretation
    getTestInterpretation(score) {
        const interpretations = {
            'mmse': {
                24: 'Normal cognitive function',
                19: 'Mild cognitive impairment',
                10: 'Moderate cognitive impairment',
                0: 'Severe cognitive impairment'
            },
            'adas-cog13': {
                0: 'Normal cognitive function',
                10: 'Mild cognitive impairment',
                20: 'Moderate cognitive impairment',
                30: 'Severe cognitive impairment'
            },
            'cdr': {
                0: 'No dementia',
                0.5: 'Questionable dementia',
                1: 'Mild dementia',
                2: 'Moderate dementia'
            }
        };

        const testInterpretation = interpretations[this.currentTest.id];
        if (!testInterpretation) return 'Results should be interpreted by healthcare professionals.';

        // Find the appropriate interpretation based on score
        const thresholds = Object.keys(testInterpretation).map(Number).sort((a, b) => b - a);
        for (let threshold of thresholds) {
            if (score >= threshold) {
                return testInterpretation[threshold];
            }
        }

        return 'Results should be interpreted by healthcare professionals.';
    }

    // Reset test
    resetTest() {
        this.currentTest = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.startTime = null;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CognitiveTestEngine;
} else {
    window.CognitiveTestEngine = CognitiveTestEngine;
} 