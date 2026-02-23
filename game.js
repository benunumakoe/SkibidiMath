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

// Character System
const characters = {
    normal: { name: '🧑 Math Learner', emoji: '🧑', bonus: 1 },
    ninja: { name: '🥷 Math Ninja', emoji: '🥷', bonus: 1.2, unlocked: false },
    wizard: { name: '🧙‍♂️ Math Wizard', emoji: '🧙‍♂️', bonus: 1.5, unlocked: false },
    legend: { name: '👑 Math Legend', emoji: '👑', bonus: 2, unlocked: false }
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
    },
    
    addition: {
        easy: [
            { question: '0.2 + 0.3 = ?', options: ['0.5', '0.6', '0.4', '0.7'], answer: '0.5' },
            { question: '0.25 + 0.25 = ?', options: ['0.5', '0.4', '0.75', '0.6'], answer: '0.5' },
        ],
        medium: [
            { question: '0.45 + 0.32 = ?', options: ['0.77', '0.78', '0.76', '0.75'], answer: '0.77' },
            { question: '1.25 + 0.75 = ?', options: ['2.0', '1.9', '2.1', '1.8'], answer: '2.0' },
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
        ],
        hard: [
            { question: 'Which is smallest?', options: ['0.099', '0.10', '0.09', '0.0999'], answer: '0.09' },
        ]
    }
};

// Character selection function
function showCharacterSelect() {
    const charHTML = `
        <div class="character-select">
            <h3>Choose Your Character!</h3>
            <div class="char-grid">
                <div class="char-card" onclick="selectCharacter('normal')">
                    <div class="char-emoji">🧑</div>
                    <div>Math Learner</div>
                    <small>No bonus</small>
                </div>
                <div class="char-card ${gameState.characterXP > 100 ? '' : 'locked'}" 
                     onclick="selectCharacter('ninja')">
                    <div class="char-emoji">🥷</div>
                    <div>Math Ninja</div>
                    <small>20% bonus (100 XP)</small>
                    ${gameState.characterXP < 100 ? '<div class="lock">🔒</div>' : ''}
                </div>
                <div class="char-card ${gameState.characterXP > 500 ? '' : 'locked'}" 
                     onclick="selectCharacter('wizard')">
                    <div class="char-emoji">🧙‍♂️</div>
                    <div>Math Wizard</div>
                    <small>50% bonus (500 XP)</small>
                    ${gameState.characterXP < 500 ? '<div class="lock">🔒</div>' : ''}
                </div>
                <div class="char-card ${gameState.characterXP > 1000 ? '' : 'locked'}" 
                     onclick="selectCharacter('legend')">
                    <div class="char-emoji">👑</div>
                    <div>Math Legend</div>
                    <small>100% bonus (1000 XP)</small>
                    ${gameState.characterXP < 1000 ? '<div class="lock">🔒</div>' : ''}
                </div>
            </div>
        </div>
    `;
    
    document.querySelector('.game-area').innerHTML = charHTML;
}

function selectCharacter(char) {
    if (char === 'normal' || gameState.characterXP >= getRequiredXP(char)) {
        gameState.character = char;
        updateCharacterDisplay();
        // Go back to game
        generateQuestion();
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
    const types = ['addition', 'subtraction', 'multiplication', 'division', 'fractions', 'wordProblems', 'geometry', 'comparison'];
    const type = types[gameState.questionCount % types.length];
    
    const difficulty = getDifficulty();
    const bank = questionBank[type]?.[difficulty];
    
    // Fallback if bank doesn't exist
    if (!bank) {
        // Use addition as fallback
        const fallbackBank = questionBank.addition.easy;
        const questionData = fallbackBank[Math.floor(Math.random() * fallbackBank.length)];
        gameState.currentQuestion = {
            ...questionData,
            type: 'addition'
        };
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
        gameState.characterXP += 5; // Gain XP for correct answers
        
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
    
    // Update displays
    scoreEl.textContent = '0';
    timerEl.textContent = '60';
    levelEl.textContent = '1';
    streakEl.textContent = '0';
    
    updateProgressBars();
    updateCharacterDisplay();
    
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
        progress: gameState.progress,
        characterXP: gameState.characterXP,
        character: gameState.character
    }));
});

// Load saved progress
window.addEventListener('load', () => {
    const saved = localStorage.getItem('mathGameProgress');
    if (saved) {
        const data = JSON.parse(saved);
        // You could restore progress here
    }
});
