import { IMAGE_URL } from "@/utilities/imageUrl";
import type { Movie, TvShow } from "@models";
import Image from "next/image";

interface Props {
  media: Movie | TvShow;
  className: string;
}

export const MediaCard = ({ media, className }: Props) => {
  const isMovie = 'title' in media;
  return (
    <>
      <li className={className}>
        <div className='flex flex-col overflow-hidden justify-start w-full group-hover:scale-125 group-hover:w-80 group-hover:absolute group-hover:z-30 group-hover:top-0 group-hover:h-fit h-full rounded-lg hover:rounded-b-none'>
          {isMovie
            ? <Image
              className="object-cover group-hover:h-full w-full"
              src={`${IMAGE_URL}w1280${media.backdrop_path}`}
              alt={`Image of movie ${media.original_title}`}
              width={300}
              height={300} />
            : <Image
              className="object-cover group-hover:h-full w-full"
              src={`${IMAGE_URL}w1280${media.backdrop_path}`}
              alt={`Image of movie ${media.original_name}`}
              width={300}
              height={300} />}
          <div
            className='absolute flex items-center w-3/4 p-2 group-hover:scale-100 font-extrabold text-white rounded-lg bottom-2 sm:bottom-4 group-hover:sm:bottom-[52%] h-8 bg-white/5 backdrop-blur-xs left-2'>
            <p
              className={`text-start text-sm`}>{isMovie ? media.title.toUpperCase() : media.name.toUpperCase()}
            </p>
          </div>
          <div className='text-black bg-white h-44 hidden group-hover:block'>hola</div>
        </div>
      </li>
    </>
  )
}

/* 
          */