import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import { dark } from "@clerk/themes";
import "../globals.css";
import LeftSidebar from '@/components/shared/LeftSidebar';
import RightSidebar from '@/components/shared/RightSidebar';
import Topbar from '@/components/shared/Topbar';
import Bottombar from '@/components/shared/Bottombar';

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: 'UrbaneX',
  description: 'Connect Collab & Catalyse Positive Change',
  icons: {
    icon: '/assets/images/logo.jpeg'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={inter.className}>

      <Topbar />
        <main className='flex flex-row'>
          <LeftSidebar />
          <section className='main-container'>
            <div className='w-full max-w-4xl'>
            {children}
            </div>
          </section>
          <RightSidebar />
        </main>
        <Bottombar />

      </body>
    </html>
    </ClerkProvider>

  )
}
