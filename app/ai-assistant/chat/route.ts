// app/api/chat/route.ts
// backend code for the AI assistant using Gemini API
import { NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash-latest"; // Or "gemini-pro"

// Securely get API key from server-side environment variables
const API_KEY = process.env.GEMINI_API_KEY;

// Basic check during server startup (won't stop build if missing, but warns)
if (!API_KEY) {
  console.warn("Warning: GEMINI_API_KEY environment variable is not set. API calls will fail.");
}

// Configure safety settings (adjust as needed for healthcare context)
const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  // Consider BLOCK_LOW_AND_ABOVE for stricter filtering in healthcare
];

// The main function to handle POST requests
export async function POST(request: Request) {
  // Runtime check for the API key when a request is actually made
  if (!API_KEY) {
    console.error("API Route Error: GEMINI_API_KEY is missing.");
    return NextResponse.json(
      { error: "Server configuration error: API key not available." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    // Ensure messages array exists and is valid
    const messages = body.messages;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: 'messages' array is required." },
        { status: 400 }
      );
    }

    // Initialize the Gemini client
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME, safetySettings });

    // Prepare history for the Gemini API (all messages except the last one)
    let historyForApi = messages.slice(0, -1); // Get all messages intended for history

    // --- FIX: Ensure history doesn't start with 'bot'/'model' ---
    // If the prepared history is not empty AND its first message is from the bot,
    // remove that first message. This handles the initial "Hello" from the bot.
    if (historyForApi.length > 0 && historyForApi[0].role === 'bot') {
        historyForApi = historyForApi.slice(1);
    }
    // --- END FIX ---

    // Now, map the potentially adjusted history to the Gemini API format
    const history = historyForApi.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'bot' ? 'model' : 'user', // Map 'bot' to 'model'
      parts: [{ text: msg.content }],
    }));

    // Get the latest user message
    const userMessage = messages[messages.length - 1];
    if (userMessage.role !== 'user') {
        return NextResponse.json(
            { error: "Invalid chat sequence: Last message must be from the user." },
            { status: 400 }
        );
    }

    // Start a chat session with the history
    const chat = model.startChat({
        history: history,
        generationConfig: {
          maxOutputTokens: 800, // Adjust token limit as needed
        },
    });

    // ** Crucial: Add a system instruction/persona **
    // This guides the AI's behavior and sets limitations.
    const systemInstruction = `You are an AI Health Assistant.
      Your purpose is to provide general health information and answer health-related questions in a supportive and informative way.
      **You MUST NOT provide medical diagnoses, treatment plans, or specific medical advice.**
      **Always strongly advise users to consult a qualified healthcare professional (like a doctor or specialist) for any personal medical concerns, diagnosis, or treatment.**
      Be empathetic, clear, concise, and maintain a helpful, neutral tone.
      Do not claim to be a healthcare professional.
      If asked for a diagnosis or specific treatment, politely decline and reiterate the need to consult a professional.`;

    // Combine the instruction with the actual user query
    const prompt = `${systemInstruction}\n\nUser query: ${userMessage.content}`;

    // Send the user's latest message (with instructions) to the chat
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const botReply = response.text();

    // Send the AI's reply back to the frontend
    return NextResponse.json({ reply: botReply });

  } catch (error) {
    console.error("Error in /api/chat route:", error);
    // Provide a generic error message to the client
    return NextResponse.json(
      // Check if it's a specific API error or a general one
      { error: error instanceof Error ? `API Error: ${error.message}` : "An internal server error occurred." },
      { status: 500 }
    );
  }
}