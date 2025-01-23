'use client'
import useSWR from "swr";
import { HeroImage } from "./HeroImage"
import {
  type WatchProviders,
  type MediaType,
  type Movie,
  type MovieDetails,
  type MovieWithMediaType,
  type Page,
  type TvShow,
  type TvShowDetails,
  type TvShowWithMediaType,
  type FlatRate,
  type Buy
} from "@models";
import { useCallback, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { HeroPagination } from "./HeroPagination";
import { isEmptyObject } from "@/helpers/isEmptyObject";

interface HeroProps {
  media: 'all' | 'movie' | 'tv';
}

export const Hero = ({ media }: HeroProps) => {
  /* States */
  const [hero, setHero] = useState<boolean>(false)
  const [isNext, setIsNext] = useState<boolean>(false)
  const [mediaId, setMediaId] = useState<number | undefined>(undefined)
  const [tvShowId, setTvShowId] = useState<number | undefined>(undefined)
  const [tvShowResults, setTvShowResults] = useState<TvShow[] | undefined>(undefined)
  const [trendingPage, setTrendingPage] = useState<number>(1)
  const [automaticNext, setAutomaticNext] = useState<boolean>(false)
  const [moviePage, setMoviePage] = useState<number>(1)
  const [tvShowPage, setTvShowPage] = useState<number>(1)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [mediaType, setMediaType] = useState<MediaType>('movie')
  const [isPrime, setIsPrime] = useState<boolean>(false)
  /* End of states */

  /* Api calls */
  const {
    data: trendingMedia,
    error: trendingMediaError,
    isLoading: trendingMediaLoading
  } = useSWR<Page<MovieWithMediaType | TvShowWithMediaType>>(media === 'all'
    && `/tmdb/api/trending/all?page=${trendingPage}`
    , { dedupingInterval: 1800000 });

  const {
    data: movieMedia,
    error: movieMediaError,
    isLoading: movieMediaLoading
  } = useSWR<Page<Movie>>(media === 'movie'
    && `/tmdb/api/movie/popular?page=${moviePage}`
    , { dedupingInterval: 1800000 });

  const {
    data: tvShowMedia,
    error: tvShowMediaError,
    isLoading: tvShowMediaLoading
  } = useSWR<Page<TvShow>>(media === 'tv'
    && `/tmdb/api/tv/popular?page=${tvShowPage}`
    , { dedupingInterval: 1800000 });

  const {
    data: heroMediaMovie,
    error: heroMediaMovieError,
    isLoading: heroMediaMovieLoading
  } = useSWR<MovieDetails>(
    mediaType === 'movie'
      &&
      hero
      &&
      mediaId !== undefined
      ? `/tmdb/api/movie/${mediaId}`
      : null, { dedupingInterval: 3600000 })

  const {
    data: heroMediaTvShow,
    error: heroMediaTvShowError,
    isLoading: heroMediaTvShowLoading
  } = useSWR<TvShowDetails>(
    mediaType === 'tv'
      &&
      hero
      &&
      tvShowId !== undefined
      ? `/tmdb/api/tv/${tvShowId}`
      : null, { dedupingInterval: 3600000 })

  const {
    data: heroMediaMovieProviders,
    error: heroMediaMovieProvidersError,
    isLoading: heroMediaMovieProvidersLoading
  } = useSWR<WatchProviders>(
    mediaType === 'movie'
      && hero
      && mediaId !== undefined
      ? `/tmdb/api/movie/${mediaId}/providers`
      : null, { dedupingInterval: 3600000 }
  )

  const {
    data: heroMediaTvProviders,
    error: heroMediaTvProvidersError,
    isLoading: heroMediaTvProvidersLoading
  } = useSWR<WatchProviders>(
    mediaType === 'tv'
      && hero
      && tvShowId !== undefined
      ? `/tmdb/api/tv/${tvShowId}/providers`
      : null, { dedupingInterval: 3600000 }
  )

  const specificError =
    trendingMediaError
    || movieMediaError
    || tvShowMediaError
    || heroMediaMovieError
    || heroMediaTvShowError
    || heroMediaMovieProvidersError
    || heroMediaTvProvidersError
  const specificLoading =
    trendingMediaLoading
    || movieMediaLoading
    || tvShowMediaLoading
    || heroMediaMovieLoading
    || heroMediaTvShowLoading
    || heroMediaMovieProvidersLoading
    || heroMediaTvProvidersLoading

  /* End of Api calls */

  /* Functions */
  const handleNextHeroImage = useCallback(() => {
    if (trendingMedia) {
      if (currentIndex === 0 || currentIndex < 9) {
        if (trendingMedia.results[currentIndex + 1].media_type === 'movie') {
          setMediaType('movie')
          setMediaId(trendingMedia.results[currentIndex + 1].id)
        } else {
          setMediaType('tv')
          setTvShowId(trendingMedia.results[currentIndex + 1].id)
        }
        setCurrentIndex(currentIndex + 1)
      } else {
        if (trendingMedia.results[0].media_type === 'movie') {
          setMediaType('movie')
          setMediaId(trendingMedia.results[0].id)
        } else {
          setMediaType('tv')
          setTvShowId(trendingMedia.results[0].id)
        }
        setAutomaticNext(false)
        setCurrentIndex(0)
      }
    } else if (movieMedia) {
      if (currentIndex === 0 || currentIndex < 9) {
        setMediaId(movieMedia.results[currentIndex + 1].id)
        setCurrentIndex(currentIndex + 1)
      } else {
        setMediaId(movieMedia.results[0].id)
        setAutomaticNext(false)
        setCurrentIndex(0)
      }
    } else if (tvShowResults) {
      if (currentIndex === 0 || currentIndex < 9) {
        setTvShowId(tvShowResults[currentIndex + 1].id)
        setCurrentIndex(currentIndex + 1)
      } else {
        setTvShowId(tvShowResults[0].id)
        setAutomaticNext(false)
        setCurrentIndex(0)
      }
    }
    setIsNext(true)
  }, [currentIndex, trendingMedia, movieMedia, tvShowResults])

  const handlePreviousHeroImage = () => {
    if (trendingMedia) {
      if (currentIndex === 9 || currentIndex > 0) {
        if (trendingMedia.results[currentIndex - 1].media_type === 'movie') {
          setMediaType('movie')
          setMediaId(trendingMedia.results[currentIndex - 1].id)
        } else {
          setMediaType('tv')
          setTvShowId(trendingMedia.results[currentIndex - 1].id)
        }
        setCurrentIndex(currentIndex - 1)
      } else {
        if (trendingMedia.results[9].media_type === 'movie') {
          setMediaType('movie')
          setMediaId(trendingMedia.results[9].id)
        } else {
          setMediaType('tv')
          setTvShowId(trendingMedia.results[9].id)
        }
        setCurrentIndex(9)
      }
    } else if (movieMedia) {
      if (currentIndex === 9 || currentIndex > 0) {
        setMediaId(movieMedia.results[currentIndex - 1].id)
        setCurrentIndex(currentIndex - 1)
      } else {
        setMediaId(movieMedia.results[9].id)
        setCurrentIndex(9)
      }
    } else if (tvShowResults) {
      if (currentIndex === 9 || currentIndex > 0) {
        setTvShowId(tvShowResults[currentIndex - 1].id)
        setCurrentIndex(currentIndex - 1)
      } else {
        setTvShowId(tvShowResults[9].id)
        setCurrentIndex(9)
      }
    }
    setIsNext(true)
  }
  /* End of functions */

  /* Effects */
  useEffect(() => {
    if (tvShowMedia && media === 'tv') {
      const highVotedResults = tvShowMedia.results.filter((tvShow) => tvShow.vote_count > 500)
      if (!tvShowResults) {
        setTvShowResults(highVotedResults)
        if (highVotedResults.length < 10) {
          setTvShowPage(tvShowPage + 1);
        }
      } else {
        const uniqueResults = highVotedResults.filter(
          (tvShow) => !tvShowResults.some((result) => result.id === tvShow.id)
        )
        const updatedResults = [...tvShowResults, ...uniqueResults]
        setTvShowResults(updatedResults)

        if (updatedResults.length < 10) {
          setTvShowPage(tvShowPage + 1)
        }
      }
    }
  }, [tvShowMedia])


  useEffect(() => {
    if (media === 'movie' && movieMedia) {
      setMediaType('movie')
      setMediaId(movieMedia.results[0].id)
    } else if (media === 'tv' && tvShowResults) {
      setMediaType('tv')
      setTvShowId(tvShowResults[0].id)
    } else if (media === 'all' && trendingMedia) {
      if (trendingMedia.results[0].media_type === 'movie') {
        setMediaType('movie')
        setMediaId(trendingMedia.results[0].id)
      } else {
        setMediaType('tv')
        setTvShowId(trendingMedia.results[0].id)
      }
    }
    setCurrentIndex(0)
    setHero(true)
  }, [movieMedia, tvShowResults, media, trendingMedia])

  useEffect(() => {
    setAutomaticNext(true)
  }, [])

  useEffect(() => {
    if (automaticNext) {
      const interval = setInterval(() => {
        handleNextHeroImage();
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [handleNextHeroImage])

  useEffect(() => {
    if (isNext) {
      const timeoutId = setTimeout(() => {
        setIsNext(false)
      }, 500)
      return () => clearTimeout(timeoutId)
    }
  }, [isNext])

  useEffect(() => {
    if (heroMediaMovieProviders) {
      const providers = isEmptyObject(heroMediaMovieProviders.results)
      const buyProviders = !providers && heroMediaMovieProviders.results.US.buy
      const flatRateProviders = !providers && heroMediaMovieProviders.results.US.flatrate
      if (providers) {
        setIsPrime(false)
      } else if (buyProviders && buyProviders.length > 0) {
        const isPrime = buyProviders.some((provider: Buy) => provider.provider_id === 10)
        setIsPrime(isPrime)
      } else if (flatRateProviders && flatRateProviders.length > 0) {
        const isPrime = flatRateProviders.some((provider: FlatRate) => provider.provider_id === 10)
        setIsPrime(isPrime)
      } else {
        setIsPrime(false)
      }
    } else if (heroMediaTvProviders) {
      const providers = isEmptyObject(heroMediaTvProviders.results)
      const buyProviders = !providers && heroMediaTvProviders.results.US.buy
      const flatRateProviders = !providers && heroMediaTvProviders.results.US.flatrate
      if (providers) {
        setIsPrime(false)
      } else if (buyProviders && buyProviders.length > 0) {
        const isPrime = buyProviders.some((provider: Buy) => provider.provider_id === 10)
        setIsPrime(isPrime)
      } else if (flatRateProviders && flatRateProviders.length > 0) {
        const isPrime = flatRateProviders.some((provider: FlatRate) => provider.provider_id === 10)
        setIsPrime(isPrime)
      } else {
        setIsPrime(false)
      }
    }
  }, [heroMediaMovieProviders, heroMediaTvProviders])
  /* End of effects */

  return (
    <section className='group relative w-full h-5/6'>
      <HeroImage
        isLoading={specificLoading}
        error={specificError}
        data={heroMediaMovie || heroMediaTvShow}
        next={isNext}
        isPrime={isPrime} />
      <div className='opacity-0 z-20 transition-opacity duration-300 ease-in-out absolute top-1/2 left-0 w-auto group-hover:opacity-100 flex items-center justify-between p-4'>
        <button onClick={handlePreviousHeroImage} className='text-white text-3xl transition-transform duration-200 ease-in-out hover:scale-125'><FaChevronLeft /></button>
      </div>
      <div className='opacity-0 z-20 transition-opacity duration-300 ease-in-out absolute top-1/2 right-0 w-auto group-hover:opacity-100 flex items-center justify-between p-4'>
        <button onClick={handleNextHeroImage} className='text-white text-3xl transition-transform duration-200 ease-in-out hover:scale-125'><FaChevronRight /></button>
      </div>
      {mediaId !== undefined || tvShowId !== undefined
        ? <HeroPagination currentIndex={currentIndex} totalItems={10} />
        : null}
    </section>
  )
}