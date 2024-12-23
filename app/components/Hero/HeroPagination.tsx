'use client'

interface Props {
  currentIndex: number;
  totalItems: number;
}
export const HeroPagination = ({ currentIndex, totalItems }: Props) => {
  const visibleIndex = Array.from({ length: totalItems });

  const getClasses = (position: number) => {
    switch (currentIndex) {
      case 0:
        return ['w-3.5 h-1.5 bg-white rounded-lg', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-1 h-1 bg-white/25 rounded-full', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'][position];
      case 1:
        return ['w-1.5 h-1.5 bg-white/25 rounded-full', 'w-3.5 h-1.5 bg-white rounded-lg', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-1 h-1 bg-white/25 rounded-full', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'][position];
      case 2:
        return ['w-1.5 h-1.5 bg-white/25 rounded-full', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-3.5 h-1.5 bg-white rounded-lg', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-1 h-1 bg-white/25 rounded-full', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'][position];
      case 3:
        return ['hidden', 'w-1 h-1 bg-white/25 rounded-full', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-3.5 h-1.5 bg-white rounded-lg', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-1 h-1 bg-white/25 rounded-full', 'hidden', 'hidden', 'hidden', 'hidden'][position];
      case 4:
        return ['hidden', 'hidden', 'w-1 h-1 bg-white/25 rounded-full', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-3.5 h-1.5 bg-white rounded-lg', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-1 h-1 bg-white/25 rounded-full', 'hidden', 'hidden', 'hidden'][position];
      case 5:
        return ['hidden', 'hidden', 'hidden', 'w-1 h-1 bg-white/25 rounded-full', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-3.5 h-1.5 bg-white rounded-lg', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-1 h-1 bg-white/25 rounded-full', 'hidden', 'hidden'][position];
      case 6:
        return ['hidden', 'hidden', 'hidden', 'hidden', 'w-1 h-1 bg-white/25 rounded-full', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-3.5 h-1.5 bg-white rounded-lg', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-1 h-1 bg-white/25 rounded-full', 'hidden'][position];
      case 7:
        return ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'w-1 h-1 bg-white/25 rounded-full', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-3.5 h-1.5 bg-white rounded-lg', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-1.5 h-1.5 bg-white/25 rounded-full'][position];
      case 8:
        return ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'w-1 h-1 bg-white/25 rounded-full', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-3.5 h-1.5 bg-white rounded-lg', 'w-1.5 h-1.5 bg-white/25 rounded-full'][position];
      case 9:
        return ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'w-1 h-1 bg-white/25 rounded-full', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-1.5 h-1.5 bg-white/25 rounded-full', 'w-3.5 h-1.5 bg-white rounded-lg'][position];
      default:
        return ''; // No debería ocurrir
    }
  }

  return (
    <div className="overflow-hidden flex justify-center">
      <ul className={`flex list-none items-center justify-center gap-2 transition-transform duration-200 ease-in-out`}>
        {visibleIndex.map((_, position) => (
          <li key={position}
            className={`transition-all duration-300 ease-in-out ${getClasses(position)}`}></li>
        ))}
      </ul>
    </div>
  )
}

/*
*const visibleItems = 5;
  const halfRange = Math.floor(visibleItems / 2);

  const visibleIndex = Array.from({ length: visibleItems }, (_, i) => {
    const offset = i - halfRange;
    return (currentIndex + offset + totalItems) % totalItems;
  });

  const getClasses = (index: number, position: number) => {
    console.log(currentIndex)
    if (index === currentIndex) {
      return 'w-3.5 h-1.5 bg-white rounded-lg';
    } else if (position === 0 || position === visibleItems - 1) {
      return 'w-1 h-1 bg-white/25 rounded-full';
    } else {
      return 'w-1.5 h-1.5 bg-white/25 rounded-full';
    }
  };
  */

/*
* <li
            key={index}
            className={`transition-all duration-200 ease-in-out
            ${index === currentIndex
                ? 'w-3.5 h-1.5 bg-white rounded-lg'
                : 'w-1.5 h-1.5 bg-white/25 rounded-full'
              }
            ${Math.abs(index - currentIndex) === 2
                ? 'w-1 h-1 bg-white/25 rounded-full'
                : ''
              }`}
          ></li>
*/

/*
  <li className={`transition-all duration-200 ease-in-out ${currentIndex === 0
          ? 'w-3.5 h-1.5 bg-white rounded-lg'
          : isLeftExtreme
            ? 'w-1 h-1 bg-white/25 rounded-full'
            : 'w-1.5 h-1.5 bg-white/25 rounded-full'
          }`}></li>
        <li className={`transition-all duration-200 ease-in-out ${currentIndex === 1
          ? 'w-3.5 h-1.5 bg-white rounded-lg'
          : 'w-1.5 h-1.5 bg-white/25 rounded-full'
          }`}></li>
        <li className={`transition-all duration-200 ease-in-out ${isCenter
          ? 'w-3.5 h-1.5 bg-white rounded-lg'
          : 'w-1.5 h-1.5 bg-white/25 rounded-full'
          }`}></li>
        <li className={`transition-all duration-200 ease-in-out ${currentIndex === 8
          ? 'w-3.5 h-1.5 bg-white rounded-lg'
          : 'w-1.5 h-1.5 bg-white/25 rounded-full'
          }`}></li>
        <li className={`transition-all duration-200 ease-in-out ${currentIndex === 9
          ? 'w-3.5 h-1.5 bg-white rounded-lg'
          : isRightExtreme
            ? 'w-1 h-1 bg-white/25 rounded-full'
            : 'w-1.5 h-1.5 bg-white/25 rounded-full'
          }`}></li>
          */