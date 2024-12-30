import { playlistDataState } from "@/atoms/playlistDataAtom";
import { PlaylistData, PlaylistDataItem } from "@/types/playlistDataTypes";
import { Key } from "lucide-react";
import Image from "next/image"
import { useEffect } from "react"
import { RecoilState } from "recoil";

const tracklist = [1,2,3,4,5,6,7]



export const PlaylistGenerator = () => {

     return (
        <div className="w-full justify-center">
            <PlaylistHeader />
            <TrackContainer />
        </div>
     )
}


export const PlaylistHeader = () => {

    return (
        <div className="flex flex-row items-center gap-4 p-4">
            <div className="font-bold text-white text-xl">Title</div>
            <div className="flex flex-col">
                <div className="text-gray-400 text-sm">7 songs</div>
                <div className="text-gray-400 text-sm">29 min 43 sec</div>
            </div>
        </div>
    );
}

export const TrackContainer = () => {
    // const playlistData = useRecoilValue(playlistDataState)

    return (
        <div>
            <div className="flex flex-row gap-4 p-4 text-gray-400">
                <div className="w-1/12 text-center">#</div>
                <div className="w-4/12">Title</div>
                <div className="w-2/12">Album</div>
                <div className="w-2/12 text-center">Date Added</div>
                <div className="w-2/12 text-center">Length</div>
            </div>

            {/* Track list */}
            <div>
                {/* {playlistData.map(( track: PlaylistDataItem) => (
                    <Track key={track.spotifyLink} track={track} />
                ))} */}
                {tracklist.map((track) => <Track key={track} />)}
            </div>
        </div>
    );
};

interface TrackProps {
    track: PlaylistDataItem; // Accepts a track of type PlaylistDataItem
}

export const Track = () => {
    return (
        <div className="flex flex-row gap-4 p-4 hover:bg-gray-800 rounded-lg">
            {/* Track number */}
            <div className="w-1/12 text-center text-white">1</div>

            {/* Track info */}
            <div className="flex items-center w-4/12">
                <Image alt="track-img" src="" width={40} height={40} className="rounded-full" />
                <div className="ml-4 flex flex-col">
                    {/* <div className="font-semibold text-white">{track.trackName}</div> */}
                    {/* <div className="text-gray-400">{track.artists}</div> */}
                </div>
            </div>

            {/* Album name */}
            {/* <div className="w-2/12 text-white">{track.albumName}</div> */}

            {/* Date added */}
            <div className="w-2/12 text-center text-gray-400">May 5, 2024</div>

            {/* Track length */}
            {/* <div className="w-2/12 text-center text-gray-400">{track.duration}</div> */}
        </div>
    );
}
function useRecoilValue(playlistDataState: RecoilState<never[]>) {
    throw new Error("Function not implemented.");
}

