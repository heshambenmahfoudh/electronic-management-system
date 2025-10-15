'use client'
import { ReactNode } from 'react'
import { useStateContext } from '@/contexts/ContextProvider'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Navbar'

export default function Layout({ children }: { children: ReactNode }) {
  const { activeMenu } = useStateContext()


  return (
    <div className="flex">
      {activeMenu && (
        <div
          className="
          shrink-0
         bg-white
         text-black 
         shadow-lg
         h-screen 
         overflow-scroll
         sidebar z-50 md:z-0
         fixed top-0 left-0 md:relative"
        >
          <Sidebar />
        </div>
      )}

      <main className={activeMenu === true ? 'content   ' : ' min-w-full'}>
        <Header />
        {children}
      </main>
    </div>
  )
}
