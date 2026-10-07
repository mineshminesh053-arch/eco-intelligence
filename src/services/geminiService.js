const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// Fast, reliable Gemini Flash models prioritized for instant replies
const GEMINI_MODELS = [
  'gemini-2.5-flash', 
  'gemini-2.0-flash', 
  'gemini-1.5-flash', 
  'gemini-flash-lite-latest', 
  'gemini-flash-latest',
  'gemini-3.5-flash'
];

const SYSTEM_PROMPT = `You are ECO - INTELLIGENCE, an ultra-fast, highly efficient, gentle, and professional AI assistant for Waste Management & Sustainability! 🌿⚡

RESPONSE FORMAT INSTRUCTIONS (STRICT RULE):
1. **POINT-BY-POINT FORMAT ONLY**: Always structure your answers using bullet points (•) or numbered steps (1. 2. 3.).
2. **NO CONVERSATIONAL FLUFF**: Skip long introductions or repetitive greetings. Get STRAIGHT to the bulleted answer immediately!
3. **IMAGE & DIAGRAM REQUESTS**: If asked for an image, photo, diagram, process flow, or visual format, enthusiastically confirm the visual image diagram is generated below, and summarize the key step-by-step process in clean bullet points!
4. **FAST & CONCISE**: Keep every point short, clear, punchy, and actionable (1-2 sentences per bullet max).
5. **KEY VISUAL & EMOJI HIGHLIGHTS**: Use bold key terms and 1 emoji per bullet for high readability.

CORE WASTE MANAGEMENT DIRECTIVES:
• **E-Waste**: Tape battery terminals, separate cables/laptops, drop at Red Bins/EPR centers.
• **Wet/Organic**: Green Bin for food scraps, 30-day home composting & biogas.
• **Dry Recyclables**: Blue Bin for clean PET plastic, paper, cardboard, and metals.
• **Hazardous**: Yellow Bin for sealed paints, chemicals, pesticides, and CFL bulbs.
• **Creators/Developers**: Minesh S, Abhinivesh R A, Devadarshan K.`;

export const sendToGemini = async (userMessage, conversationHistory = []) => {
  // Check if message is directly asking for creators / developers / CEO / mastermind
  const lowerMsg = userMessage.toLowerCase();
  const isCreatorQuestion = 
    (lowerMsg.includes('who') && (
      lowerMsg.includes('creat') || 
      lowerMsg.includes('develop') || 
      lowerMsg.includes('invert') || 
      lowerMsg.includes('invent') || 
      lowerMsg.includes('made') || 
      lowerMsg.includes('build') || 
      lowerMsg.includes('built') || 
      lowerMsg.includes('ceo') || 
      lowerMsg.includes('owner') || 
      lowerMsg.includes('mastermind') || 
      lowerMsg.includes('founder') || 
      lowerMsg.includes('author') ||
      lowerMsg.includes('behind this')
    )) ||
    lowerMsg.includes('who is the ceo') ||
    lowerMsg.includes('who is the owner') ||
    lowerMsg.includes('who is the mastermind') ||
    lowerMsg.includes('who developed');

  if (isCreatorQuestion) {
    return `🌟 **Platform Creators & Developers:**

• **MINESH S** — Lead Developer & Architect
• **ABHINIVESH R A** — Core Systems Engineer
• **DEVADARSHAN K** — Sustainability & UI Designer

Built to revolutionize waste management and build a cleaner, greener world! 🌍✨`;
  }

  // Try each model in sequence for maximum speed & reliability
  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

      const contents = [];
      const recentHistory = conversationHistory.slice(-4);
      for (const msg of recentHistory) {
        if (msg.text) {
          contents.push({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });

      const requestBody = {
        contents: contents,
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        generationConfig: {
          temperature: 0.3,
          topP: 0.8,
          maxOutputTokens: 512,
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
          return data.candidates[0].content.parts[0].text;
        }
      }
    } catch (err) {
      console.warn(`Gemini model ${model} attempt error:`, err);
    }
  }

  // Fast point-by-point fallback
  return `🌿 **ECO - INTELLIGENCE Quick Guide:**

• **E-Waste Drop-off**: Tape terminals & bring phones/batteries to Red E-Waste containers.
• **Household Composting**: Put food scraps in Green Organic Bin for 30-day fertilizer.
• **Dry Recycling**: Clean & flatten plastic/paper into Blue Bins.
• **Report Garbage**: Click "Report Waste" in navigation to alert municipal teams!`;
};


