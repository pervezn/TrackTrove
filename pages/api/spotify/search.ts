export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  console.log("SPOTIFY_CLIENT_ID:", process.env.SPOTIFY_CLIENT_ID);
  console.log("SPOTIFY_CLIENT_SECRET:", process.env.SPOTIFY_CLIENT_SECRET);
  
  try {
    // Step 1: Get Client Access Token
    const tokenUrl = "https://accounts.spotify.com/api/token";
    const body = new URLSearchParams({ grant_type: "client_credentials" });

    console.log("Fetching client access token...");

    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!tokenResponse.ok) {
      const errorBody = await tokenResponse.text();
      console.error("Token API Error:", tokenResponse.status, errorBody);
      throw new Error("Failed to fetch client access token");
    }

    const { access_token } = await tokenResponse.json();
    console.log("Access token fetched successfully");

    // Step 2: Use Token to Search Tracks
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`;
    const searchResponse = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!searchResponse.ok) {
      const errorBody = await searchResponse.text();
      console.error("Search API Error:", searchResponse.status, errorBody);
      throw new Error("Failed to search tracks");
    }

    const searchResults = await searchResponse.json();

    // Return search results to the client
    return res.status(200).json(searchResults);

  } catch (error) {
    console.error("Error in Spotify Search:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
