'use client'

import type { ReactNode } from "react";
import { SWRConfig, useSWRConfig } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const SWRProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig value={{ fetcher }}>
      {children}
    </SWRConfig>
  )
}