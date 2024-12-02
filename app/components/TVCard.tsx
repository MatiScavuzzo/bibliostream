import type { Series } from "@types";
import Image from "next/image";

const IMAGE_URL = 'https://image.tmdb.org/t/p/';

interface Props {
  series: Series;
  withDetails: boolean;
}

export const TVCard = ({ series, withDetails }: Props) => {
  return (
    <>
      <div className='relative flex flex-col w-auto hover:z-30 hover:-top-1 hover:-left-10 hover:overflow-visible hover:absolute hover:w-96 hover:h-full'>
        <div className='relative flex justify-start w-full h-auto overflow-hidden border rounded-lg border-slate-400 hover:rounded-b-none hover:border-b-0'>
          {series.backdrop_path ? (
            <Image className="object-cover w-full" src={`${IMAGE_URL}w1280${series.backdrop_path}`} alt={`Image of series ${series.original_name}`} width={300} height={300} />
          ) : (
            <div className='flex items-center justify-center w-full p-2 text-white bg-black h-44'>
              <p className='text-center'>Sorry! No image available</p>
            </div>
          )}
          <div className='absolute flex items-center w-3/4 p-2 font-extrabold text-white rounded-lg bottom-2 sm:bottom-4 bg-white/5 backdrop-blur-xs left-2'>
            <p className={`text-start text-sm`}>{series.name.toUpperCase()}</p>
          </div>
        </div>
        {withDetails && <div className='w-full text-black bg-white rounded-b-lg h-44'>hola</div>}
      </div>
    </>
  )
}
