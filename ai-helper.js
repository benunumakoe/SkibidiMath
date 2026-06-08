// ai-helper.js - Place this file in the SAME folder as your index.html

export class AIHelper {
  constructor() {
    // 🔐 PASTE YOUR NEW HUGGING FACE TOKEN HERE (inside the quotes)
    this.apiKey = "hf_YOUR_NEW_TOKEN_HERE";  // <------ PUT YOUR TOKEN HERE
    
    // Using Mistral model (good for math hints)
    this.apiUrl = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";
  }

  // Get a hint for any math question
  async getHint(question, userAnswer = null) {
    if (!this.apiKey || this.apiKey === "hf_YOUR_NEW_TOKEN_HERE") {
      console.log("No valid API key, using local hints");
      return this.getLocalHint(question);
    }

    try {
      const prompt = `Give a very short, encouraging math hint for: "${question}". Keep under 15 words. Be helpful but not giving the answer directly.`;
      
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { 
            max_new_tokens: 40, 
            temperature: 0.7,
            return_full_text: false
          }
        })
      });

      if (!response.ok) {
        console.log("API error, using local hint");
        return this.getLocalHint(question);
      }

      const data = await response.json();
      const hint = data[0]?.generated_text?.trim();
      return hint || this.getLocalHint(question);
      
    } catch (error) {
      console.log("Network error, using local hint");
      return this.getLocalHint(question);
    }
  }

  getLocalHint(question) {
    // Smart local hints based on question patterns
    const q = question.toLowerCase();
    if (q.includes('×') || q.includes('*')) {
      return "🔢 Multiply first, then continue step by step.";
    }
    if (q.includes('÷')) {
      return "➗ Division before addition or subtraction.";
    }
    if (q.includes('(')) {
      return "( ) Parentheses first! Always solve inside them first.";
    }
    if ((q.includes('+') && q.includes('-')) && !q.includes('×') && !q.includes('÷')) {
      return "➕ Go left to right for addition and subtraction.";
    }
    if (q.includes('+')) {
      return "➕ Add these numbers carefully.";
    }
    if (q.includes('-')) {
      return "➖ Subtract carefully. Check your work!";
    }
    return "📝 Break it down one operation at a time.";
  }
}
