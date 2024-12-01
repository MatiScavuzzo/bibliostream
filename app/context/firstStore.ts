import { create } from 'zustand';

interface Action {
  setFetch: (value: boolean) => void;
}

interface State {
  fetch: boolean;
}

export const useFetchStore = create<State & Action>((set) => ({
  fetch: false,
  setFetch: (value: boolean) => set({ fetch: value }),
}));
