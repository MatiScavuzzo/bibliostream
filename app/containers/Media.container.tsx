'use client'
import type { Page } from "@/types";
import { useEffect, useState } from "react";

interface ContainerProps<T> {
  title: string;
  isLoading: boolean;
  error: Error | undefined;
  data: Page<T> | undefined;
  renderItem: (item: T, isActive: boolean) => JSX.Element;
  getItemId: (item: T) => number;
}

export const MediaContainer = <T,>({ title, isLoading, error, data, renderItem, getItemId }: ContainerProps<T>) => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const onMouseEnter = (id: number) => {
    setActiveId(id)
  }

  const onMouseLeave = () => {
    setActiveId(null)
  }

  return (
    <>
      <div className='flex flex-col w-full p-2'>
        <h2 className="p-2 text-lg font-extrabold text-white">{title}</h2>
        <div className="w-full text-center">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: `${error.message}`</p>}
          {data && (
            <div className='w-full h-auto overflow-x-auto min-h-48 scrollbar-hidden'>
              <ul id='container' className='grid w-full grid-flow-col gap-4 p-1 overflow-visible'>
                {data.results.map((item) => (
                  <li
                    onMouseEnter={() => onMouseEnter(getItemId(item))}
                    onMouseLeave={onMouseLeave}
                    className='relative flex-none h-auto overflow-visible sm:w-80'
                    key={getItemId(item)}>
                    {renderItem(item, activeId === getItemId(item))}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  )
}