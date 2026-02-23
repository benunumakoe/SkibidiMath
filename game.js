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
    currentGrade: '4' // Track current grade
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
const progressDiv = document.getElementById('progressDiv');
// ============================================
// GRADE 4 CONTENT (Easier fractions, times tables)
// ============================================
const grade4Content = {
    fractions: {
        easy: [
            { question: 'What is 1/2 of 8?', options: ['4', '3', '5', '6'], answer: '4' },
            { question: 'Which is bigger: 1/2 or 1/4?', options: ['1/2', '1/4', 'equal', 'none'], answer: '1/2' },
            { question: '2/4 is the same as?', options: ['1/2', '1/4', '3/4', '2/2'], answer: '1/2' },
        ],
        medium: [
            { question: '3/4 of 12 = ?', options: ['9', '8', '10', '6'], answer: '9' },
            { question: '1/3 + 1/3 = ?', options: ['2/3', '1/3', '3/3', '2/6'], answer: '2/3' },
        ],
        hard: [
            { question: '2/5 + 1/5 = ?', options: ['3/5', '2/5', '4/5', '1/5'], answer: '3/5' },
        ]
    },
    
    timesTables: {
        easy: [
            { question: '3 × 4 = ?', options: ['12', '7', '8', '9'], answer: '12' },
            { question: '5 × 5 = ?', options: ['25', '10', '15', '20'], answer: '25' },
            { question: '2 × 8 = ?', options: ['16', '14', '12', '18'], answer: '16' },
        ],
        medium: [
            { question: '7 × 6 = ?', options: ['42', '36', '48', '40'], answer: '42' },
            { question: '9 × 4 = ?', options: ['36', '32', '40', '35'], answer: '36' },
        ],
        hard: [
            { question: '12 × 8 = ?', options: ['96', '88', '104', '92'], answer: '96' },
        ]
    }
};

// ============================================
// GRADE 6 CONTENT (Percentages, Ratios)
// ============================================
const grade6Content = {
    percentages: {
        easy: [
            { question: 'What is 50% of 20?', options: ['10', '5', '15', '20'], answer: '10' },
            { question: '25% of 40 = ?', options: ['10', '8', '12', '15'], answer: '10' },
            { question: '75% of 100 = ?', options: ['75', '50', '25', '100'], answer: '75' },
        ],
        medium: [
            { question: 'What is 20% of 80?', options: ['16', '20', '18', '14'], answer: '16' },
            { question: '15% of 60 = ?', options: ['9', '8', '10', '12'], answer: '9' },
            { question: 'What percent of 50 is 10?', options: ['20%', '25%', '15%', '30%'], answer: '20%' },
        ],
        hard: [
            { question: 'A shirt costs $40. 15% discount = ?', options: ['$34', '$30', '$36', '$32'], answer: '$34' },
            { question: 'Population 200, grows 10% = ?', options: ['220', '210', '230', '240'], answer: '220' },
        ]
    },
    
    ratios: {
        easy: [
            { question: 'Ratio 2:3, total 25. How many?', options: ['10 and 15', '8 and 17', '12 and 13', '5 and 20'], answer: '10 and 15' },
            { question: '3:1 ratio. 12 total. How many each?', options: ['9 and 3', '8 and 4', '6 and 6', '10 and 2'], answer: '9 and 3' },
        ],
        medium: [
            { question: '5:2 ratio. 35 total. Larger share?', options: ['25', '20', '15', '30'], answer: '25' },
            { question: '4:3:1 ratio. Total 40. Middle share?', options: ['15', '20', '10', '5'], answer: '15' },
        ],
        hard: [
            { question: '2:5 ratio. Difference is 12. Total?', options: ['28', '24', '32', '36'], answer: '28' },
        ]
    }
};

// ============================================
// GRADE 7 CONTENT (Algebra basics, Negative numbers)
// ============================================
const grade7Content = {
    algebra: {
        easy: [
            { question: 'Solve: x + 5 = 12', options: ['7', '6', '8', '5'], answer: '7' },
            { question: '2x = 14. What is x?', options: ['7', '6', '8', '5'], answer: '7' },
            { question: 'x - 3 = 9. Find x', options: ['12', '11', '10', '13'], answer: '12' },
        ],
        medium: [
            { question: '3x + 2 = 14. Find x', options: ['4', '5', '3', '6'], answer: '4' },
            { question: '2x - 5 = 9. x = ?', options: ['7', '6', '8', '5'], answer: '7' },
            { question: 'x/4 = 5. Find x', options: ['20', '15', '25', '10'], answer: '20' },
        ],
        hard: [
            { question: '4x + 3 = 2x + 11. x = ?', options: ['4', '5', '3', '6'], answer: '4' },
            { question: '2(x + 3) = 16. x = ?', options: ['5', '6', '4', '7'], answer: '5' },
        ]
    },
    
    negativeNumbers: {
        easy: [
            { question: '-5 + 3 = ?', options: ['-2', '-8', '2', '8'], answer: '-2' },
            { question: '7 - 10 = ?', options: ['-3', '3', '-17', '17'], answer: '-3' },
            { question: '-4 - 3 = ?', options: ['-7', '-1', '7', '1'], answer: '-7' },
        ],
        medium: [
            { question: '-8 + (-2) = ?', options: ['-10', '-6', '10', '6'], answer: '-10' },
            { question: '15 - 20 = ?', options: ['-5', '5', '-35', '35'], answer: '-5' },
            { question: '-12 + 7 = ?', options: ['-5', '5', '-19', '19'], answer: '-5' },
        ],
        hard: [
            { question: '-3 × -4 = ?', options: ['12', '-12', '7', '-7'], answer: '12' },
            { question: '-20 ÷ 5 = ?', options: ['-4', '4', '-15', '15'], answer: '-4' },
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
                subtraction: questionBank.subtraction,
                multiplication: questionBank.multiplication,
                division: questionBank.division,
                wordProblems: questionBank.wordProblems,
                geometry: questionBank.geometry
            };
        case '6':
            return {
                percentages: grade6Content.percentages,
                ratios: grade6Content.ratios,
                addition: questionBank.addition,
                subtraction: questionBank.subtraction,
                multiplication: questionBank.multiplication,
                fractions: questionBank.fractions,
                decimals: questionBank.decimals
            };
        case '7':
            return {
                algebra: grade7Content.algebra,
                negativeNumbers: grade7Content.negativeNumbers,
                percentages: grade6Content.percentages,
                ratios: grade6Content.ratios,
                multiplication: questionBank.multiplication,
                division: questionBank.division,
                geometry: questionBank.geometry
            };
        default:
            return questionBank;
    }
}

// Original Question Bank (keep your existing one)
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

// Grade selector function
function showGradeSelector() {
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
        </div>
    `;
    
    document.querySelector('.game-area').innerHTML = gradeHTML;
}

function selectGrade(grade) {
    gameState.currentGrade = grade;
    document.getElementById('currentGrade').innerHTML = `Grade ${grade}`;
    newGame(); // Restart with new grade
}

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
    
    // Get questions for current grade
    const gradeQuestions = getQuestionsForGrade(gameState.currentGrade);
    const types = Object.keys(gradeQuestions);
    const type = types[gameState.questionCount % types.length];
    
    const difficulty = getDifficulty();
    const bank = gradeQuestions[type]?.[difficulty];
    
    if (!bank || bank.length === 0) {
        // Fallback to grade 5 addition
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
        character: gameState?.character || 'normal',
        characterXP: gameState?.characterXP || 0,
        currentGrade: gameState?.currentGrade || '4'
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

// Load saved progress
window.addEventListener('load', () => {
    const saved = localStorage.getItem('mathGameProgress');
    if (saved) {
        const data = JSON.parse(saved);
        // Restore progress if desired
    }
});

