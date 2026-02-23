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
        geometry: 0
    },
    questionCount: 0,
    character: 'normal',
    characterXP: 0
};

// Question Bank with Grade 4 Content
const questionBank = {
    // GRADE 4 CONTENT
    fractions: {
        easy: [
            { question: 'What is 1/4 + 1/4?', options: ['1/2', '1/4', '2/4', '3/4'], answer: '1/2' },
            { question: 'Which is bigger: 1/3 or 1/4?', options: ['1/3', '1/4', 'equal', 'none'], answer: '1/3' },
            { question: 'What fraction is shaded? 🟨🟨🟨⬜', options: ['3/4', '1/4', '2/4', '4/4'], answer: '3/4' },
        ],
        medium: [
            { question: '2/5 + 1/5 = ?', options: ['3/5', '2/5', '4/5', '1/5'], answer: '3/5' },
            { question: 'Which is smallest: 2/3, 3/4, 1/2?', options: ['1/2', '2/3', '3/4', 'equal'], answer: '1/2' },
        ],
        hard: [
            { question: '3/8 + 2/8 = ?', options: ['5/8', '6/8', '4/8', '7/8'], answer: '5/8' },
        ]
    },
    
    division: {
        easy: [
            { question: '12 ÷ 3 = ?', options: ['4', '3', '6', '9'], answer: '4' },
            { question: '20 ÷ 4 = ?', options: ['5', '4', '6', '3'], answer: '5' },
            { question: '15 ÷ 5 = ?', options: ['3', '4', '5', '2'], answer: '3' },
        ],
        medium: [
            { question: '48 ÷ 6 = ?', options: ['8', '7', '9', '6'], answer: '8' },
            { question: '81 ÷ 9 = ?', options: ['9', '8', '7', '10'], answer: '9' },
        ],
        hard: [
            { question: '144 ÷ 12 = ?', options: ['12', '11', '13', '10'], answer: '12' },
        ]
    },
    
    wordProblems: {
        easy: [
            { question: 'Sarah has 12 apples. She gives 3 to Tom. How many left?', options: ['9', '15', '8', '10'], answer: '9' },
            { question: '5 cookies per pack. 3 packs = ? cookies', options: ['15', '10', '20', '8'], answer: '15' },
        ],
        medium: [
            { question: '24 students, 4 teams. Equal teams = ? per team', options: ['6', '5', '7', '4'], answer: '6' },
            { question: 'Save $5/week for 6 weeks = $?', options: ['$30', '$25', '$35', '$11'], answer: '$30' },
        ],
        hard: [
            { question: 'Pizza cut into 8 slices. Eat 3/8. Left = ?', options: ['5/8', '3/8', '6/8', '4/8'], answer: '5/8' },
        ]
    },
    
    geometry: {
        easy: [
            { question: 'How many sides does a square have?', options: ['4', '3', '5', '6'], answer: '4' },
            { question: 'Which shape has 3 sides?', options: ['Triangle', 'Square', 'Circle', 'Rectangle'], answer: 'Triangle' },
        ],
        medium: [
            { question: 'A rectangle has length 5, width 3. Area = ?', options: ['15', '8', '16', '10'], answer: '15' },
            { question: 'Perimeter of square with side 4 = ?', options: ['16', '8', '12', '20'], answer: '16' },
        ],
        hard: [
            { question: 'Area of triangle: base 6, height 4 = ?', options: ['12', '24', '10', '14'], answer: '12' },
        ]
    }
};

// Add this to your existing questionBank
// Merge with your existing addition/subtraction/multiplication/comparison
