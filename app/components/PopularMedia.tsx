'use client'
import { MediaContainer } from "@/containers"
import { MediaCard } from "./MediaCard"
import type { Page, Movie, TvShow } from "@/tmdb/models"
import useSWR from "swr"


export const PopularMedia = () => {

  const {
    data: popularMovies,
    error: popularMoviesError,
    isLoading: popularMoviesLoading
  } = useSWR<Page<Movie>>('/tmdb/api/movie/popular', { dedupingInterval: 1800000 });

  const {
    data: popularTVShows,
    error: popularTVShowsError,
    isLoading: popularTVShowsLoading
  } = useSWR<Page<TvShow>>('/tmdb/api/tv/popular', { dedupingInterval: 1800000 });

  return (
    <section className='flex flex-col w-full gap-2'>
      <MediaContainer<Movie>
        title='Popular movies'
        isLoading={popularMoviesLoading}
        error={popularMoviesError}
        data={popularMovies}
        children={(movie) => <MediaCard key={movie.id} className='relative flex flex-col group sm:w-80' media={movie} />}
        getItemId={(movie) => movie.id} />
      <MediaContainer<TvShow>
        title='Popular TV Shows'
        isLoading={popularTVShowsLoading}
        error={popularTVShowsError}
        data={popularTVShows}
        children={(tv) => <MediaCard key={tv.id} className="relative flex flex-col group sm:w-80" media={tv} />}
        getItemId={(tv) => tv.id} />
    </section>
  )
}
