'use client'
import useSWR from 'swr';
import { MovieCard, TVCard } from './components';
import { MediaContainer } from './containers/Media.container';
import { Navbar } from './containers/Navbar.container';
import { useFetchStore } from './context/firstStore';
import type { Movie, Page, TvShow } from '@models';
import { HeroMovie } from './components/HeroMovie';

export default function Page() {
  const fetch = useFetchStore((state) => (state.fetch))
  const {
    data: popularMovies,
    error: popularMoviesError,
    isLoading: popularMoviesLoading
  } = useSWR<Page<Movie>>(fetch ? '/tmdb/api/movies/popular' : null);

  const {
    data: trendingMovies,
    error: trendingMoviesError,
    isLoading: trendingMoviesLoading
  } = useSWR<Page<Movie>>(fetch ? '/tmdb/api/trending/movies' : null);

  const {
    data: popularTvShows,
    error: popularTvShowsError,
    isLoading: popularTvShowsLoading
  } = useSWR<Page<TvShow>, Error>(fetch && '/tmdb/api/tv/popular');
  return (
    <>
      <header className='flex w-full justift-center'>
        <Navbar />
      </header>
      <main className='flex flex-col h-screen gap-2'>
        <section className='w-full h-2/3'>
          <HeroMovie
            isLoading={trendingMoviesLoading}
            error={trendingMoviesError}
            data={trendingMovies} />
        </section>
        <section className='flex flex-col items-center justify-start w-full py-20'>
          <MediaContainer<Movie>
            title='Películas populares'
            isLoading={popularMoviesLoading}
            error={popularMoviesError}
            data={popularMovies}
            renderItem={(movie, isActive) => (
              <MovieCard withDetails={isActive} movie={movie} />
            )}
            getItemId={(movie) => movie.id} />
          <MediaContainer<TvShow>
            title='Series populares'
            isLoading={popularTvShowsLoading}
            error={popularTvShowsError}
            data={popularTvShows}
            renderItem={(tvShow, isActive) => (
              <TVCard withDetails={isActive} series={tvShow} />
            )}
            getItemId={(tvShow) => tvShow.id} />
        </section>
      </main>
    </>
  )
}