import axios from "axios";

const geminiResponse = async (command,assistantName,userName) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined");
    }
    
    const apiUrl = process.env.GEMINI_API_URL || `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    const prompt = `
You are a virtual assistant named ${assistantName} created by ${userName}.
You are not Google. You will now behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond with a JSON object like this:

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" |
          "get-time" | "get-date" | "get-day" | "get-month" | "calculator-open" |
          "instagram_open" | "facebook_open" | "weather-show",
  "userInput": "<original user input>" {only remove your name from userInput if exists} 
                and agar kisi ne google ya youtube pe kuch search karne ko bola hai 
                to userInput me only bo search baala text jaye",
  "response": "<a short spoken response to read out loud to the user>"
}

Instructions:
- "type": determine the intent of the user.
- "userInput": original sentence the user spoke.
- "response": a short voice-friendly reply, e.g., "Sure, playing it now", 
  "Here's what I found", "Today is Tuesday", etc.

Type meanings:
- "general": if it's a factual or informational question.
aur agar koi aisa question puchta hai jiska answer tumhe pata hai  toh usko bhi general ki cateogry me rakho bas short answer dena .
- "google-search": if user wants to search something on Google.
- "youtube-search": if user wants to search something on YouTube.
- "youtube-play": if user wants to directly play a video or song.
- "calculator-open": if user wants to open a calculator.
- "instagram-open": if user wants to open Instagram.
- "facebook-open": if user wants to open Facebook.
- "weather-show": if user wants to know weather.
- "get-time": if user asks for current time.
- "get-date": if user asks for today's date.
- "get-day": if user asks what day it is.
- "get-month": if user asks for the current month.

Important:
- Use ${userName} agar koi puche tume kisne banaya.
- Only respond with the JSON object, nothing else.

now your userInput - ${command}
`;


    const result = await axios.post(
      apiUrl,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
      }
    );

    // ✅ Safe access with optional chaining
    const text =
      result.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini API.";

    return text;
  } catch (error) {
    console.error(
      "Gemini API Error:",
      error.response?.data || error.message
    );
    return "Error occurred while contacting Gemini API.";
  }
};

export default geminiResponse;
