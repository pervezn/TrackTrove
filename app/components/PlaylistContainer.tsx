import { playlistDataState } from "@/atoms/playlistDataAtom";
import { PlaylistDataItem } from "@/types/playlistDataTypes";
import Image from "next/image"
import { useRecoilValue } from "recoil";
import { calcPlaylistTotalLength } from "../api/spotify/helper";


export const PlaylistGenerator = () => {

     return (
        <div className="w-full justify-center">
            <PlaylistHeader />
            <TrackContainer />
        </div>
     )
}


export const PlaylistHeader = () => {
    const playlistData = useRecoilValue(playlistDataState);
    const numSongs = playlistData.length
    const totalLength = calcPlaylistTotalLength(playlistData)

    return (
        <div className="flex flex-row items-center gap-4 p-4">
            <div className="font-bold text-white text-xl">Title</div>
            <div className="flex flex-col">
                <div className="text-gray-400 text-sm">{numSongs + ' songs'}</div>
                <div className="text-gray-400 text-sm">{totalLength}</div>
            </div>
        </div>
    );
}

export const TrackContainer = () => {
    const playlistData = useRecoilValue(playlistDataState);

    return (
        <div>
            <div className="flex flex-row gap-4 p-4 text-gray-400">
                <div className="w-1/12 text-center">#</div>
                <div className="w-4/12">Title</div>
                <div className="w-2/12">Album</div>
                <div className="w-2/12 text-center">Length</div>
                <div className="w-2/12 text-center">Play</div> {/* Add a new column for the Play button */}
            </div>

            {/* Track list */}
            <div>
                {playlistData.map((track: PlaylistDataItem, i: number) => (
                    <Track key={i} track={track} trackNumber={i + 1} />
                ))}
            </div>
        </div>
    );
};

interface TrackProps {
    track: PlaylistDataItem; 
    trackNumber: number
}

export const Track = ({track, trackNumber}: TrackProps) => {
    return (
        <div className="flex flex-row gap-4 p-4 hover:bg-gray-800 rounded-lg">
            {/* Track number */}
            <div className="w-1/12 text-center text-white">{trackNumber}</div>

            {/* Track info */}
            <div className="flex items-center w-4/12">
                <Image alt="track-img" src={track.albumArt} width={40} height={40} className="rounded-sm" />
                <div className="ml-4 flex flex-col">
                    <div className="font-semibold text-white">{track.trackName}</div>
                    <div className="text-gray-400">{track.artists}</div>
                </div>
            </div>

            {/* Album name */}
            <div className="w-2/12 text-white">{track.albumName}</div>

            {/* Track length */}
            <div className="w-2/12 text-center text-gray-400">{track.duration}</div>

            {/* Play button */}
            <div className="w-2/12 text-center">
                <button className="text-white">
                    <i className="fas fa-play"></i> {/* Font Awesome Play icon */}
                </button>
            </div>
        </div>
    );
}

