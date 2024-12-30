// atoms/playlistDataAtom.ts
import { PlaylistDataItem } from "@/types/playlistDataTypes";
import { atom } from "recoil";



export const playlistDataState = atom<PlaylistDataItem[]>({
  key: "playlistDataStateKey",
  default: [], // Default is an empty array
});
