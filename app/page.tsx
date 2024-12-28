'use client'  

import Image from "next/image";
import { useChat } from 'ai/react';
import ChatBubble from './components/ChatBubble';
import Sidebar from "./components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <main >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Sidebar />
            </ThemeProvider>
    </main>
  );
}

