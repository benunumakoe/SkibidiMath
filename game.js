// Enhanced Game State
let gameState = {
    score: 0,
    timer: 60,
    level: 1,
    streak: 0,
    currentQuestion: null,
    timerInterval: null,
    canAnswer: true,
    progress: {
        addition: 0,
        subtraction: 0,
        multiplication: 0,
        division: 0,
        fractions: 0,
        decimals: 0,
        wordProblems: 0,
        geometry: 0,
        percentages: 0,
        ratios: 0,
        algebra: 0,
        negativeNumbers: 0
    },
    questionCount: 0,
    character: 'normal',
    characterXP: 0,
    currentGrade: '4'
};

// Character System
const characters = {
    normal: { name: '🧑 Math Learner', emoji: '🧑', bonus: 1 },
    ninja: { name: '🥷 Math Ninja', emoji: '🥷', bonus: 1.2, unlocked: false },
    wizard: { name: '🧙‍♂️ Math Wizard', emoji: '🧙‍♂️', bonus: 1.5, unlocked: false },
    legend: { name: '👑 Math Legend', emoji: '👑', bonus: 2, unlocked: false }
};

// DOM elements
let scoreEl = document.getElementById('score');
let timerEl = document.getElementById('timer');
let levelEl = document.getElementById('level');
let streakEl = document.getElementById('streak');
let questionEl = document.getElementById('question');
let optionsEl = document.getElementById('options');
let feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const newGameBtn = document.getElementById('newGameBtn');

// Progress bars
const progressAdd = document.getElementById('progressAdd');
const progressSub = document.getElementById('progressSub');
const progressMul = document.getElementById('progressMul');
const progressComp = document.getElementById('progressComp');
const progressDiv = document.getElementById('progressDiv');

// ============================================
// GRADE 4 CONTENT (30+ questions)
// ============================================
const grade4Content = {
    fractions: {
        easy: [
            { question: 'What is 1/2 of 8?', options: ['4', '3', '5', '6'], answer: '4' },
            { question: 'Which is bigger: 1/2 or 1/4?', options: ['1/2', '1/4', 'equal', 'none'], answer: '1/2' },
            { question: '2/4 is the same as?', options: ['1/2', '1/4', '3/4', '2/2'], answer: '1/2' },
            { question: 'What is 1/4 of 16?', options: ['4', '3', '5', '6'], answer: '4' },
            { question: 'Which fraction is smallest: 1/2, 1/3, 1/4?', options: ['1/4', '1/2', '1/3', 'equal'], answer: '1/4' },
            { question: 'What is 1/3 of 9?', options: ['3', '2', '4', '5'], answer: '3' },
            { question: 'What is 1/5 of 10?', options: ['2', '3', '4', '5'], answer: '2' },
        ],
        medium: [
            { question: '3/4 of 12 = ?', options: ['9', '8', '10', '6'], answer: '9' },
            { question: '1/3 + 1/3 = ?', options: ['2/3', '1/3', '3/3', '2/6'], answer: '2/3' },
            { question: '2/3 of 18 = ?', options: ['12', '10', '14', '16'], answer: '12' },
            { question: '3/5 + 1/5 = ?', options: ['4/5', '2/5', '3/5', '5/5'], answer: '4/5' },
            { question: 'Which is bigger: 2/3 or 3/4?', options: ['3/4', '2/3', 'equal', 'none'], answer: '3/4' },
            { question: 'What is 2/5 of 20?', options: ['8', '10', '6', '12'], answer: '8' },
            { question: '4/7 of 28 = ?', options: ['16', '14', '18', '20'], answer: '16' },
        ],
        hard: [
            { question: '2/5 + 1/5 = ?', options: ['3/5', '2/5', '4/5', '1/5'], answer: '3/5' },
            { question: '5/8 - 2/8 = ?', options: ['3/8', '4/8', '2/8', '1/8'], answer: '3/8' },
            { question: 'What is 3/7 of 28?', options: ['12', '14', '10', '16'], answer: '12' },
            { question: '4/9 + 2/9 = ?', options: ['6/9', '5/9', '7/9', '8/9'], answer: '6/9' },
            { question: '7/10 - 3/10 = ?', options: ['4/10', '5/10', '6/10', '3/10'], answer: '4/10' },
            { question: 'What is 5/6 of 36?', options: ['30', '28', '32', '34'], answer: '30' },
        ]
    },
    
    timesTables: {
        easy: [
            { question: '3 × 4 = ?', options: ['12', '7', '8', '9'], answer: '12' },
            { question: '5 × 5 = ?', options: ['25', '10', '15', '20'], answer: '25' },
            { question: '2 × 8 = ?', options: ['16', '14', '12', '18'], answer: '16' },
            { question: '4 × 3 = ?', options: ['12', '7', '8', '9'], answer: '12' },
            { question: '6 × 2 = ?', options: ['12', '10', '8', '14'], answer: '12' },
            { question: '7 × 3 = ?', options: ['21', '24', '18', '20'], answer: '21' },
            { question: '4 × 6 = ?', options: ['24', '20', '28', '30'], answer: '24' },
        ],
        medium: [
            { question: '7 × 6 = ?', options: ['42', '36', '48', '40'], answer: '42' },
            { question: '9 × 4 = ?', options: ['36', '32', '40', '35'], answer: '36' },
            { question: '8 × 7 = ?', options: ['56', '54', '58', '52'], answer: '56' },
            { question: '12 × 5 = ?', options: ['60', '55', '65', '50'], answer: '60' },
            { question: '11 × 8 = ?', options: ['88', '84', '92', '80'], answer: '88' },
            { question: '6 × 9 = ?', options: ['54', '56', '52', '58'], answer: '54' },
            { question: '8 × 8 = ?', options: ['64', '62', '66', '60'], answer: '64' },
        ],
        hard: [
            { question: '12 × 8 = ?', options: ['96', '88', '104', '92'], answer: '96' },
            { question: '9 × 9 = ?', options: ['81', '72', '90', '99'], answer: '81' },
            { question: '11 × 12 = ?', options: ['132', '121', '144', '110'], answer: '132' },
            { question: '15 × 6 = ?', options: ['90', '80', '100', '85'], answer: '90' },
            { question: '14 × 7 = ?', options: ['98', '96', '100', '102'], answer: '98' },
            { question: '13 × 7 = ?', options: ['91', '84', '98', '90'], answer: '91' },
        ]
    }
};

// ============================================
// GRADE 5 CONTENT (30+ questions)
// ============================================
const grade5Content = {
    decimals: {
        easy: [
            { question: '0.2 + 0.3 = ?', options: ['0.5', '0.6', '0.4', '0.7'], answer: '0.5' },
            { question: '0.25 + 0.25 = ?', options: ['0.5', '0.4', '0.75', '0.6'], answer: '0.5' },
            { question: '0.7 - 0.2 = ?', options: ['0.5', '0.4', '0.6', '0.3'], answer: '0.5' },
            { question: '0.8 + 0.1 = ?', options: ['0.9', '0.8', '1.0', '0.7'], answer: '0.9' },
            { question: '0.9 - 0.4 = ?', options: ['0.5', '0.4', '0.6', '0.3'], answer: '0.5' },
            { question: '0.3 + 0.6 = ?', options: ['0.9', '0.8', '1.0', '0.7'], answer: '0.9' },
        ],
        medium: [
            { question: '0.45 + 0.32 = ?', options: ['0.77', '0.78', '0.76', '0.75'], answer: '0.77' },
            { question: '1.25 + 0.75 = ?', options: ['2.0', '1.9', '2.1', '1.8'], answer: '2.0' },
            { question: '2.5 - 1.3 = ?', options: ['1.2', '1.3', '1.1', '1.4'], answer: '1.2' },
            { question: '3.6 + 2.4 = ?', options: ['6.0', '5.9', '6.1', '5.8'], answer: '6.0' },
            { question: '4.2 - 1.8 = ?', options: ['2.4', '2.3', '2.5', '2.6'], answer: '2.4' },
            { question: '5.7 + 3.2 = ?', options: ['8.9', '8.8', '9.0', '8.7'], answer: '8.9' },
        ],
        hard: [
            { question: '3.75 + 4.89 = ?', options: ['8.64', '8.65', '8.63', '8.66'], answer: '8.64' },
            { question: '12.45 - 7.32 = ?', options: ['5.13', '5.14', '5.12', '5.15'], answer: '5.13' },
            { question: '8.25 × 2.5 = ?', options: ['20.625', '20.5', '21', '20.75'], answer: '20.625' },
            { question: '15.5 + 6.75 = ?', options: ['22.25', '22.5', '21.75', '23'], answer: '22.25' },
            { question: '20.4 - 8.65 = ?', options: ['11.75', '11.8', '11.7', '11.85'], answer: '11.75' },
        ]
    },
    
    multiplication: {
        easy: [
            { question: '0.5 × 2 = ?', options: ['1.0', '1.5', '2.0', '0.5'], answer: '1.0' },
            { question: '0.4 × 3 = ?', options: ['1.2', '1.3', '1.1', '1.4'], answer: '1.2' },
            { question: '0.6 × 5 = ?', options: ['3.0', '3.5', '2.5', '4.0'], answer: '3.0' },
            { question: '0.3 × 4 = ?', options: ['1.2', '1.3', '1.1', '1.4'], answer: '1.2' },
        ],
        medium: [
            { question: '1.5 × 2.5 = ?', options: ['3.75', '3.5', '4.0', '3.25'], answer: '3.75' },
            { question: '2.5 × 1.5 = ?', options: ['3.75', '3.5', '4.0', '3.25'], answer: '3.75' },
            { question: '3.2 × 1.5 = ?', options: ['4.8', '4.7', '4.9', '5.0'], answer: '4.8' },
            { question: '4.5 × 2 = ?', options: ['9.0', '8.5', '9.5', '8.0'], answer: '9.0' },
            { question: '2.2 × 3 = ?', options: ['6.6', '6.5', '6.7', '6.4'], answer: '6.6' },
        ],
        hard: [
            { question: '12.5 × 3.2 = ?', options: ['40.0', '39.5', '40.5', '41.0'], answer: '40.0' },
            { question: '8.4 × 2.5 = ?', options: ['21.0', '20.5', '21.5', '20.0'], answer: '21.0' },
            { question: '7.5 × 4.5 = ?', options: ['33.75', '33.5', '34', '33'], answer: '33.75' },
            { question: '6.25 × 4 = ?', options: ['25', '24.5', '25.5', '24'], answer: '25' },
        ]
    },
    
    division: {
        easy: [
            { question: '12 ÷ 3 = ?', options: ['4', '3', '6', '9'], answer: '4' },
            { question: '20 ÷ 4 = ?', options: ['5', '4', '6', '3'], answer: '5' },
            { question: '15 ÷ 5 = ?', options: ['3', '4', '5', '2'], answer: '3' },
            { question: '18 ÷ 6 = ?', options: ['3', '2', '4', '5'], answer: '3' },
            { question: '16 ÷ 4 = ?', options: ['4', '3', '5', '6'], answer: '4' },
        ],
        medium: [
            { question: '48 ÷ 6 = ?', options: ['8', '7', '9', '6'], answer: '8' },
            { question: '81 ÷ 9 = ?', options: ['9', '8', '7', '10'], answer: '9' },
            { question: '64 ÷ 8 = ?', options: ['8', '7', '9', '6'], answer: '8' },
            { question: '56 ÷ 7 = ?', options: ['8', '7', '9', '6'], answer: '8' },
            { question: '72 ÷ 8 = ?', options: ['9', '8', '10', '7'], answer: '9' },
            { question: '45 ÷ 5 = ?', options: ['9', '8', '10', '7'], answer: '9' },
        ],
        hard: [
            { question: '144 ÷ 12 = ?', options: ['12', '11', '13', '10'], answer: '12' },
            { question: '121 ÷ 11 = ?', options: ['11', '10', '12', '13'], answer: '11' },
            { question: '169 ÷ 13 = ?', options: ['13', '12', '14', '15'], answer: '13' },
            { question: '196 ÷ 14 = ?', options: ['14', '13', '15', '12'], answer: '14' },
        ]
    },
    
    wordProblems: {
        easy: [
            { question: 'Sarah has 12 apples. She gives 3 away. How many left?', options: ['9', '15', '8', '10'], answer: '9' },
            { question: '5 cookies per pack. 3 packs = ? cookies', options: ['15', '10', '20', '8'], answer: '15' },
            { question: '24 students, 4 teams. Equal teams = ? per team', options: ['6', '5', '7', '4'], answer: '6' },
            { question: 'Save $5/week for 6 weeks = $?', options: ['$30', '$25', '$35', '$11'], answer: '$30' },
        ],
        medium: [
            { question: 'A pizza has 8 slices. Eat 3. What fraction left?', options: ['5/8', '3/8', '4/8', '6/8'], answer: '5/8' },
            { question: '25 students, 5 groups. Each group has ?', options: ['5', '4', '6', '3'], answer: '5' },
            { question: '10 packs, 6 stickers each. Total stickers?', options: ['60', '50', '70', '40'], answer: '60' },
        ],
        hard: [
            { question: 'A cake costs $12. Split among 4 people. Each pays?', options: ['$3', '$4', '$5', '$2'], answer: '$3' },
            { question: '150 pages read in 5 days. Pages per day?', options: ['30', '25', '35', '20'], answer: '30' },
        ]
    },
    
    geometry: {
        easy: [
            { question: 'How many sides does a square have?', options: ['4', '3', '5', '6'], answer: '4' },
            { question: 'How many sides does a triangle have?', options: ['3', '4', '5', '6'], answer: '3' },
        ],
        medium: [
            { question: 'Rectangle length 5, width 3. Area = ?', options: ['15', '8', '16', '10'], answer: '15' },
            { question: 'Square with side 4. Perimeter = ?', options: ['16', '8', '12', '20'], answer: '16' },
        ],
        hard: [
            { question: 'Area of triangle: base 6, height 4 = ?', options: ['12', '24', '10', '14'], answer: '12' },
        ]
    }
};

// ============================================
// GRADE 6 CONTENT (30+ questions)
// ============================================
const grade6Content = {
    percentages: {
        easy: [
            { question: 'What is 50% of 20?', options: ['10', '5', '15', '20'], answer: '10' },
            { question: '25% of 40 = ?', options: ['10', '8', '12', '15'], answer: '10' },
            { question: '75% of 100 = ?', options: ['75', '50', '25', '100'], answer: '75' },
            { question: '10% of 80 = ?', options: ['8', '10', '6', '12'], answer: '8' },
            { question: '20% of 50 = ?', options: ['10', '15', '20', '5'], answer: '10' },
        ],
        medium: [
            { question: 'What is 20% of 80?', options: ['16', '20', '18', '14'], answer: '16' },
            { question: '15% of 60 = ?', options: ['9', '8', '10', '12'], answer: '9' },
            { question: 'What percent of 50 is 10?', options: ['20%', '25%', '15%', '30%'], answer: '20%' },
            { question: '30% of 90 = ?', options: ['27', '30', '24', '21'], answer: '27' },
            { question: '12% of 200 = ?', options: ['24', '20', '30', '18'], answer: '24' },
        ],
        hard: [
            { question: 'A shirt costs $40. 15% discount = ?', options: ['$34', '$30', '$36', '$32'], answer: '$34' },
            { question: 'Population 200, grows 10% = ?', options: ['220', '210', '230', '240'], answer: '220' },
            { question: '35% of 240 = ?', options: ['84', '80', '90', '78'], answer: '84' },
            { question: 'Price $80, 25% off. New price?', options: ['$60', '$55', '$65', '$70'], answer: '$60' },
        ]
    },
    
    ratios: {
        easy: [
            { question: 'Ratio 2:3, total 25. How many?', options: ['10 and 15', '8 and 17', '12 and 13', '5 and 20'], answer: '10 and 15' },
            { question: '3:1 ratio. 12 total. How many each?', options: ['9 and 3', '8 and 4', '6 and 6', '10 and 2'], answer: '9 and 3' },
            { question: '1:4 ratio. Total 20. Larger share?', options: ['16', '4', '5', '15'], answer: '16' },
        ],
        medium: [
            { question: '5:2 ratio. 35 total. Larger share?', options: ['25', '20', '15', '30'], answer: '25' },
            { question: '4:3:1 ratio. Total 40. Middle share?', options: ['15', '20', '10', '5'], answer: '15' },
            { question: '3:5 ratio. Difference is 12. Total?', options: ['48', '36', '24', '60'], answer: '48' },
        ],
        hard: [
            { question: '2:5 ratio. Difference is 12. Total?', options: ['28', '24', '32', '36'], answer: '28' },
            { question: '7:3 ratio. Sum is 100. Larger share?', options: ['70', '30', '60', '40'], answer: '70' },
        ]
    }
};

// ============================================
// GRADE 7 CONTENT (30+ questions)
// ============================================
const grade7Content = {
    algebra: {
        easy: [
            { question: 'Solve: x + 5 = 12', options: ['7', '6', '8', '5'], answer: '7' },
            { question: '2x = 14. What is x?', options: ['7', '6', '8', '5'], answer: '7' },
            { question: 'x - 3 = 9. Find x', options: ['12', '11', '10', '13'], answer: '12' },
            { question: 'x/2 = 5. Find x', options: ['10', '8', '12', '6'], answer: '10' },
            { question: '3x = 21. x = ?', options: ['7', '6', '8', '5'], answer: '7' },
        ],
        medium: [
            { question: '3x + 2 = 14. Find x', options: ['4', '5', '3', '6'], answer: '4' },
            { question: '2x - 5 = 9. x = ?', options: ['7', '6', '8', '5'], answer: '7' },
            { question: 'x/4 = 5. Find x', options: ['20', '15', '25', '10'], answer: '20' },
            { question: '5x - 3 = 22. x = ?', options: ['5', '4', '6', '7'], answer: '5' },
            { question: '2x + 7 = 15. x = ?', options: ['4', '3', '5', '6'], answer: '4' },
        ],
        hard: [
            { question: '4x + 3 = 2x + 11. x = ?', options: ['4', '5', '3', '6'], answer: '4' },
            { question: '2(x + 3) = 16. x = ?', options: ['5', '6', '4', '7'], answer: '5' },
            { question: '3(2x - 1) = 27. x = ?', options: ['5', '4', '6', '7'], answer: '5' },
            { question: 'x/3 + 2 = 7. x = ?', options: ['15', '12', '18', '21'], answer: '15' },
            { question: '2x/5 = 8. x = ?', options: ['20', '16', '24', '12'], answer: '20' },
        ]
    },
    
    negativeNumbers: {
        easy: [
            { question: '-5 + 3 = ?', options: ['-2', '-8', '2', '8'], answer: '-2' },
            { question: '7 - 10 = ?', options: ['-3', '3', '-17', '17'], answer: '-3' },
            { question: '-4 - 3 = ?', options: ['-7', '-1', '7', '1'], answer: '-7' },
            { question: '-2 + 8 = ?', options: ['6', '-6', '10', '-10'], answer: '6' },
            { question: '5 - 12 = ?', options: ['-7', '7', '-17', '17'], answer: '-7' },
        ],
        medium: [
            { question: '-8 + (-2) = ?', options: ['-10', '-6', '10', '6'], answer: '-10' },
            { question: '15 - 20 = ?', options: ['-5', '5', '-35', '35'], answer: '-5' },
            { question: '-12 + 7 = ?', options: ['-5', '5', '-19', '19'], answer: '-5' },
            { question: '-3 - 8 = ?', options: ['-11', '11', '-5', '5'], answer: '-11' },
            { question: '-4 × 3 = ?', options: ['-12', '12', '-7', '7'], answer: '-12' },
        ],
        hard: [
            { question: '-3 × -4 = ?', options: ['12', '-12', '7', '-7'], answer: '12' },
            { question: '-20 ÷ 5 = ?', options: ['-4', '4', '-15', '15'], answer: '-4' },
            { question: '-15 ÷ -3 = ?', options: ['5', '-5', '3', '-3'], answer: '5' },
            { question: '-7 × 2 = ?', options: ['-14', '14', '-9', '9'], answer: '-14' },
        ]
    }
};

// Original Question Bank (kept for reference)
const questionBank = {
    fractions: {
        easy: [
            { question: 'What is 1/4 + 1/4?', options: ['1/2', '1/4', '2/4', '3/4'], answer: '1/2' },
            { question: 'Which is bigger: 1/3 or 1/4?', options: ['1/3', '1/4', 'equal', 'none'], answer: '1/3' },
        ],
        medium: [
            { question: '2/5 + 1/5 = ?', options: ['3/5', '2/5', '4/5', '1/5'], answer: '3/5' },
        ],
        hard: [
            { question: '3/8 + 2/8 = ?', options: ['5/8', '6/8', '4/8', '7/8'], answer: '5/8' },
        ]
    },
    
    decimals: {
        easy: [
            { question: '0.2 + 0.3 = ?', options: ['0.5', '0.6', '0.4', '0.7'], answer: '0.5' },
            { question: '0.25 + 0.25 = ?', options: ['0.5', '0.4', '0.75', '0.6'], answer: '0.5' },
        ],
        medium: [
            { question: '0.45 + 0.32 = ?', options: ['0.77', '0.78', '0.76', '0.75'], answer: '0.77' },
        ],
        hard: [
            { question: '3.75 + 4.89 = ?', options: ['8.64', '8.65', '8.63', '8.66'], answer: '8.64' },
        ]
    },
    
    addition: {
        easy: [
            { question: '0.2 + 0.3 = ?', options: ['0.5', '0.6', '0.4', '0.7'], answer: '0.5' },
            { question: '0.25 + 0.25 = ?', options: ['0.5', '0.4', '0.75', '0.6'], answer: '0.5' },
        ],
        medium: [
            { question: '0.45 + 0.32 = ?', options: ['0.77', '0.78', '0.76', '0.75'], answer: '0.77' },
        ],
        hard: [
            { question: '3.75 + 4.89 = ?', options: ['8.64', '8.65', '8.63', '8.66'], answer: '8.64' },
        ]
    },
    
    subtraction: {
        easy: [
            { question: '0.8 - 0.3 = ?', options: ['0.5', '0.6', '0.4', '0.7'], answer: '0.5' },
            { question: '0.75 - 0.25 = ?', options: ['0.5', '0.4', '0.6', '0.3'], answer: '0.5' },
        ],
        medium: [
            { question: '1.5 - 0.75 = ?', options: ['0.75', '0.8', '0.7', '0.85'], answer: '0.75' },
        ],
        hard: [
            { question: '8.25 - 3.75 = ?', options: ['4.5', '4.4', '4.6', '4.7'], answer: '4.5' },
        ]
    },
    
    multiplication: {
        easy: [
            { question: '0.5 × 2 = ?', options: ['1.0', '1.5', '2.0', '0.5'], answer: '1.0' },
            { question: '0.4 × 3 = ?', options: ['1.2', '1.3', '1.1', '1.4'], answer: '1.2' },
        ],
        medium: [
            { question: '1.5 × 2.5 = ?', options: ['3.75', '3.5', '4.0', '3.25'], answer: '3.75' },
        ],
        hard: [
            { question: '12.5 × 3.2 = ?', options: ['40.0', '39.5', '40.5', '41.0'], answer: '40.0' },
        ]
    },
    
    division: {
        easy: [
            { question: '12 ÷ 3 = ?', options: ['4', '3', '6', '9'], answer: '4' },
            { question: '20 ÷ 4 = ?', options: ['5', '4', '6', '3'], answer: '5' },
        ],
        medium: [
            { question: '48 ÷ 6 = ?', options: ['8', '7', '9', '6'], answer: '8' },
        ],
        hard: [
            { question: '144 ÷ 12 = ?', options: ['12', '11', '13', '10'], answer: '12' },
        ]
    },
    
    wordProblems: {
        easy: [
            { question: 'Sarah has 12 apples. Gives 3 away. Left?', options: ['9', '15', '8', '10'], answer: '9' },
            { question: '5 cookies per pack. 3 packs = ?', options: ['15', '10', '20', '8'], answer: '15' },
        ],
        medium: [
            { question: '24 students, 4 teams. Each team = ?', options: ['6', '5', '7', '4'], answer: '6' },
        ],
        hard: [
            { question: 'Pizza 8 slices. Eat 3/8. Left = ?', options: ['5/8', '3/8', '6/8', '4/8'], answer: '5/8' },
        ]
    },
    
    geometry: {
        easy: [
            { question: 'How many sides does a square have?', options: ['4', '3', '5', '6'], answer: '4' },
        ],
        medium: [
            { question: 'Rectangle length 5, width 3. Area = ?', options: ['15', '8', '16', '10'], answer: '15' },
        ],
        hard: [
            { question: 'Area of triangle: base 6, height 4 = ?', options: ['12', '24', '10', '14'], answer: '12' },
        ]
    },
    
    comparison: {
        easy: [
            { question: 'Which is larger?', options: ['0.5', '0.25', '0.75', '0.1'], answer: '0.75' },
        ],
        medium: [
            { question: 'Which is largest?', options: ['1.05', '1.5', '1.005', '1.15'], answer: '1.5' },
        ],
        hard: [
            { question: 'Which is smallest?', options: ['0.099', '0.10', '0.09', '0.0999'], answer: '0.09' },
        ]
    }
};

// Combine all content based on grade
function getQuestionsForGrade(grade) {
    switch(grade) {
        case '4':
            return {
                ...grade4Content,
                addition: questionBank.addition,
                subtraction: questionBank.subtraction
            };
        case '5':
            return grade5Content;
        case '6':
            return grade6Content;
        case '7':
            return grade7Content;
        default:
            return grade5Content;
    }
}

// Function to return to game
function returnToGame() {
    // Recreate the game area HTML
    const gameArea = document.querySelector('.game-area');
    gameArea.innerHTML = `
        <div class="question-box" id="question">
            Loading question...
        </div>
        <div class="options-grid" id="options">
            <!-- Options will be added by JavaScript -->
        </div>
        <div class="feedback" id="feedback"></div>
    `;
    
    // Reassign DOM elements
    questionEl = document.getElementById('question');
    optionsEl = document.getElementById('options');
    feedbackEl = document.getElementById('feedback');
    
    // Clear any existing timer
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    
    // Reset timer to 60
    gameState.timer = 60;
    timerEl.textContent = '60';
    
    // Generate new question and start timer
    generateQuestion();
    startTimer();
}

// Grade selector function
function showGradeSelector() {
    // Stop timer
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    
    const gradeHTML = `
        <div class="character-select">
            <h3>Choose Your Grade!</h3>
            <div class="char-grid">
                <div class="char-card" onclick="selectGrade('4')">
                    <div class="char-emoji">📘</div>
                    <div>Grade 4</div>
                    <small>Fractions, Times Tables</small>
                </div>
                <div class="char-card" onclick="selectGrade('5')">
                    <div class="char-emoji">📙</div>
                    <div>Grade 5</div>
                    <small>Decimals, Multiplication</small>
                </div>
                <div class="char-card" onclick="selectGrade('6')">
                    <div class="char-emoji">📕</div>
                    <div>Grade 6</div>
                    <small>Percentages, Ratios</small>
                </div>
                <div class="char-card" onclick="selectGrade('7')">
                    <div class="char-emoji">📗</div>
                    <div>Grade 7</div>
                    <small>Algebra, Negative Numbers</small>
                </div>
            </div>
            <button onclick="returnToGame()" style="margin-top: 20px; background: #667eea; color: white; border: none; padding: 10px 30px; border-radius: 30px; font-size: 1rem; cursor: pointer; font-weight: bold;">
                🔙 Back to Game
            </button>
        </div>
    `;
    
    document.querySelector('.game-area').innerHTML = gradeHTML;
}

function selectGrade(grade) {
    gameState.currentGrade = grade;
    document.getElementById('currentGrade').innerHTML = `Grade ${grade}`;
    document.getElementById('headerGrade').innerHTML = `Grade ${grade}`;
    
    // Return to game with new grade
    returnToGame();
}

// Character selection function
function showCharacterSelect() {
    // Stop timer
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    
    const charHTML = `
        <div class="character-select">
            <h3>Choose Your Character!</h3>
            <div class="char-grid">
                <div class="char-card" onclick="selectCharacter('normal')">
                    <div class="char-emoji">🧑</div>
                    <div>Math Learner</div>
                    <small>No bonus</small>
                </div>
                <div class="char-card ${gameState.characterXP >= 100 ? '' : 'locked'}" 
                     onclick="selectCharacter('ninja')">
                    <div class="char-emoji">🥷</div>
                    <div>Math Ninja</div>
                    <small>20% bonus (100 XP)</small>
                    ${gameState.characterXP < 100 ? '<div class="lock">🔒</div>' : ''}
                </div>
                <div class="char-card ${gameState.characterXP >= 500 ? '' : 'locked'}" 
                     onclick="selectCharacter('wizard')">
                    <div class="char-emoji">🧙‍♂️</div>
                    <div>Math Wizard</div>
                    <small>50% bonus (500 XP)</small>
                    ${gameState.characterXP < 500 ? '<div class="lock">🔒</div>' : ''}
                </div>
                <div class="char-card ${gameState.characterXP >= 1000 ? '' : 'locked'}" 
                     onclick="selectCharacter('legend')">
                    <div class="char-emoji">👑</div>
                    <div>Math Legend</div>
                    <small>100% bonus (1000 XP)</small>
                    ${gameState.characterXP < 1000 ? '<div class="lock">🔒</div>' : ''}
                </div>
            </div>
            <button onclick="returnToGame()" style="margin-top: 20px; background: #667eea; color: white; border: none; padding: 10px 30px; border-radius: 30px; font-size: 1rem; cursor: pointer; font-weight: bold;">
                🔙 Back to Game
            </button>
        </div>
    `;
    
    document.querySelector('.game-area').innerHTML = charHTML;
}

function selectCharacter(char) {
    if (char === 'normal' || gameState.characterXP >= getRequiredXP(char)) {
        gameState.character = char;
        updateCharacterDisplay();
        returnToGame();
    }
}

function getRequiredXP(char) {
    return { ninja: 100, wizard: 500, legend: 1000 }[char] || 0;
}

function updateCharacterDisplay() {
    const char = characters[gameState.character];
    const charDisplay = document.getElementById('currentCharacter');
    if (charDisplay) {
        charDisplay.innerHTML = `${char.emoji} ${char.name} (${char.bonus}x bonus)`;
    }
}

// Start timer
function startTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    gameState.timerInterval = setInterval(() => {
        if (gameState.timer > 0) {
            gameState.timer--;
            timerEl.textContent = gameState.timer;
        }
        
        if (gameState.timer <= 0) {
            clearInterval(gameState.timerInterval);
            gameState.timerInterval = null;
            endGame();
        }
    }, 1000);
}

// Get difficulty based on streak and level
function getDifficulty() {
    if (gameState.streak >= 5) return 'hard';
    if (gameState.streak >= 2) return 'medium';
    return 'easy';
}

// Generate new question
function generateQuestion() {
    gameState.canAnswer = true;
    
    // Get questions for current grade
    const gradeQuestions = getQuestionsForGrade(gameState.currentGrade);
    const types = Object.keys(gradeQuestions);
    
    // Make sure we have types
    if (types.length === 0) {
        console.error('No question types found for grade', gameState.currentGrade);
        return;
    }
    
    const type = types[gameState.questionCount % types.length];
    const difficulty = getDifficulty();
    const bank = gradeQuestions[type]?.[difficulty];
    
    if (!bank || bank.length === 0) {
        // Fallback to any available question
        const fallbackType = types[0];
        const fallbackBank = gradeQuestions[fallbackType]?.easy;
        if (fallbackBank && fallbackBank.length > 0) {
            const questionData = fallbackBank[Math.floor(Math.random() * fallbackBank.length)];
            gameState.currentQuestion = {
                ...questionData,
                type: fallbackType
            };
        } else {
            // Ultimate fallback
            gameState.currentQuestion = {
                question: '2 + 2 = ?',
                options: ['4', '3', '5', '6'],
                answer: '4',
                type: 'addition'
            };
        }
    } else {
        const questionData = bank[Math.floor(Math.random() * bank.length)];
        gameState.currentQuestion = {
            ...questionData,
            type: type
        };
    }
    
    questionEl.textContent = gameState.currentQuestion.question;
    
    // Display options
    optionsEl.innerHTML = '';
    gameState.currentQuestion.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.addEventListener('click', () => checkAnswer(option, gameState.currentQuestion.answer, gameState.currentQuestion.type));
        optionsEl.appendChild(btn);
    });
    
    gameState.questionCount++;
}

// Check answer
function checkAnswer(selected, correct, type) {
    if (!gameState.canAnswer) return;
    
    gameState.canAnswer = false;
    const isCorrect = selected === correct;
    
    // Highlight correct/wrong answers
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.style.pointerEvents = 'none';
        if (btn.textContent === correct) {
            btn.classList.add('correct');
        } else if (btn.textContent === selected && !isCorrect) {
            btn.classList.add('wrong');
        }
    });
    
    if (isCorrect) {
        // Apply character bonus
        const bonus = characters[gameState.character]?.bonus || 1;
        const points = Math.floor(10 * gameState.level * bonus);
        
        gameState.score += points;
        gameState.streak++;
        gameState.characterXP += 5;
        
        feedbackEl.textContent = `✅ Correct! +${points} points (${bonus}x bonus!)`;
        
        // Update progress for this type
        if (gameState.progress[type] !== undefined) {
            gameState.progress[type] = Math.min(100, gameState.progress[type] + 10);
        }
        updateProgressBars();
        
        // Level up every 50 points
        gameState.level = Math.floor(gameState.score / 50) + 1;
    } else {
        gameState.streak = 0;
        feedbackEl.textContent = '❌ Try again!';
    }
    
    // Update displays
    scoreEl.textContent = gameState.score;
    streakEl.textContent = gameState.streak;
    levelEl.textContent = gameState.level;
    
    // Check for character unlocks
    checkCharacterUnlocks();
}

// Check character unlocks
function checkCharacterUnlocks() {
    if (gameState.characterXP >= 100 && !characters.ninja.unlocked) {
        alert('🎉 Congratulations! You unlocked Math Ninja!');
        characters.ninja.unlocked = true;
    }
    if (gameState.characterXP >= 500 && !characters.wizard.unlocked) {
        alert('🎉 Amazing! You unlocked Math Wizard!');
        characters.wizard.unlocked = true;
    }
    if (gameState.characterXP >= 1000 && !characters.legend.unlocked) {
        alert('👑 INCREDIBLE! You unlocked Math Legend!');
        characters.legend.unlocked = true;
    }
}

// Update progress bars
function updateProgressBars() {
    if (progressAdd) progressAdd.style.width = (gameState.progress.addition || 0) + '%';
    if (progressSub) progressSub.style.width = (gameState.progress.subtraction || 0) + '%';
    if (progressMul) progressMul.style.width = (gameState.progress.multiplication || 0) + '%';
    if (progressComp) progressComp.style.width = (gameState.progress.comparison || 0) + '%';
    if (progressDiv) progressDiv.style.width = (gameState.progress.division || 0) + '%';
}

// End game
function endGame() {
    feedbackEl.textContent = '⏰ Time\'s up! Final score: ' + gameState.score;
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
}

// New game
function newGame() {
    // Clear any existing timer
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    
    // Save old values
    const oldCharacter = gameState?.character || 'normal';
    const oldXP = gameState?.characterXP || 0;
    const oldGrade = gameState?.currentGrade || '4';
    
    gameState = {
        score: 0,
        timer: 60,
        level: 1,
        streak: 0,
        currentQuestion: null,
        timerInterval: null,
        canAnswer: true,
        progress: {
            addition: 0,
            subtraction: 0,
            multiplication: 0,
            division: 0,
            fractions: 0,
            decimals: 0,
            wordProblems: 0,
            geometry: 0,
            percentages: 0,
            ratios: 0,
            algebra: 0,
            negativeNumbers: 0
        },
        questionCount: 0,
        character: oldCharacter,
        characterXP: oldXP,
        currentGrade: oldGrade
    };
    
    // Update displays
    scoreEl.textContent = '0';
    timerEl.textContent = '60';
    levelEl.textContent = '1';
    streakEl.textContent = '0';
    
    updateProgressBars();
    updateCharacterDisplay();
    
    returnToGame();
}

// Event listeners
nextBtn.addEventListener('click', () => {
    if (gameState.timer > 0) {
        generateQuestion();
    }
});

newGameBtn.addEventListener('click', newGame);

// Initialize game
newGame();

// Save progress to browser
window.addEventListener('beforeunload', () => {
    localStorage.setItem('mathGameProgress', JSON.stringify({
        highScore: gameState.score,
        progress: gameState.progress,
        characterXP: gameState.characterXP,
        character: gameState.character,
        currentGrade: gameState.currentGrade
    }));
});
