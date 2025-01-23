'use client'
import type { MovieDetails, TvShowDetails } from "@/tmdb/models";
import { IMAGE_URL } from "@/utilities/imageUrl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCheck, FaX } from "react-icons/fa6";

interface HeroProps {
  isLoading: boolean;
  error: Error | undefined;
  data: MovieDetails | TvShowDetails | undefined;
  next: boolean;
  isPrime: boolean
}


export const HeroImage = ({ isLoading, error, data, next, isPrime }: HeroProps) => {
  const [overview, setOverview] = useState<boolean>(false)
  const [timeoutId, setTimeoutId] = useState<Timer | null>(null)

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setOverview(true)
  }

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setOverview(false)
    }, 2000)
    setTimeoutId(id)
  }

  useEffect(() => {
    setOverview(false)
    console.log(data?.id)
  }, [data])


  const isMovie = typeof data !== 'undefined' && 'belongs_to_collection' in data;

  return (
    <>
      <div className='relative w-full mb-1 h-full overflow-hidden text-center'>
        {next && <div className={`absolute top-0 w-full z-20 h-screen bg-prime-background ${next ? 'animate-fade' : 'opacity-0'}`}>
        </div>}
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div className={`w-full flex justify-end h-[720px]`}>
          {data && (
            <>
              <Link href={`/${isMovie ? 'movie' : 'tv'}/${data.id}`}>
                {/* Top shadow */}
                <div
                  className=
                  'w-full absolute z-10 top-0 bg-linear-180 from-prime-background/70 via-prime-background/50 via-25% to-prime-background/0 h-60'
                ></div>
                <Image
                  className="inset-0 object-cover bg-fusion w-full h-full sm:h-10/12"
                  src={`${IMAGE_URL}w1280${isMovie
                    ? data.belongs_to_collection !== null
                      ? data.belongs_to_collection.backdrop_path
                      : data.backdrop_path
                      ?? data.poster_path
                    : data.backdrop_path}`}
                  alt={`Image of ${isMovie ? 'movie' : 'TV Show'} ${isMovie ? data.original_title : data.name}`}
                  width={1280}
                  height={720} />
                {/* Bottom shadow */}
                <div
                  className=
                  'w-full absolute z-10 bottom-0 bg-linear-0 from-prime-background/100 via-prime-background/90 via-25% to-prime-background/0 h-60'
                ></div>
              </Link>
              <section
                className='absolute z-10 bottom-0 h-fit ml-12 pb-6 left-0 w-2/5 flex flex-col justify-center'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className='absolute bottom-24 w-full h-auto overflow-hidden'>
                  <Link href={`/${isMovie ? 'movie' : 'tv'}/${data.id}`}>
                    <h1 className={`text-[65px] leading-16 text-start pt-2 font-black w-fit transition-transform ${next ? 'duration-0' : 'duration-500 ease-out'} ${overview
                      ? 'opacity-100 -translate-y-2'
                      : 'opacity-100 translate-y-18'
                      }`}>{isMovie ? data.original_title : data.name}</h1>
                  </Link>
                  <h3 className={`text-md text-start text-prime-top pb-4  font-semibold w-fit transition-transform ${next ? 'duration-0' : 'duration-500 ease-out'} ${overview
                    ? 'opacity-100 -translate-y-2'
                    : 'opacity-100 translate-y-18'
                    }`}>{data.tagline}</h3>
                  <article className={`transition ${next ? 'duration-0' : 'duration-500 ease-out'} text-start text-lg overflow-hidden ${overview
                    ? 'opacity-100 line-clamp-2 -translate-y-2'
                    : 'opacity-0 line-clamp-2 translate-y-10'}`}>
                    {isMovie
                      ? data.overview
                      : data.seasons[data.seasons.length - 1].overview === ''
                        ? data.overview
                        : `${data.seasons[data.seasons.length - 1].name} ・ ${data.seasons[data.seasons.length - 1].overview}`
                    }
                  </article>
                </div>
                <div className='absolute z-20 bottom-8 w-full h-14 bg-amber-50/20'></div>
                <div className='w-full absolute bottom-0'>
                  {
                    isLoading
                      ? <p className="text-start animate-pulse flex gap-2 items-center justify-start text-md"><span className='w-4.5 h-4.5 rounded-full bg-white/20 flex items-center justify-center text-black text-xs'></span><span className="w-1/3 h-4 rounded-sm bg-white/20"></span></p>
                      : isPrime
                        ? <p className="text-start flex gap-2 items-center justify-start text-md"><span className='w-4.5 h-4.5 rounded-full bg-prime-check flex items-center justify-center text-black text-xs'><FaCheck /></span>Se incluye con Prime</p>
                        : <p className="text-start flex gap-2 items-center justify-start text-md"><span className='w-4.5 h-4.5 rounded-full bg-red-600 flex items-center justify-center text-white text-xs'><FaX /></span>No se incluye con Prime</p>
                  }
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  )
}
