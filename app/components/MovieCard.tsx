import type { Movie } from "@types";
import Image from "next/image";

const IMAGE_URL = 'https://image.tmdb.org/t/p/';

interface Props {
  movie: Movie;
  withDetails: boolean;
}

export const MovieCard = ({ movie, withDetails }: Props) => {
  return (
    <>
      <div className='flex flex-col w-auto group hover:z-40 hover:-top-1 hover:-left-10 hover:overflow-visible hover:absolute hover:w-96'>
        <div className='relative flex flex-col justify-start w-full h-full overflow-hidden rounded-lg hover:rounded-b-none'>
          <Image
            className="object-cover w-full"
            src={`${IMAGE_URL}w1280${movie.backdrop_path}`}
            alt={`Image of movie ${movie.original_title}`}
            width={300}
            height={300} />
          <div
            className='absolute flex items-center w-3/4 p-2 font-extrabold text-white rounded-lg bottom-2 sm:bottom-4 bg-white/5 backdrop-blur-sm left-2'>
            <p
              className={`text-start text-sm`}>{movie.title.toUpperCase()}
            </p>
          </div>
          {withDetails && <div className='absolute z-50 w-full text-black transition-opacity duration-300 bg-white rounded-b-lg opacity-0 -bottom-44 h-44 group-hover:opacity-100'>hola</div>}
        </div>
      </div>
    </>
  )
}
