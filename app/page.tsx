'use client'  

import Sidebar from "./components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider"
import { RecoilRoot } from 'recoil'

export default function Home() {
  return (
    <main >
      <RecoilRoot>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            >
            <Sidebar />
        </ThemeProvider>
      </RecoilRoot>
    </main>
  );
}

