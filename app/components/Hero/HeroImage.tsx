import type { MovieDetails, TvShowDetails } from "@/tmdb/models";
import { IMAGE_URL } from "@/utilities/imageUrl";
import Image from "next/image";

interface HeroProps {
  isLoading: boolean;
  error: Error | undefined;
  data: MovieDetails | TvShowDetails | undefined;
  next: boolean;
}


export const HeroImage = ({ isLoading, error, data, next }: HeroProps) => {
  console.log(data)
  const isMovie = typeof data !== 'undefined' && 'belongs_to_collection' in data;
  return (
    <>
      <div className='relative w-full mb-1 h-full overflow-hidden text-center'>
        {next && <div className={`absolute top-0 w-full z-0 h-screen bg-black ${next ? 'animate-fade' : 'opacity-0'}`}>
        </div>}
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div className={`w-full h-[720px]`}>
          {data && (
            <Image
              className="inset-0 object-cover w-full h-full sm:h-10/12"
              src={`${IMAGE_URL}w1280${isMovie
                ? data.belongs_to_collection !== null
                  ? data.belongs_to_collection.backdrop_path
                  : data.backdrop_path
                  ?? data.poster_path
                : data.backdrop_path}`}
              alt={`Image of ${isMovie ? 'movie' : 'TV Show'} ${isMovie ? data.original_title : data.name}`}
              width={1280}
              height={720} />
          )}
        </div>
      </div>
    </>
  )
}