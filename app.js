import { AIHelper } from './ai-helper.js';

// Initialize AI helper at the top of your file
const aiHelper = new AIHelper();

// Add hint button functionality (add this near your other event listeners)
document.getElementById('hint-btn')?.addEventListener('click', async () => {
  const questionText = document.getElementById('question-display')?.innerText || currentQuestion;
  const hint = await aiHelper.getHint(questionText);
  document.getElementById('hint-message').innerHTML = hint;
  // Optional: Add a visual pulse effect
  document.getElementById('hint-message').style.opacity = '0';
  setTimeout(() => document.getElementById('hint-message').style.opacity = '1', 10);
});

// Optional: Clear hint when new question loads
function loadNewQuestion() {
  document.getElementById('hint-message').innerHTML = '';
  // ... your existing question loading code ...
}
