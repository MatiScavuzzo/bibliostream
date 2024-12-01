import type { ReactNode } from "react";

interface Props {
  children: ReactNode,
  className: string,
  parentMethod: () => void;
}

export const Button = ({ children, className, parentMethod }: Props) => {
  return (
    <button className={className} type='button' onClick={parentMethod}>
      {children}
    </button>
  );
};