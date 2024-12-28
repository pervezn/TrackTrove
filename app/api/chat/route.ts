import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { buildSpotifyQuery } from "../spotify/search";


const openai = createOpenAI({
  compatibility: 'strict',
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const userInput  = await req.text();

    const prompt = `
    You are a music assistant. Given the following user input, extract details about the genre, era, artist, and mood. If not mentioned, return null for those categories.
    
    if given time spans i.e. "last 5 years" calculate a time frame using todays date i.e. today is 12/26/2024, so last five years would be 2019-2024

    Example:
    User Input: "I want a playlist of upbeat pop songs from the 80s."
    Output: {"genre": "pop", "era": "80s", "artist": null, "mood": "upbeat"}
    
    Now, analyze the following user input:
    User Input: "${userInput}"
    Output: {"genre": "", "era": "", "artist": "", "mood": ""}
    `;

    // Send the prompt to OpenAI and get the result
    const result = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt,
    });

    
    // Clean the result to remove any unwanted labels like "Output: "
    const cleanedResult = result.text.replace(/^Output:\s*/, '').trim();
    const parsedResponse = JSON.parse(cleanedResult);
    const searchQuery = buildSpotifyQuery(parsedResponse);
  
    // Append to Spotify Search API
    // const spotifyUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track`;
    // console.log(spotifyUrl);

    // Build absolute URL
    const baseUrl = req.headers.get("host"); // Get host (e.g., localhost:3000 or example.com)
    const protocol = req.headers.get("x-forwarded-proto") || "http"; // Get protocol (http/https)
    const apiUrl = `${protocol}://${baseUrl}/api/spotify/search?query=${encodeURIComponent(searchQuery)}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch Spotify search results");
    }

    const spotifyResults = await response.json();
    console.log("spotify results", spotifyResults)

    return new Response(JSON.stringify(spotifyResults), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error processing the request:", error.message);

      // Return a meaningful error response to the client
      return new Response(
        JSON.stringify({
          error: "An error occurred while processing your request. Please try again later.",
          details: error.message,
        }),
        { status: 500 }
      );
    } else {
      // Handle unexpected non-Error objects
      console.error("Unexpected error:", error);

      return new Response(
        JSON.stringify({
          error: "An unknown error occurred.",
        }),
        { status: 500 }
      );
    }
  }
}
