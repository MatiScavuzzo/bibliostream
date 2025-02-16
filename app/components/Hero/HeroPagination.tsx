'use client'

import { getPaginationClasses } from "@/utilities";

interface Props {
  currentIndex: number;
  totalItems: number;
}
export const HeroPagination = ({ currentIndex, totalItems }: Props) => {
  const visibleIndex = Array.from({ length: totalItems });

  return (
    <div className="overflow-hidden flex justify-center">
      <ul className={`flex list-none items-center justify-center gap-2.5 transition-transform duration-200 ease-in-out`}>
        {visibleIndex.map((_, position) => (
          <li key={position}
            className={`transition-all duration-300 ease-in-out ${getPaginationClasses(currentIndex, position)}`}></li>
        ))}
      </ul>
    </div>
  )
}
