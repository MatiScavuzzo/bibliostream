import { Hero } from "@components";

export default function Home() {
  return (
    <main className='flex flex-col h-screen gap-2'>
      <Hero media='all' />
    </main>
  )
}

{/* <section className='flex flex-col items-center justify-start w-full py-4'>
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
        </section> */}