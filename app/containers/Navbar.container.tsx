'use client'
import { Button } from "@/components"
import { useFetchStore } from "@/context/firstStore"
import { useEffect, useState } from "react"

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const setFetch = useFetchStore((action) => (action.setFetch))

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const showContent = () => {
    setFetch(true);
  }
  return (
    <>
      <nav className={`fixed z-50 flex items-center justify-start w-full mx-0 sm:w-[calc(100%-3rem)] sm:mx-6 gap-4 p-2 rounded-b-lg ${isScrolled ? 'bg-linear-90 from-prime-navbar/80 via-prime-navbar/65 to-prime-navbar/80 backdrop-blur-xl' : ''}`}>
        <h1 className='p-2 text-xl font-black'>Bienvenido a BiblioStream</h1>
        <Button className="p-2 font-bold text-black bg-gray-400 border border-white rounded-lg" parentMethod={showContent}>Show</Button>
      </nav>
    </>
  )
}