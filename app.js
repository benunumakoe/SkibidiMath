// Add this at the VERY TOP of your app.js file
import { AIHelper } from './ai-helper.js';

// Add this after your other variable declarations
const aiHelper = new AIHelper();

// Find or create your hint button functionality
// If you have a hint button with id="hint-btn", add this:
document.getElementById('hint-btn')?.addEventListener('click', async () => {
  // Get the current question text from wherever you store it
  const questionElement = document.getElementById('question-display') || document.querySelector('.question');
  const questionText = questionElement?.innerText || "What is 35 ÷ 7?";
  
  // Show "loading" hint
  const hintElement = document.getElementById('hint-message');
  if (hintElement) {
    hintElement.innerHTML = "🤔 Thinking...";
    const hint = await aiHelper.getHint(questionText);
    hintElement.innerHTML = hint;
  }
});
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
