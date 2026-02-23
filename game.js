// Game state
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
        comparison: 0
    },
    questionCount: 0
};

// DOM elements
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const levelEl = document.getElementById('level');
const streakEl = document.getElementById('streak');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const newGameBtn = document.getElementById('newGameBtn');

// Progress bars
const progressAdd = document.getElementById('progressAdd');
const progressSub = document.getElementById('progressSub');
const progressMul = document.getElementById('progressMul');
const progressComp = document.getElementById('progressComp');

// Question database (adaptive difficulty)
const questionBank = {
    addition: {
        easy: [
            { question: '0.2 + 0.3 = ?', options: ['0.5', '0.6', '0.4', '0.7'], answer: '0.5' },
            { question: '0.25 + 0.25 = ?', options: ['0.5', '0.4', '0.75', '0.6'], answer: '0.5' },
            { question: '0.1 + 0.7 = ?', options: ['0.8', '0.7', '0.9', '0.6'], answer: '0.8' },
        ],
        medium: [
            { question: '0.45 + 0.32 = ?', options: ['0.77', '0.78', '0.76', '0.75'], answer: '0.77' },
            { question: '1.25 + 0.75 = ?', options: ['2.0', '1.9', '2.1', '1.8'], answer: '2.0' },
            { question: '0.68 + 0.24 = ?', options: ['0.92', '0.91', '0.93', '0.94'], answer: '0.92' },
        ],
        hard: [
            { question: '3.75 + 4.89 = ?', options: ['8.64', '8.65', '8.63', '8.66'], answer: '8.64' },
            { question: '12.45 + 7.55 = ?', options: ['20.0', '19.9', '20.1', '19.8'], answer: '20.0' },
        ]
    },
    subtraction: {
        easy: [
            { question: '0.8 - 0.3 = ?', options: ['0.5', '0.6', '0.4', '0.7'], answer: '0.5' },
            { question: '0.75 - 0.25 = ?', options: ['0.5', '0.4', '0.6', '0.3'], answer: '0.5' },
        ],
        medium: [
            { question: '1.5 - 0.75 = ?', options: ['0.75', '0.8', '0.7', '0.85'], answer: '0.75' },
            { question: '3.2 - 1.8 = ?', options: ['1.4', '1.5', '1.3', '1.6'], answer: '1.4' },
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
            { question: '2.5 × 1.5 = ?', options: ['3.75', '3.5', '4.0', '3.25'], answer: '3.75' },
        ],
        hard: [
            { question: '12.5 × 3.2 = ?', options: ['40.0', '39.5', '40.5', '41.0'], answer: '40.0' },
        ]
    },
    comparison: {
        easy: [
            { question: 'Which is larger?', options: ['0.5', '0.25', '0.75', '0.1'], answer: '0.75' },
            { question: 'Which is smaller?', options: ['0.8', '0.08', '0.88', '0.08'], answer: '0.08' },
        ],
        medium: [
            { question: 'Which is largest?', options: ['1.05', '1.5', '1.005', '1.15'], answer: '1.5' },
            { question: 'Order: 0.75, 0.57, 0.705 (largest first)', options: ['0.75, 0.705, 0.57', '0.57, 0.705, 0.75', '0.705, 0.75, 0.57', '0.75, 0.57, 0.705'], answer: '0.75, 0.705, 0.57' },
        ],
        hard: [
            { question: 'Which is smallest?', options: ['0.099', '0.10', '0.09', '0.0999'], answer: '0.09' },
        ]
    }
};

// Start timer
function startTimer() {
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);
    
    gameState.timerInterval = setInterval(() => {
        gameState.timer--;
        timerEl.textContent = gameState.timer;
        
        if (gameState.timer <= 0) {
            clearInterval(gameState.timerInterval);
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
    
    // Cycle through question types
    const types = ['addition', 'subtraction', 'multiplication', 'comparison'];
    const type = types[gameState.questionCount % 4];
    
    const difficulty = getDifficulty();
    const bank = questionBank[type][difficulty];
    
    // Random question from that category
    const questionData = bank[Math.floor(Math.random() * bank.length)];
    
    gameState.currentQuestion = {
        ...questionData,
        type: type
    };
    
    questionEl.textContent = questionData.question;
    
    // Display options
    optionsEl.innerHTML = '';
    questionData.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.addEventListener('click', () => checkAnswer(option, questionData.answer, type));
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
        gameState.score += 10 * gameState.level;
        gameState.streak++;
        feedbackEl.textContent = '✅ Correct! +10 points';
        
        // Update progress for this type
        gameState.progress[type] = Math.min(100, gameState.progress[type] + 10);
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
}

// Update progress bars
function updateProgressBars() {
    progressAdd.style.width = gameState.progress.addition + '%';
    progressSub.style.width = gameState.progress.subtraction + '%';
    progressMul.style.width = gameState.progress.multiplication + '%';
    progressComp.style.width = gameState.progress.comparison + '%';
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
            comparison: 0
        },
        questionCount: 0
    };
    
    // Update displays
    scoreEl.textContent = '0';
    timerEl.textContent = '60';
    levelEl.textContent = '1';
    streakEl.textContent = '0';
    
    updateProgressBars();
    
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);
    startTimer();
    generateQuestion();
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

// Save progress to browser (for next visit)
window.addEventListener('beforeunload', () => {
    localStorage.setItem('mathGameProgress', JSON.stringify({
        highScore: gameState.score,
        progress: gameState.progress
    }));
});

// Load saved progress
window.addEventListener('load', () => {
    const saved = localStorage.getItem('mathGameProgress');
    if (saved) {
        const data = JSON.parse(saved);
        // You could restore high score here if you want
    }
});