'use client'
import useSWR from 'swr';
import { MovieCard, TVCard } from './components';
import { MediaContainer } from './containers/Media.container';
import { Navbar } from './containers/Navbar.container';
import { useFetchStore } from './context/firstStore';
import type { Movie, Page, Series } from './types';

export default function Page() {
  const fetch = useFetchStore((state) => (state.fetch))
  const {
    data: popularMovies,
    error: popularMoviesError,
    isLoading: popularMoviesLoading
  } = useSWR<Page<Movie>>(fetch ? '/api/movies/popular' : null);

  const {
    data: popularTvShows,
    error: popularTvShowsError,
    isLoading: popularTvShowsLoading
  } = useSWR<Page<Series>, Error>(fetch && '/api/tv/popular');
  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center justify-start w-full'>
        <MediaContainer<Movie>
          title='Películas populares'
          isLoading={popularMoviesLoading}
          error={popularMoviesError}
          data={popularMovies}
          renderItem={(movie, isActive) => (
            <MovieCard withDetails={isActive} movie={movie} />
          )}
          getItemId={(movie) => movie.id} />
        <MediaContainer<Series>
          title='Series populares'
          isLoading={popularTvShowsLoading}
          error={popularTvShowsError}
          data={popularTvShows}
          renderItem={(serie, isActive) => (
            <TVCard withDetails={isActive} series={serie} />
          )}
          getItemId={(serie) => serie.id} />
      </div>
    </>
  )
}