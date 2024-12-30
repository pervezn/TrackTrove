export interface PlaylistDataItem {
    trackName: string;
    artists: string;
    albumName: string;
    albumArt: string;
    duration: string;
    spotifyLink: string;
}

export interface PlaylistData {
    data: PlaylistDataItem[];
}
