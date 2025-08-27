export interface CognitiveTest {
  id: string;
  name: string;
  fullName: string;
  description: string;
  category: string;
  duration: number; // in minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
  maxScore: number;
  instructions: string;
  questions: TestQuestion[];
  scoring: ScoringSystem;
  interpretation: TestInterpretation;
  references: string[];
}

export interface TestQuestion {
  id: string;
  type: 'multiple-choice' | 'text-input' | 'recall' | 'recognition' | 'drawing' | 'timed' | 'sequence';
  question: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
  timeLimit?: number; // in seconds
  image?: string;
  audio?: string;
}

export interface ScoringSystem {
  totalPoints: number;
  cutoffScores: {
    normal: number;
    mild: number;
    moderate: number;
    severe: number;
  };
  interpretation: string;
}

export interface TestInterpretation {
  normal: string;
  mild: string;
  moderate: string;
  severe: string;
  recommendations: string[];
}

export const COGNITIVE_TESTS: CognitiveTest[] = [
  {
    id: 'mmse',
    name: 'MMSE',
    fullName: 'Mini-Mental State Examination',
    description: 'A 30-point test that measures cognitive impairment across multiple domains including orientation, memory, attention, language, and visual-spatial skills.',
    category: 'Global Cognitive Assessment',
    duration: 10,
    difficulty: 'Easy',
    maxScore: 30,
    instructions: 'This test evaluates your overall cognitive function. Please answer each question to the best of your ability.',
    questions: [
      {
        id: 'mmse_1',
        type: 'text-input',
        question: 'What year is it?',
        points: 1,
        timeLimit: 30
      },
      {
        id: 'mmse_2',
        type: 'text-input',
        question: 'What season is it?',
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
        type: 'text-input',
        question: 'What day of the week is it?',
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
      }
    ],
    scoring: {
      totalPoints: 30,
      cutoffScores: {
        normal: 24,
        mild: 19,
        moderate: 10,
        severe: 0
      },
      interpretation: 'MMSE scores range from 0-30. Higher scores indicate better cognitive function.'
    },
    interpretation: {
      normal: 'Normal cognitive function (24-30 points)',
      mild: 'Mild cognitive impairment (19-23 points)',
      moderate: 'Moderate cognitive impairment (10-18 points)',
      severe: 'Severe cognitive impairment (0-9 points)',
      recommendations: [
        'Continue regular cognitive activities',
        'Monitor for any changes in cognitive function',
        'Consider annual cognitive screening'
      ]
    },
    references: [
      'Folstein, M.F., Folstein, S.E., & McHugh, P.R. (1975). Mini-mental state: A practical method for grading the cognitive state of patients for the clinician. Journal of Psychiatric Research, 12(3), 189-198.'
    ]
  },
  {
    id: 'adas-cog13',
    name: 'ADAS-Cog13',
    fullName: 'Alzheimer\'s Disease Assessment Scale - Cognitive Subscale (13-item)',
    description: 'A comprehensive 13-item cognitive assessment specifically designed for Alzheimer\'s disease, measuring memory, language, praxis, and orientation.',
    category: 'Alzheimer\'s Specific',
    duration: 20,
    difficulty: 'Medium',
    maxScore: 85,
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
        question: 'Constructive Praxis: Copy this geometric shape exactly',
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
    ],
    scoring: {
      totalPoints: 85,
      cutoffScores: {
        normal: 0,
        mild: 10,
        moderate: 20,
        severe: 30
      },
      interpretation: 'ADAS-Cog13 scores range from 0-85. Lower scores indicate better cognitive function.'
    },
    interpretation: {
      normal: 'Normal cognitive function (0-10 points)',
      mild: 'Mild cognitive impairment (11-20 points)',
      moderate: 'Moderate cognitive impairment (21-30 points)',
      severe: 'Severe cognitive impairment (31+ points)',
      recommendations: [
        'Consult with healthcare provider for comprehensive evaluation',
        'Consider neuropsychological assessment',
        'Monitor cognitive changes over time',
        'Implement cognitive training exercises'
      ]
    },
    references: [
      'Rosen, W.G., Mohs, R.C., & Davis, K.L. (1984). A new rating scale for Alzheimer\'s disease. American Journal of Psychiatry, 141(11), 1356-1364.'
    ]
  },
  {
    id: 'cdr',
    name: 'CDR',
    fullName: 'Clinical Dementia Rating Scale',
    description: 'A global rating scale that characterizes six domains of cognitive and functional performance applicable to Alzheimer\'s disease and related dementias.',
    category: 'Dementia Staging',
    duration: 15,
    difficulty: 'Medium',
    maxScore: 3,
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
    ],
    scoring: {
      totalPoints: 3,
      cutoffScores: {
        normal: 0,
        mild: 0.5,
        moderate: 1,
        severe: 2
      },
      interpretation: 'CDR scores range from 0-3. Higher scores indicate more severe dementia.'
    },
    interpretation: {
      normal: 'No dementia (CDR = 0)',
      mild: 'Questionable dementia (CDR = 0.5)',
      moderate: 'Mild dementia (CDR = 1)',
      severe: 'Moderate dementia (CDR = 2)',
      recommendations: [
        'CDR 0: Continue regular cognitive activities',
        'CDR 0.5: Monitor closely, consider neuropsychological evaluation',
        'CDR 1+: Consult with neurologist or geriatrician',
        'Implement appropriate interventions and support services'
      ]
    },
    references: [
      'Morris, J.C. (1993). The Clinical Dementia Rating (CDR): Current version and scoring rules. Neurology, 43(11), 2412-2414.'
    ]
  },
  {
    id: 'clock-drawing',
    name: 'Clock Drawing',
    fullName: 'Clock Drawing Test',
    description: 'A visuospatial and executive function test that requires drawing a clock face with numbers and hands set to a specific time.',
    category: 'Visuospatial & Executive',
    duration: 5,
    difficulty: 'Medium',
    maxScore: 10,
    instructions: 'Draw a clock face with all numbers and set the hands to show 10 minutes past 11 o\'clock.',
    questions: [
      {
        id: 'clock_1',
        type: 'drawing',
        question: 'Draw a clock face with numbers 1-12 and set hands to 11:10',
        points: 10,
        timeLimit: 300
      }
    ],
    scoring: {
      totalPoints: 10,
      cutoffScores: {
        normal: 8,
        mild: 6,
        moderate: 4,
        severe: 0
      },
      interpretation: 'Clock drawing is scored on a 10-point scale. Higher scores indicate better visuospatial and executive function.'
    },
    interpretation: {
      normal: 'Normal visuospatial function (8-10 points)',
      mild: 'Mild impairment (6-7 points)',
      moderate: 'Moderate impairment (4-5 points)',
      severe: 'Severe impairment (0-3 points)',
      recommendations: [
        'Practice visuospatial tasks',
        'Consider occupational therapy evaluation',
        'Monitor for changes in spatial awareness'
      ]
    },
    references: [
      'Shulman, K.I. (2000). Clock-drawing: Is it the ideal cognitive screening test? International Journal of Geriatric Psychiatry, 15(6), 548-561.'
    ]
  },
  {
    id: 'trail-making',
    name: 'Trail Making',
    fullName: 'Trail Making Test (Parts A & B)',
    description: 'A test of visual attention and task switching that measures processing speed, mental flexibility, and executive function.',
    category: 'Attention & Executive',
    duration: 8,
    difficulty: 'Medium',
    maxScore: 20,
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
    ],
    scoring: {
      totalPoints: 20,
      cutoffScores: {
        normal: 15,
        mild: 12,
        moderate: 8,
        severe: 0
      },
      interpretation: 'Trail Making Test measures processing speed and executive function. Lower completion times indicate better performance.'
    },
    interpretation: {
      normal: 'Normal attention and executive function (15-20 points)',
      mild: 'Mild impairment (12-14 points)',
      moderate: 'Moderate impairment (8-11 points)',
      severe: 'Severe impairment (0-7 points)',
      recommendations: [
        'Practice attention and concentration exercises',
        'Consider cognitive training programs',
        'Monitor for attention difficulties'
      ]
    },
    references: [
      'Reitan, R.M. (1958). Validity of the Trail Making Test as an indicator of organic brain damage. Perceptual and Motor Skills, 8(3), 271-276.'
    ]
  },
  {
    id: 'verbal-fluency',
    name: 'Verbal Fluency',
    fullName: 'Verbal Fluency Test (FAS)',
    description: 'A test of verbal ability and executive function that requires generating words beginning with specific letters within a time limit.',
    category: 'Language & Executive',
    duration: 6,
    difficulty: 'Medium',
    maxScore: 15,
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
    ],
    scoring: {
      totalPoints: 15,
      cutoffScores: {
        normal: 12,
        mild: 9,
        moderate: 6,
        severe: 0
      },
      interpretation: 'Verbal fluency measures language ability and executive function. Higher word counts indicate better performance.'
    },
    interpretation: {
      normal: 'Normal verbal fluency (12-15 points)',
      mild: 'Mild impairment (9-11 points)',
      moderate: 'Moderate impairment (6-8 points)',
      severe: 'Severe impairment (0-5 points)',
      recommendations: [
        'Practice word games and puzzles',
        'Read regularly to maintain vocabulary',
        'Consider speech therapy if language difficulties persist'
      ]
    },
    references: [
      'Benton, A.L., & Hamsher, K. (1976). Multilingual Aphasia Examination. Iowa City: University of Iowa.'
    ]
  },
  {
    id: 'digit-span',
    name: 'Digit Span',
    fullName: 'Digit Span Test (Forward & Backward)',
    description: 'A test of immediate memory and working memory that measures the ability to remember and manipulate sequences of numbers.',
    category: 'Memory & Attention',
    duration: 7,
    difficulty: 'Medium',
    maxScore: 16,
    instructions: 'Listen to sequences of numbers and repeat them. Forward: Repeat in same order. Backward: Repeat in reverse order.',
    questions: [
      {
        id: 'digit_forward',
        type: 'sequence',
        question: 'Forward: Repeat these numbers in the same order',
        points: 8,
        timeLimit: 120
      },
      {
        id: 'digit_backward',
        type: 'sequence',
        question: 'Backward: Repeat these numbers in reverse order',
        points: 8,
        timeLimit: 120
      }
    ],
    scoring: {
      totalPoints: 16,
      cutoffScores: {
        normal: 12,
        mild: 9,
        moderate: 6,
        severe: 0
      },
      interpretation: 'Digit span measures immediate memory and working memory. Higher scores indicate better memory capacity.'
    },
    interpretation: {
      normal: 'Normal memory function (12-16 points)',
      mild: 'Mild memory impairment (9-11 points)',
      moderate: 'Moderate memory impairment (6-8 points)',
      severe: 'Severe memory impairment (0-5 points)',
      recommendations: [
        'Practice memory exercises and games',
        'Use memory strategies and mnemonics',
        'Consider memory training programs'
      ]
    },
    references: [
      'Wechsler, D. (2008). Wechsler Adult Intelligence Scale-Fourth Edition (WAIS-IV). San Antonio, TX: Pearson.'
    ]
  },
  {
    id: 'boston-naming',
    name: 'Boston Naming',
    fullName: 'Boston Naming Test (Short Form)',
    description: 'A test of confrontational naming ability that measures language function and semantic memory.',
    category: 'Language & Memory',
    duration: 8,
    difficulty: 'Medium',
    maxScore: 15,
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
        type: 'recognition',
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
    ],
    scoring: {
      totalPoints: 15,
      cutoffScores: {
        normal: 12,
        mild: 9,
        moderate: 6,
        severe: 0
      },
      interpretation: 'Boston Naming Test measures language function and semantic memory. Higher scores indicate better naming ability.'
    },
    interpretation: {
      normal: 'Normal naming ability (12-15 points)',
      mild: 'Mild naming impairment (9-11 points)',
      moderate: 'Moderate naming impairment (6-8 points)',
      severe: 'Severe naming impairment (0-5 points)',
      recommendations: [
        'Practice naming everyday objects',
        'Read and discuss various topics',
        'Consider speech therapy evaluation'
      ]
    },
    references: [
      'Kaplan, E., Goodglass, H., & Weintraub, S. (1983). The Boston Naming Test (2nd ed.). Philadelphia: Lea & Febiger.'
    ]
  },
  {
    id: 'rey-auditory',
    name: 'Rey Auditory',
    fullName: 'Rey Auditory Verbal Learning Test (RAVLT)',
    description: 'A test of verbal learning and memory that measures immediate recall, delayed recall, and recognition memory.',
    category: 'Memory & Learning',
    duration: 12,
    difficulty: 'Hard',
    maxScore: 20,
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
    ],
    scoring: {
      totalPoints: 20,
      cutoffScores: {
        normal: 15,
        mild: 12,
        moderate: 8,
        severe: 0
      },
      interpretation: 'RAVLT measures verbal learning and memory. Higher scores indicate better memory performance.'
    },
    interpretation: {
      normal: 'Normal memory function (15-20 points)',
      mild: 'Mild memory impairment (12-14 points)',
      moderate: 'Moderate memory impairment (8-11 points)',
      severe: 'Severe memory impairment (0-7 points)',
      recommendations: [
        'Practice memory exercises and techniques',
        'Use spaced repetition for learning',
        'Consider memory training programs'
      ]
    },
    references: [
      'Rey, A. (1964). L\'examen clinique en psychologie. Paris: Presses Universitaires de France.'
    ]
  },
  {
    id: 'stroop-test',
    name: 'Stroop Test',
    fullName: 'Stroop Color and Word Test',
    description: 'A test of cognitive interference and executive function that measures the ability to inhibit automatic responses.',
    category: 'Executive Function',
    duration: 8,
    difficulty: 'Hard',
    maxScore: 15,
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
    ],
    scoring: {
      totalPoints: 15,
      cutoffScores: {
        normal: 12,
        mild: 9,
        moderate: 6,
        severe: 0
      },
      interpretation: 'Stroop Test measures executive function and cognitive control. Lower interference scores indicate better performance.'
    },
    interpretation: {
      normal: 'Normal executive function (12-15 points)',
      mild: 'Mild impairment (9-11 points)',
      moderate: 'Moderate impairment (6-8 points)',
      severe: 'Severe impairment (0-5 points)',
      recommendations: [
        'Practice attention and concentration exercises',
        'Use mindfulness and meditation techniques',
        'Consider cognitive training programs'
      ]
    },
    references: [
      'Stroop, J.R. (1935). Studies of interference in serial verbal reactions. Journal of Experimental Psychology, 18(6), 643-662.'
    ]
  },
  {
    id: 'category-fluency',
    name: 'Category Fluency',
    fullName: 'Category Fluency Test (Animals)',
    description: 'A test of semantic memory and verbal fluency that requires generating words from a specific category within a time limit.',
    category: 'Language & Memory',
    duration: 5,
    difficulty: 'Easy',
    maxScore: 10,
    instructions: 'Generate as many animal names as possible in 60 seconds. Be specific (e.g., "African elephant" counts as one animal).',
    questions: [
      {
        id: 'category_animals',
        type: 'timed',
        question: 'Name as many animals as you can think of in 60 seconds',
        points: 10,
        timeLimit: 60
      }
    ],
    scoring: {
      totalPoints: 10,
      cutoffScores: {
        normal: 8,
        mild: 6,
        moderate: 4,
        severe: 0
      },
      interpretation: 'Category fluency measures semantic memory and verbal ability. Higher word counts indicate better performance.'
    },
    interpretation: {
      normal: 'Normal semantic memory (8-10 points)',
      mild: 'Mild impairment (6-7 points)',
      moderate: 'Moderate impairment (4-5 points)',
      severe: 'Severe impairment (0-3 points)',
      recommendations: [
        'Practice category-based word games',
        'Read about various topics and categories',
        'Engage in discussions about different subjects'
      ]
    },
    references: [
      'Benton, A.L., & Hamsher, K. (1976). Multilingual Aphasia Examination. Iowa City: University of Iowa.'
    ]
  },
  {
    id: 'block-design',
    name: 'Block Design',
    fullName: 'Block Design Test',
    description: 'A test of visuospatial ability and constructional praxis that requires copying geometric patterns using colored blocks.',
    category: 'Visuospatial & Construction',
    duration: 10,
    difficulty: 'Medium',
    maxScore: 15,
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
    ],
    scoring: {
      totalPoints: 15,
      cutoffScores: {
        normal: 12,
        mild: 9,
        moderate: 6,
        severe: 0
      },
      interpretation: 'Block Design measures visuospatial ability and constructional praxis. Higher scores indicate better spatial skills.'
    },
    interpretation: {
      normal: 'Normal visuospatial function (12-15 points)',
      mild: 'Mild impairment (9-11 points)',
      moderate: 'Moderate impairment (6-8 points)',
      severe: 'Severe impairment (0-5 points)',
      recommendations: [
        'Practice puzzles and spatial games',
        'Use drawing and construction activities',
        'Consider occupational therapy evaluation'
      ]
    },
    references: [
      'Wechsler, D. (2008). Wechsler Adult Intelligence Scale-Fourth Edition (WAIS-IV). San Antonio, TX: Pearson.'
    ]
  },
  {
    id: 'logical-memory',
    name: 'Logical Memory',
    fullName: 'Logical Memory Test (WMS-IV)',
    description: 'A test of immediate and delayed story recall that measures verbal memory and comprehension.',
    category: 'Memory & Comprehension',
    duration: 8,
    difficulty: 'Medium',
    maxScore: 15,
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
    ],
    scoring: {
      totalPoints: 15,
      cutoffScores: {
        normal: 12,
        mild: 9,
        moderate: 6,
        severe: 0
      },
      interpretation: 'Logical Memory measures verbal memory and comprehension. Higher scores indicate better memory performance.'
    },
    interpretation: {
      normal: 'Normal memory function (12-15 points)',
      mild: 'Mild memory impairment (9-11 points)',
      moderate: 'Moderate memory impairment (6-8 points)',
      severe: 'Severe memory impairment (0-5 points)',
      recommendations: [
        'Practice active listening and note-taking',
        'Use memory techniques like visualization',
        'Engage in storytelling and discussion activities'
      ]
    },
    references: [
      'Wechsler, D. (2009). Wechsler Memory Scale-Fourth Edition (WMS-IV). San Antonio, TX: Pearson.'
    ]
  }
];

export const getTestById = (id: string): CognitiveTest | undefined => {
  return COGNITIVE_TESTS.find(test => test.id === id);
};

export const getTestsByCategory = (category: string): CognitiveTest[] => {
  return COGNITIVE_TESTS.filter(test => test.category === category);
};

export const getTestCategories = (): string[] => {
  return [...new Set(COGNITIVE_TESTS.map(test => test.category))];
}; 