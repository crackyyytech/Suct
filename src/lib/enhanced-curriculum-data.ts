// Enhanced Curriculum Data with Comprehensive Samacheer Kalvi Content
// This file contains detailed curriculum information for Classes 1-12

export interface EnhancedChapter {
  chapter_id: string;
  chapter_order: number;
  chapter_title: string;
  summary: string;
  key_topics: string[];
  learning_outcomes: string[];
  video_topics: string[];
  important_concepts: string[];
  practical_activities: string[];
  assessment_topics: string[];
  difficulty_level: 'Easy' | 'Moderate' | 'Hard';
  estimated_hours: number;
}

export interface EnhancedSubject {
  course_id: string;
  subject_name: string;
  overview: string;
  chapters: EnhancedChapter[];
  learning_options: {
    lessons: boolean;
    practice: boolean;
    activities: boolean;
    assessments: boolean;
  };
  difficulty_level: 'Beginner' | 'Easy' | 'Moderate' | 'Advanced';
  recommended_age: string;
  activities: string[];
  fun_elements: string[];
  textbook_reference: string;
  supplementary_resources: string[];
  career_connections: string[];
}

export interface EnhancedCourseCollection {
  class: string;
  medium: string;
  board: string;
  syllabus_source: string;
  stream?: 'Science' | 'Commerce' | 'Arts' | 'General';
  subjects: EnhancedSubject[];
  exam_pattern: {
    internal_assessment: number;
    external_exam: number;
    practical: number;
  };
  key_skills: string[];
  career_guidance: string[];
}

// Enhanced Curriculum Data for Classes 1-12
export const enhancedCurriculumData: EnhancedCourseCollection[] = [
  // ==================== CLASS 1 ====================
  {
    class: 'Class 1',
    medium: 'Tamil',
    board: 'Tamil Nadu State Board',
    syllabus_source: 'Samacheer Kalvi 2024-25',
    subjects: [
      {
        course_id: 'c1-ta-tam',
        subject_name: 'தமிழ்',
        overview: 'அழகான தமிழ் மொழியின் அடிப்படைகளை கற்றுக்கொள்ளுங்கள். எழுத்துக்கள், சொற்கள், பாடல்கள் மற்றும் கதைகள் மூலம் தமிழை எளிதாகவும் வேடிக்கையாகவும் கற்றுக்கொள்ளலாம்.',
        chapters: [
          {
            chapter_id: 'c1-ta-tam-ch1',
            chapter_order: 1,
            chapter_title: 'பாடி ஆடி விளையாடலாம்',
            summary: 'விளையாட்டுகள், பாடல்கள் மற்றும் படங்கள் மூலம் உயிர் எழுத்துக்களை வேடிக்கையாகக் கற்றுக்கொள்வோம்.',
            key_topics: ['உயிர் எழுத்துக்கள் (அ-ஔ)', 'எழுத்து அடையாளம்', 'ஒலி வேறுபாடு', 'படமும் சொல்லும்'],
            learning_outcomes: [
              'உயிர் எழுத்துக்களை சரியாக உச்சரிப்பர்',
              'எழுத்துக்களை அடையாளம் காண்பர்',
              'எளிய சொற்களை படிப்பர்',
              'பாடல்களை மனப்பாடம் செய்வர்'
            ],
            video_topics: [
              'உயிர் எழுத்துக்கள் பாடல்',
              'எழுத்து எழுதும் முறை',
              'ஒலி பயிற்சி',
              'விளையாட்டு பாடல்கள்'
            ],
            important_concepts: ['எழுத்து வடிவம்', 'ஒலி', 'சொல் உருவாக்கம்'],
            practical_activities: ['களிமண்ணில் எழுத்து செய்தல்', 'பாடல் பாடுதல்', 'எழுத்து விளையாட்டு'],
            assessment_topics: ['எழுத்து அடையாளம்', 'ஒலி பொருத்தம்', 'எளிய வாசிப்பு'],
            difficulty_level: 'Easy',
            estimated_hours: 15
          },
          {
            chapter_id: 'c1-ta-tam-ch2',
            chapter_order: 2,
            chapter_title: 'மொழியோடு விளையாடு',
            summary: 'மெய் எழுத்துக்கள் மற்றும் உயிர்மெய் எழுத்துக்களை கற்றுக்கொண்டு சொற்களை உருவாக்குவோம்.',
            key_topics: ['மெய் எழுத்துக்கள்', 'உயிர்மெய் எழுத்துக்கள்', 'சொல் உருவாக்கம்', 'வாசிப்பு'],
            learning_outcomes: [
              'மெய் எழுத்துக்களை அறிவர்',
              'உயிர்மெய் எழுத்துக்களை உருவாக்குவர்',
              'எளிய சொற்களை வாசிப்பர்',
              'சொற்களின் பொருளை புரிந்துகொள்வர்'
            ],
            video_topics: [
              'மெய் எழுத்துக்கள் பாடல்',
              'உயிர்மெய் இணைப்பு',
              'சொல் வாசிப்பு',
              'பொருள் விளக்கம்'
            ],
            important_concepts: ['எழுத்து இணைப்பு', 'சொல் அமைப்பு', 'பொருள் புரிதல்'],
            practical_activities: ['எழுத்து அட்டை விளையாட்டு', 'சொல் உருவாக்கம்', 'படம் பார்த்து சொல்லுதல்'],
            assessment_topics: ['எழுத்து இணைப்பு', 'சொல் வாசிப்பு', 'பொருள் அறிதல்'],
            difficulty_level: 'Easy',
            estimated_hours: 18
          }
        ],
        learning_options: { lessons: true, practice: true, activities: true, assessments: true },
        difficulty_level: 'Beginner',
        recommended_age: '5-6 years',
        activities: ['எழுத்து விளையாட்டு', 'பாடல் பாடுதல்', 'கதை கேட்கலாம்'],
        fun_elements: ['பொம்மலாட்டம்', 'விரல் விளையாட்டு', 'ஒலி விளையாட்டு'],
        textbook_reference: 'Samacheer Kalvi Class 1 Tamil Textbook',
        supplementary_resources: ['Tamil Rhymes Collection', 'Picture Books', 'Audio Stories'],
        career_connections: ['Language Skills', 'Communication', 'Cultural Understanding']
      },
      {
        course_id: 'c1-ta-math',
        subject_name: 'கணக்கு',
        overview: 'எண்கள், வடிவங்கள் மற்றும் அளவீடுகளின் அடிப்படைகளை விளையாட்டு மூலம் கற்றுக்கொள்ளுங்கள்.',
        chapters: [
          {
            chapter_id: 'c1-ta-math-ch1',
            chapter_order: 1,
            chapter_title: 'எண்கள்',
            summary: '1 முதல் 20 வரையிலான எண்களை கற்றுக்கொண்டு எண்ணும் திறனை வளர்த்துக்கொள்வோம்.',
            key_topics: ['1-20 எண்கள்', 'எண்ணுதல்', 'எண் எழுதுதல்', 'ஒப்பிடுதல்'],
            learning_outcomes: [
              '20 வரை எண்களை எண்ணுவர்',
              'எண்களை எழுதுவர்',
              'எண்களை ஒப்பிடுவர்',
              'எண் வரிசையை அறிவர்'
            ],
            video_topics: [
              'எண்கள் பாடல்',
              'எண்ணும் விளையாட்டு',
              'எண் எழுதும் முறை',
              'பொருட்களை எண்ணுதல்'
            ],
            important_concepts: ['எண் கருத்து', 'வரிசை', 'ஒப்பீடு'],
            practical_activities: ['மணிகள் எண்ணுதல்', 'எண் அட்டை விளையாட்டு', 'பொருட்கள் வரிசைப்படுத்துதல்'],
            assessment_topics: ['எண் அடையாளம்', 'எண்ணுதல்', 'எண் எழுதுதல்'],
            difficulty_level: 'Easy',
            estimated_hours: 20
          },
          {
            chapter_id: 'c1-ta-math-ch2',
            chapter_order: 2,
            chapter_title: 'வடிவங்கள்',
            summary: 'அடிப்படை வடிவங்களை அறிந்து அவற்றின் பண்புகளை கற்றுக்கொள்வோம்.',
            key_topics: ['வட்டம்', 'சதுரம்', 'முக்கோணம்', 'செவ்வகம்'],
            learning_outcomes: [
              'அடிப்படை வடிவங்களை அடையாளம் காண்பர்',
              'வடிவங்களின் பெயர்களை கூறுவர்',
              'சுற்றுப்புறத்தில் வடிவங்களை கண்டறிவர்'
            ],
            video_topics: [
              'வடிவங்கள் பாடல்',
              'வடிவ அடையாளம்',
              'வடிவங்களை வரைதல்',
              'வடிவ விளையாட்டு'
            ],
            important_concepts: ['வடிவ அடையாளம்', 'பண்புகள்', 'வகைப்பாடு'],
            practical_activities: ['வடிவ வரைதல்', 'வடிவ தேடல்', 'வடிவ உருவாக்கம்'],
            assessment_topics: ['வடிவ அடையாளம்', 'வடிவ பெயர்கள்', 'வடிவ வரைதல்'],
            difficulty_level: 'Easy',
            estimated_hours: 15
          }
        ],
        learning_options: { lessons: true, practice: true, activities: true, assessments: true },
        difficulty_level: 'Beginner',
        recommended_age: '5-6 years',
        activities: ['எண் விளையாட்டு', 'வடிவ தேடல்', 'கணித விளையாட்டுகள்'],
        fun_elements: ['எண் பாடல்கள்', 'வடிவ விளையாட்டு', 'கணித கதைகள்'],
        textbook_reference: 'Samacheer Kalvi Class 1 Mathematics Textbook',
        supplementary_resources: ['Number Charts', 'Shape Cards', 'Counting Games'],
        career_connections: ['Logical Thinking', 'Problem Solving', 'Pattern Recognition']
      }
    ],
    exam_pattern: {
      internal_assessment: 40,
      external_exam: 60,
      practical: 0
    },
    key_skills: ['Basic Literacy', 'Numeracy', 'Communication', 'Observation'],
    career_guidance: ['Foundation for all subjects', 'Language development', 'Mathematical thinking']
  },

  // ==================== CLASS 6 ====================
  {
    class: 'Class 6',
    medium: 'English',
    board: 'Tamil Nadu State Board',
    syllabus_source: 'Samacheer Kalvi 2024-25',
    subjects: [
      {
        course_id: 'c6-en-math',
        subject_name: 'Mathematics',
        overview: 'Build strong mathematical foundations with numbers, algebra, geometry, and data handling concepts.',
        chapters: [
          {
            chapter_id: 'c6-en-math-ch1',
            chapter_order: 1,
            chapter_title: 'Numbers',
            summary: 'Explore the world of numbers including natural numbers, whole numbers, integers, and their properties.',
            key_topics: [
              'Natural Numbers and Whole Numbers',
              'Integers and Number Line',
              'Addition and Subtraction of Integers',
              'Properties of Numbers',
              'Prime and Composite Numbers',
              'HCF and LCM',
              'Fractions and Decimals'
            ],
            learning_outcomes: [
              'Understand different types of numbers',
              'Perform operations on integers',
              'Find HCF and LCM of numbers',
              'Work with fractions and decimals',
              'Apply number properties in problem solving'
            ],
            video_topics: [
              'Introduction to Integers',
              'Number Line Operations',
              'Prime Factorization',
              'Fraction Operations',
              'Decimal Conversions'
            ],
            important_concepts: [
              'Integer Operations',
              'Prime Factorization',
              'Equivalent Fractions',
              'Decimal Place Value'
            ],
            practical_activities: [
              'Number Line Games',
              'Prime Number Sieve',
              'Fraction Pizza Activity',
              'Decimal Shopping Game'
            ],
            assessment_topics: [
              'Integer Operations',
              'HCF and LCM Problems',
              'Fraction Simplification',
              'Decimal Comparisons'
            ],
            difficulty_level: 'Moderate',
            estimated_hours: 35
          },
          {
            chapter_id: 'c6-en-math-ch2',
            chapter_order: 2,
            chapter_title: 'Algebra',
            summary: 'Introduction to algebraic thinking with variables, expressions, and simple equations.',
            key_topics: [
              'Variables and Constants',
              'Algebraic Expressions',
              'Like and Unlike Terms',
              'Addition and Subtraction of Algebraic Expressions',
              'Simple Linear Equations',
              'Applications of Linear Equations'
            ],
            learning_outcomes: [
              'Understand the concept of variables',
              'Form and simplify algebraic expressions',
              'Solve simple linear equations',
              'Apply algebra to real-life problems'
            ],
            video_topics: [
              'Introduction to Variables',
              'Forming Expressions',
              'Solving Simple Equations',
              'Word Problems in Algebra'
            ],
            important_concepts: [
              'Variable Representation',
              'Expression Simplification',
              'Equation Solving',
              'Problem Translation'
            ],
            practical_activities: [
              'Variable Hunt Game',
              'Expression Building',
              'Equation Balance Activity',
              'Real-life Problem Solving'
            ],
            assessment_topics: [
              'Expression Formation',
              'Term Identification',
              'Equation Solving',
              'Word Problem Applications'
            ],
            difficulty_level: 'Moderate',
            estimated_hours: 30
          }
        ],
        learning_options: { lessons: true, practice: true, activities: true, assessments: true },
        difficulty_level: 'Moderate',
        recommended_age: '10-11 years',
        activities: ['Mathematical Investigations', 'Problem Solving Challenges', 'Group Projects'],
        fun_elements: ['Math Games', 'Puzzles', 'Real-world Applications'],
        textbook_reference: 'Samacheer Kalvi Class 6 Mathematics Textbook',
        supplementary_resources: ['Math Workbooks', 'Online Practice', 'Educational Apps'],
        career_connections: ['Engineering', 'Computer Science', 'Finance', 'Research']
      },
      {
        course_id: 'c6-en-sci',
        subject_name: 'Science',
        overview: 'Discover the wonders of science through physics, chemistry, and biology concepts.',
        chapters: [
          {
            chapter_id: 'c6-en-sci-ch1',
            chapter_order: 1,
            chapter_title: 'Food: Where Does it Come From?',
            summary: 'Learn about different food sources, food components, and the importance of balanced diet.',
            key_topics: [
              'Plant and Animal Food Sources',
              'Food Components - Carbohydrates, Proteins, Fats',
              'Vitamins and Minerals',
              'Balanced Diet',
              'Food Preservation Methods',
              'Deficiency Diseases'
            ],
            learning_outcomes: [
              'Identify sources of different foods',
              'Understand food components and their functions',
              'Plan a balanced diet',
              'Know about food preservation',
              'Recognize deficiency diseases'
            ],
            video_topics: [
              'Food Sources Around Us',
              'Nutrients and Their Functions',
              'Planning Balanced Meals',
              'Food Preservation Techniques'
            ],
            important_concepts: [
              'Food Classification',
              'Nutritional Requirements',
              'Food Safety',
              'Health and Nutrition'
            ],
            practical_activities: [
              'Food Source Identification',
              'Nutrient Testing',
              'Diet Planning Activity',
              'Food Preservation Experiment'
            ],
            assessment_topics: [
              'Food Source Classification',
              'Nutrient Functions',
              'Balanced Diet Planning',
              'Deficiency Disease Identification'
            ],
            difficulty_level: 'Easy',
            estimated_hours: 25
          }
        ],
        learning_options: { lessons: true, practice: true, activities: true, assessments: true },
        difficulty_level: 'Moderate',
        recommended_age: '10-11 years',
        activities: ['Science Experiments', 'Nature Observation', 'Project Work'],
        fun_elements: ['Hands-on Experiments', 'Science Fair Projects', 'Field Trips'],
        textbook_reference: 'Samacheer Kalvi Class 6 Science Textbook',
        supplementary_resources: ['Lab Manual', 'Science Videos', 'Reference Books'],
        career_connections: ['Medicine', 'Biotechnology', 'Environmental Science', 'Research']
      }
    ],
    exam_pattern: {
      internal_assessment: 20,
      external_exam: 80,
      practical: 0
    },
    key_skills: ['Critical Thinking', 'Problem Solving', 'Scientific Method', 'Data Analysis'],
    career_guidance: ['STEM Fields', 'Research Opportunities', 'Higher Education Pathways']
  },

  // ==================== CLASS 10 ====================
  {
    class: 'Class 10',
    medium: 'English',
    board: 'Tamil Nadu State Board',
    syllabus_source: 'Samacheer Kalvi 2024-25 (SSLC)',
    subjects: [
      {
        course_id: 'c10-en-math',
        subject_name: 'Mathematics',
        overview: 'Master advanced mathematical concepts essential for higher studies and competitive exams.',
        chapters: [
          {
            chapter_id: 'c10-en-math-ch1',
            chapter_order: 1,
            chapter_title: 'Real Numbers',
            summary: 'Explore the complete number system including rational and irrational numbers.',
            key_topics: [
              'Rational and Irrational Numbers',
              'Real Numbers and their Properties',
              'Fundamental Theorem of Arithmetic',
              'Euclid\'s Division Algorithm',
              'HCF and LCM Applications',
              'Decimal Expansions'
            ],
            learning_outcomes: [
              'Classify numbers as rational or irrational',
              'Apply Euclid\'s division algorithm',
              'Find HCF and LCM using prime factorization',
              'Understand decimal expansions of rational numbers'
            ],
            video_topics: [
              'Number System Classification',
              'Euclid\'s Algorithm',
              'Prime Factorization Method',
              'Decimal Expansion Patterns'
            ],
            important_concepts: [
              'Number Classification',
              'Algorithm Application',
              'Prime Factorization',
              'Decimal Properties'
            ],
            practical_activities: [
              'Number Classification Exercise',
              'Algorithm Implementation',
              'Real-life HCF/LCM Problems',
              'Decimal Pattern Investigation'
            ],
            assessment_topics: [
              'Number System Problems',
              'Algorithm Applications',
              'HCF/LCM Calculations',
              'Decimal Expansion Analysis'
            ],
            difficulty_level: 'Moderate',
            estimated_hours: 30
          },
          {
            chapter_id: 'c10-en-math-ch2',
            chapter_order: 2,
            chapter_title: 'Polynomials',
            summary: 'Study polynomial expressions, their operations, and relationship between zeros and coefficients.',
            key_topics: [
              'Polynomial Definitions and Types',
              'Zeros of Polynomials',
              'Relationship between Zeros and Coefficients',
              'Division Algorithm for Polynomials',
              'Factorization of Polynomials'
            ],
            learning_outcomes: [
              'Identify and classify polynomials',
              'Find zeros of polynomials',
              'Apply the relationship between zeros and coefficients',
              'Factorize polynomials using various methods'
            ],
            video_topics: [
              'Polynomial Classification',
              'Finding Zeros',
              'Coefficient Relationships',
              'Factorization Techniques'
            ],
            important_concepts: [
              'Polynomial Structure',
              'Zero-Coefficient Relationship',
              'Division Algorithm',
              'Factorization Methods'
            ],
            practical_activities: [
              'Polynomial Graphing',
              'Zero Finding Exercise',
              'Coefficient Analysis',
              'Factorization Practice'
            ],
            assessment_topics: [
              'Polynomial Operations',
              'Zero Calculations',
              'Coefficient Problems',
              'Factorization Exercises'
            ],
            difficulty_level: 'Moderate',
            estimated_hours: 25
          }
        ],
        learning_options: { lessons: true, practice: true, activities: true, assessments: true },
        difficulty_level: 'Advanced',
        recommended_age: '14-15 years',
        activities: ['Problem Solving Sessions', 'Mathematical Modeling', 'Competitive Exam Preparation'],
        fun_elements: ['Mathematical Puzzles', 'Real-world Applications', 'Technology Integration'],
        textbook_reference: 'Samacheer Kalvi Class 10 Mathematics Textbook',
        supplementary_resources: ['Previous Year Papers', 'Reference Books', 'Online Resources'],
        career_connections: ['Engineering', 'Computer Science', 'Economics', 'Research', 'Banking']
      }
    ],
    exam_pattern: {
      internal_assessment: 20,
      external_exam: 80,
      practical: 0
    },
    key_skills: ['Advanced Problem Solving', 'Logical Reasoning', 'Mathematical Modeling', 'Analytical Thinking'],
    career_guidance: ['Higher Secondary Stream Selection', 'Competitive Exam Preparation', 'Career Counseling']
  },

  // ==================== CLASS 11 ====================
  {
    class: 'Class 11',
    medium: 'English',
    board: 'Tamil Nadu State Board',
    syllabus_source: 'Samacheer Kalvi 2024-25 (HSC)',
    stream: 'Science',
    subjects: [
      {
        course_id: 'c11-en-phy',
        subject_name: 'Physics',
        overview: 'Explore the fundamental principles of physics including mechanics, thermodynamics, and waves.',
        chapters: [
          {
            chapter_id: 'c11-en-phy-ch1',
            chapter_order: 1,
            chapter_title: 'Units and Measurements',
            summary: 'Understand the importance of measurements in physics and learn about different unit systems.',
            key_topics: [
              'Physical Quantities and Units',
              'SI Base Units and Derived Units',
              'Dimensional Analysis',
              'Significant Figures',
              'Errors in Measurement',
              'Precision and Accuracy'
            ],
            learning_outcomes: [
              'Understand the concept of physical quantities',
              'Apply dimensional analysis',
              'Handle significant figures correctly',
              'Analyze measurement errors'
            ],
            video_topics: [
              'Introduction to Measurements',
              'SI Unit System',
              'Dimensional Analysis Techniques',
              'Error Analysis Methods'
            ],
            important_concepts: [
              'Unit Conversions',
              'Dimensional Consistency',
              'Measurement Uncertainty',
              'Scientific Notation'
            ],
            practical_activities: [
              'Measurement Experiments',
              'Error Calculation Exercise',
              'Dimensional Analysis Practice',
              'Precision Testing'
            ],
            assessment_topics: [
              'Unit Conversions',
              'Dimensional Analysis',
              'Significant Figure Rules',
              'Error Calculations'
            ],
            difficulty_level: 'Moderate',
            estimated_hours: 20
          },
          {
            chapter_id: 'c11-en-phy-ch2',
            chapter_order: 2,
            chapter_title: 'Motion in a Straight Line',
            summary: 'Study kinematics of motion in one dimension including displacement, velocity, and acceleration.',
            key_topics: [
              'Position, Displacement and Distance',
              'Velocity and Speed',
              'Acceleration',
              'Kinematic Equations',
              'Uniformly Accelerated Motion',
              'Free Fall Motion'
            ],
            learning_outcomes: [
              'Distinguish between distance and displacement',
              'Apply kinematic equations',
              'Analyze uniformly accelerated motion',
              'Solve free fall problems'
            ],
            video_topics: [
              'Kinematic Concepts',
              'Equation Derivations',
              'Motion Graphs',
              'Free Fall Analysis'
            ],
            important_concepts: [
              'Vector Nature of Displacement',
              'Instantaneous vs Average Quantities',
              'Graphical Analysis',
              'Equation Applications'
            ],
            practical_activities: [
              'Motion Tracking Experiments',
              'Graph Analysis',
              'Free Fall Measurements',
              'Kinematic Problem Solving'
            ],
            assessment_topics: [
              'Kinematic Calculations',
              'Graph Interpretations',
              'Equation Applications',
              'Problem Solving'
            ],
            difficulty_level: 'Moderate',
            estimated_hours: 25
          }
        ],
        learning_options: { lessons: true, practice: true, activities: true, assessments: true },
        difficulty_level: 'Advanced',
        recommended_age: '15-16 years',
        activities: ['Laboratory Experiments', 'Physics Projects', 'Problem Solving Sessions'],
        fun_elements: ['Physics Demonstrations', 'Real-world Applications', 'Technology Integration'],
        textbook_reference: 'Samacheer Kalvi Class 11 Physics Textbook',
        supplementary_resources: ['Lab Manual', 'Reference Books', 'Online Simulations'],
        career_connections: ['Engineering', 'Research', 'Technology', 'Aerospace', 'Medical Physics']
      },
      {
        course_id: 'c11-en-chem',
        subject_name: 'Chemistry',
        overview: 'Discover the world of atoms, molecules, and chemical reactions through theoretical and practical studies.',
        chapters: [
          {
            chapter_id: 'c11-en-chem-ch1',
            chapter_order: 1,
            chapter_title: 'Basic Concepts of Chemistry',
            summary: 'Learn fundamental concepts including atoms, molecules, moles, and stoichiometry.',
            key_topics: [
              'Atoms and Molecules',
              'Atomic and Molecular Masses',
              'Mole Concept',
              'Stoichiometry',
              'Empirical and Molecular Formulas',
              'Chemical Equations and Balancing'
            ],
            learning_outcomes: [
              'Understand atomic and molecular concepts',
              'Apply mole concept in calculations',
              'Balance chemical equations',
              'Solve stoichiometry problems'
            ],
            video_topics: [
              'Atomic Theory',
              'Mole Concept Explained',
              'Stoichiometric Calculations',
              'Formula Determinations'
            ],
            important_concepts: [
              'Avogadro\'s Number',
              'Molar Mass Calculations',
              'Percentage Composition',
              'Limiting Reagent'
            ],
            practical_activities: [
              'Mole Calculation Exercises',
              'Formula Determination Lab',
              'Stoichiometry Experiments',
              'Equation Balancing Practice'
            ],
            assessment_topics: [
              'Mole Calculations',
              'Stoichiometry Problems',
              'Formula Determinations',
              'Equation Balancing'
            ],
            difficulty_level: 'Moderate',
            estimated_hours: 25
          }
        ],
        learning_options: { lessons: true, practice: true, activities: true, assessments: true },
        difficulty_level: 'Advanced',
        recommended_age: '15-16 years',
        activities: ['Laboratory Work', 'Chemical Analysis', 'Research Projects'],
        fun_elements: ['Chemical Demonstrations', 'Lab Experiments', 'Molecular Modeling'],
        textbook_reference: 'Samacheer Kalvi Class 11 Chemistry Textbook',
        supplementary_resources: ['Lab Manual', 'Chemical Data Books', 'Online Resources'],
        career_connections: ['Chemical Engineering', 'Pharmaceutical', 'Research', 'Environmental Science']
      }
    ],
    exam_pattern: {
      internal_assessment: 20,
      external_exam: 70,
      practical: 10
    },
    key_skills: ['Scientific Method', 'Laboratory Skills', 'Data Analysis', 'Critical Thinking'],
    career_guidance: ['Engineering Entrance Preparation', 'Medical Entrance Preparation', 'Research Opportunities']
  },

  // ==================== CLASS 12 ====================
  {
    class: 'Class 12',
    medium: 'English',
    board: 'Tamil Nadu State Board',
    syllabus_source: 'Samacheer Kalvi 2024-25 (HSC)',
    stream: 'Science',
    subjects: [
      {
        course_id: 'c12-en-phy',
        subject_name: 'Physics',
        overview: 'Advanced physics concepts including electromagnetism, optics, modern physics, and their applications.',
        chapters: [
          {
            chapter_id: 'c12-en-phy-ch1',
            chapter_order: 1,
            chapter_title: 'Electric Charges and Fields',
            summary: 'Study electrostatics including Coulomb\'s law, electric field, and Gauss\'s law.',
            key_topics: [
              'Electric Charge and its Properties',
              'Coulomb\'s Law',
              'Electric Field and Field Lines',
              'Electric Flux and Gauss\'s Law',
              'Electric Potential and Potential Energy',
              'Equipotential Surfaces'
            ],
            learning_outcomes: [
              'Understand electric charge properties',
              'Apply Coulomb\'s law',
              'Calculate electric field and potential',
              'Use Gauss\'s law for symmetric charge distributions'
            ],
            video_topics: [
              'Electrostatic Phenomena',
              'Coulomb\'s Law Applications',
              'Electric Field Calculations',
              'Gauss\'s Law Problems'
            ],
            important_concepts: [
              'Charge Conservation',
              'Superposition Principle',
              'Field-Potential Relationship',
              'Gauss\'s Law Applications'
            ],
            practical_activities: [
              'Electrostatic Experiments',
              'Field Mapping',
              'Potential Measurements',
              'Charge Distribution Analysis'
            ],
            assessment_topics: [
              'Coulomb\'s Law Problems',
              'Electric Field Calculations',
              'Gauss\'s Law Applications',
              'Potential Energy Problems'
            ],
            difficulty_level: 'Hard',
            estimated_hours: 30
          },
          {
            chapter_id: 'c12-en-phy-ch2',
            chapter_order: 2,
            chapter_title: 'Current Electricity',
            summary: 'Learn about electric current, resistance, and electrical circuits.',
            key_topics: [
              'Electric Current and Current Density',
              'Ohm\'s Law and Resistance',
              'Resistivity and Conductivity',
              'Kirchhoff\'s Laws',
              'Series and Parallel Circuits',
              'Electrical Power and Energy'
            ],
            learning_outcomes: [
              'Understand current and resistance concepts',
              'Apply Ohm\'s law and Kirchhoff\'s laws',
              'Analyze series and parallel circuits',
              'Calculate electrical power and energy'
            ],
            video_topics: [
              'Current and Resistance',
              'Circuit Analysis',
              'Kirchhoff\'s Laws',
              'Power Calculations'
            ],
            important_concepts: [
              'Current-Voltage Relationship',
              'Circuit Analysis Techniques',
              'Power Dissipation',
              'Energy Conservation'
            ],
            practical_activities: [
              'Circuit Building Experiments',
              'Resistance Measurements',
              'Kirchhoff\'s Law Verification',
              'Power Calculation Labs'
            ],
            assessment_topics: [
              'Circuit Analysis Problems',
              'Resistance Calculations',
              'Kirchhoff\'s Law Applications',
              'Power and Energy Problems'
            ],
            difficulty_level: 'Hard',
            estimated_hours: 28
          }
        ],
        learning_options: { lessons: true, practice: true, activities: true, assessments: true },
        difficulty_level: 'Advanced',
        recommended_age: '16-17 years',
        activities: ['Advanced Laboratory Work', 'Physics Projects', 'Competitive Exam Preparation'],
        fun_elements: ['Physics Demonstrations', 'Technology Applications', 'Research Projects'],
        textbook_reference: 'Samacheer Kalvi Class 12 Physics Textbook',
        supplementary_resources: ['Advanced Lab Manual', 'Reference Books', 'Online Simulations'],
        career_connections: ['Engineering', 'Research', 'Technology', 'Space Science', 'Nuclear Physics']
      }
    ],
    exam_pattern: {
      internal_assessment: 20,
      external_exam: 70,
      practical: 10
    },
    key_skills: ['Advanced Problem Solving', 'Research Skills', 'Laboratory Techniques', 'Mathematical Modeling'],
    career_guidance: ['Engineering Entrance Exams', 'Research Opportunities', 'Higher Education Planning']
  }
];

// Subject-wise video content mapping
export const subjectVideoMapping = {
  'தமிழ்': {
    keywords: ['tamil', 'தமிழ்', 'language', 'literature', 'grammar'],
    topics: ['letters', 'words', 'stories', 'poems', 'grammar']
  },
  'கணக்கு': {
    keywords: ['math', 'mathematics', 'கணக்கு', 'numbers', 'calculation'],
    topics: ['numbers', 'shapes', 'addition', 'subtraction', 'geometry']
  },
  'Mathematics': {
    keywords: ['math', 'mathematics', 'algebra', 'geometry', 'calculus'],
    topics: ['algebra', 'geometry', 'trigonometry', 'statistics', 'calculus']
  },
  'Physics': {
    keywords: ['physics', 'mechanics', 'electricity', 'magnetism', 'optics'],
    topics: ['mechanics', 'thermodynamics', 'electricity', 'magnetism', 'modern physics']
  },
  'Chemistry': {
    keywords: ['chemistry', 'organic', 'inorganic', 'physical', 'chemical'],
    topics: ['atomic structure', 'chemical bonding', 'organic chemistry', 'inorganic chemistry']
  },
  'Science': {
    keywords: ['science', 'biology', 'physics', 'chemistry', 'environment'],
    topics: ['life science', 'physical science', 'environmental science', 'health']
  }
};

// Career guidance mapping
export const careerGuidanceMapping = {
  'Class 1-5': [
    'Foundation building for all subjects',
    'Development of basic skills',
    'Exploration of interests',
    'Creative and artistic development'
  ],
  'Class 6-8': [
    'Subject specialization awareness',
    'STEM field introduction',
    'Language and communication skills',
    'Critical thinking development'
  ],
  'Class 9-10': [
    'Stream selection guidance',
    'Career awareness programs',
    'Skill development focus',
    'Competitive exam preparation'
  ],
  'Class 11-12': [
    'Higher education planning',
    'Professional course guidance',
    'Entrance exam preparation',
    'Industry exposure programs'
  ]
};