'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const paths = [
    { name: 'Inicio', path: '/' },
    { name: 'Películas', path: '/movie' },
    { name: 'Series', path: '/tv' },
  ]

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

  return (
    <>
      <nav
        className={`fixed z-50 flex items-center justify-start w-full h-16 mx-0 sm:w-[calc(100%-3rem)] sm:mx-6 gap-8 px-2 rounded-b-lg ${isScrolled
          ? 'bg-linear-90 from-prime-navbar/80 via-prime-navbar/65 to-prime-navbar/80 backdrop-blur-xl'
          : ''}`}>
        <h1 className='p-2 text-md font-bold'>biblio stream</h1>
        <ul className='flex h-full list-none items-center justify-around gap-3'>
          {paths.map((path, index) => (
            <li key={index} className="h-full flex items-center justify-center cursor-pointer">
              <Link
                className={`relative group overflow-hidden rounded-lg ${pathname === path.path ?
                  'bg-white/5 shadow-[0_-5px_15px_5px_rgba(255,255,255,0.4)] shadow-white/10'
                  : ''}`}
                href={path.path}>
                <div
                  className={`hover:bg-white text-white py-2 px-3 group-hover:text-black text-sm font-medium flex items-center justify-center ${pathname === path.path
                    ? 'relative overflow-hidden bg-white/20 backdrop-blur-lg'
                    : ''}`}
                >
                  <div className={pathname === path.path ? 'absolute -top-3.5 left-0 bg-radial-[at_50%_40%] w-full from-white to-transparent h-7 blur-xs rounded-full' : ''}></div>
                  <span>{path.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}