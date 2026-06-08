// ai-helper.js - Free AI hint generator using Hugging Face (no credit card required)

export class AIHelper {
  constructor() {
    // Using Hugging Face's free inference API (no payment needed)
    this.apiUrl = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";
    this.apiKey = ""; // Get free key from huggingface.co/join (takes 2 minutes)
  }

  async getHint(question, userAnswer = null) {
    if (!this.apiKey) {
      return this.getLocalHint(question);
    }

    try {
      const prompt = `Give a very short, encouraging math hint for: ${question}. Keep it under 15 words.`;
      
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { max_new_tokens: 30, temperature: 0.7 }
        })
      });

      const data = await response.json();
      return data[0]?.generated_text?.replace(prompt, '').trim() || this.getLocalHint(question);
    } catch (error) {
      console.log("AI fallback to local hints");
      return this.getLocalHint(question);
    }
  }

  getLocalHint(question) {
    // Smart local hints based on question patterns
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('×') || lowerQuestion.includes('*')) {
      return "🔢 Multiply first, then continue step by step.";
    }
    if (lowerQuestion.includes('÷')) {
      return "➗ Division before addition or subtraction.";
    }
    if (lowerQuestion.includes('(')) {
      return "( ) Parentheses first! Always solve inside them first.";
    }
    if (lowerQuestion.includes('+') && lowerQuestion.includes('-')) {
      return "➕ Go left to right for addition/subtraction.";
    }
    return "📝 Break it down one operation at a time.";
  }
}
