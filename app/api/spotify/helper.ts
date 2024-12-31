import { PlaylistData, PlaylistDataItem } from "@/types/playlistDataTypes";

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

export function processSpotifyResponse(response: { tracks: { items: any[]; }; }) {
  const tracks = response.tracks.items.map(track => {
      return {
          trackName: track.name,
          artists: track.artists.map((artist: { name: any; }) => artist.name).join(', '),
          albumName: track.album.name,
          albumArt: track.album.images[0]?.url || '', // Use the largest image
          duration: formatDuration(track.duration_ms),
          spotifyLink: track.external_urls.spotify
      };
  });

  return tracks;
}

function formatDuration(durationMs: number) {
  const minutes = Math.floor(durationMs / 60000);
  const seconds =((durationMs % 60000) / 1000).toFixed(0);
  return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
}


export function calcPlaylistTotalLength(playlistData: PlaylistDataItem[]) {
  let totalMS = 0;
  
  const convertToMilliseconds = (duration: string): number => {
    const parts = duration.split(':');
    let totalSeconds = 0;

    if (parts.length === 2) {
      // Format: mm:ss
      const minutes = parseInt(parts[0], 10);
      const seconds = parseInt(parts[1], 10);
      totalSeconds = minutes * 60 + seconds;
    } else if (parts.length === 3) {
      // Format: hh:mm:ss
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      const seconds = parseInt(parts[2], 10);
      totalSeconds = hours * 3600 + minutes * 60 + seconds;
    }

    return totalSeconds * 1000; // Convert seconds to milliseconds
  };

  // Summing the durations of each track
  playlistData.forEach((track) => {
    totalMS += convertToMilliseconds(track.duration);
  });
  
  // Convert totalMS to hours, minutes, and seconds
  const totalSeconds = totalMS / 1000;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = Math.floor(totalSeconds % 60);

  // Check if total duration is more than an hour
  if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hrs ${minutes} min`;
  } else {
    return `${totalMinutes} min ${remainingSeconds} secs`;
  }
}
