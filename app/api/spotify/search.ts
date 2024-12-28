
export function buildSpotifyQuery({ genre, era, artist, mood } : {genre: string, era: string, artist: string, mood:string}) {
    let queryParts = [];
  
    // Add genre if present
    if (genre) {
      queryParts.push(`genre:${genre}`);
    }
  
    // Add year range if era is specified
    if (era) {
      let startYear, endYear;
    
      // Check if the input is a date range (e.g., "2019-2024")
      const dateRangeMatch = era.match(/^(\d{4})-(\d{4})$/);
      if (dateRangeMatch) {
        startYear = dateRangeMatch[1]; // Extract the start year (e.g., "2019")
        endYear = dateRangeMatch[2];   // Extract the end year (e.g., "2024")
      } else {
        // Assume it's a decade (e.g., "80s")
        const decadeMatch = era.match(/\d{2}/);
        if (decadeMatch) {
          startYear = `19${decadeMatch[0]}`; // Form the start year (e.g., "1980")
          endYear = `${parseInt(startYear) + 9}`; // Calculate the end year (e.g., "1989")
        }
      }
    
      // If both startYear and endYear are valid, add the range to the query
      if (startYear && endYear) {
        queryParts.push(`year:${startYear}-${endYear}`);
      }
    }
    
  
    // Add artist if present
    if (artist && artist !== "null") {
      queryParts.push(`artist:"${artist}"`);
    }
  
    // Optionally add mood as a free-text term
    if (mood && mood !== "null") {
      queryParts.push(mood);
    }
  
    // Combine all parts into a single query string
    const query = queryParts.join(" ");
    return query;
}
  
//   // Example Usage
//   const userInputData = {
//     genre: "bollywood",
//     era: "80s",
//     artist: "kishore kumar",
//     mood: "chill",
//   };
  
//   const searchQuery = buildSpotifyQuery(userInputData);
//   console.log(searchQuery); // Output: "genre:bollywood year:1980-1989 artist:"kishore kumar" chill"
  
//   // Append to Spotify Search API
//   const spotifyUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track`;
//   console.log(spotifyUrl);

  