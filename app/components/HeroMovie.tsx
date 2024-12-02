import type { Movie, Page } from "@/tmdb/models";
import { IMAGE_URL } from "@/utilities/imageUrl";
import Image from "next/image";

interface HeroProps {
  isLoading: boolean;
  error: Error | undefined;
  data: Page<Movie> | undefined;
}


export const HeroMovie = ({ isLoading, error, data }: HeroProps) => {
  return (
    <>
      <div className='relative w-full h-full overflow-hidden text-center'>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: `${error.message}`</p>}
        {data && (
          <Image
            className="inset-0 object-cover w-full h-full"
            src={`${IMAGE_URL}w1280${data.results[0].poster_path}`}
            alt={`Image of movie ${data.results[0].original_title}`}
            width={1280}
            height={720} />
        )}
      </div>
    </>
  )
}