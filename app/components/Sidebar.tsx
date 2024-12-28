import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Chat } from "./Chat"
import { PlaylistGenerator } from "./PlaylistContainer"

export default function Sidebar() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="h-1/2">
                <Chat />
            </div>
            <div className="flex flex-row justify-center">
                <PlaylistGenerator />
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
