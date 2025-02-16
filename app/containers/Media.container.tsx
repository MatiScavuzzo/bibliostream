'use client'
import type { Page } from "@models";
import { type ReactNode } from "react";

interface ContainerProps<T> {
  title: string;
  isLoading: boolean;
  error: Error | undefined;
  data: Page<T> | undefined;
  children: (item: T) => ReactNode;
  getItemId: (item: T) => number;
}

export const MediaContainer = <T,>({ title, isLoading, error, data, children, getItemId }: ContainerProps<T>) => {
  return (
    <>
      <div className='flex flex-col w-full min-h-48  p-2 overflow-x-auto scrollbar-hidden'>
        <h2 className="p-2 text-2xl font-extrabold text-white">{title}</h2>
        <div className="w-full text-center">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: `${error.message}`</p>}
          {data && (
            <ul className='relative grid w-full z-0 grid-flow-col gap-4 p-1'>
              {data.results.map((item) => (
                <li
                  key={getItemId(item)}>
                  {children(item)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}