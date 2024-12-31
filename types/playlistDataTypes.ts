export interface PlaylistDataItem {
    trackName: string;
    artists: string;
    albumName: string;
    albumArt: string;
    duration: string;
    spotifyLink: string;
    id: string;
}

export interface PlaylistData {
    tracks: PlaylistDataItem[];
}
