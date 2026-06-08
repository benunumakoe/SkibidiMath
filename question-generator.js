// question-generator.js - Generates unlimited unique math problems

const OPERATIONS = ['+', '-', '×', '÷'];
const DIFFICULTY = {
  easy: { maxNumber: 20, useParens: false, operations: ['+', '-'] },
  medium: { maxNumber: 50, useParens: true, operations: ['+', '-', '×', '÷'] },
  hard: { maxNumber: 100, useParens: true, operations: ['+', '-', '×', '÷'] }
};

export function generateQuestion(level = 1) {
  let difficulty = 'easy';
  if (level >= 5 && level < 10) difficulty = 'medium';
  if (level >= 10) difficulty = 'hard';
  
  const config = DIFFICULTY[difficulty];
  let question = '';
  let answer = null;
  
  if (config.useParens && Math.random() > 0.5) {
    // Generate with parentheses: (a + b) × c
    const a = Math.floor(Math.random() * config.maxNumber) + 1;
    const b = Math.floor(Math.random() * config.maxNumber) + 1;
    const op1 = config.operations[Math.floor(Math.random() * config.operations.length)];
    const innerValue = evaluateSimple(a, b, op1);
    
    const c = Math.floor(Math.random() * config.maxNumber) + 1;
    const op2 = config.operations[Math.floor(Math.random() * config.operations.length)];
    
    question = `(${a} ${op1} ${b}) ${op2} ${c}`;
    answer = evaluateSimple(innerValue, c, op2);
  } else {
    // Simple expression: a + b
    const a = Math.floor(Math.random() * config.maxNumber) + 1;
    const b = Math.floor(Math.random() * config.maxNumber) + 1;
    const op = config.operations[Math.floor(Math.random() * config.operations.length)];
    question = `${a} ${op} ${b}`;
    answer = evaluateSimple(a, b, op);
  }
  
  return { question, answer, difficulty };
}

function evaluateSimple(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '×': return a * b;
    case '÷': return a / b;
    default: return a + b;
  }
}
