import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Chat } from "./Chat"
import { PlaylistGenerator } from "./PlaylistContainer"
import { playlistDataState } from "@/atoms/playlistDataAtom";
import { useRecoilValue } from "recoil";

export default function Sidebar() {
  const playlistData = useRecoilValue(playlistDataState);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="h-1/2">
                <Chat />
            </div>
            <div className="flex flex-row justify-center">
               {playlistData.length === 0 ? null : <PlaylistGenerator />}
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
