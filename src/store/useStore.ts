import { create } from 'zustand';
import { Endpoints } from '../networkConfig/Endpoints';
import HTTPService from '../networkConfig/HttpServices';

export interface Movie {
  name?: string;
  imageurl?: string;
  publisher?: string;
  firstappearance?: string;
}

interface StoreState {
  // App
  accessToken: string;
  setToken: (token: string) => void;
  
  // Counter
  count: number;
  increment: () => void;
  decrement: () => void;

  // User
  userProfile: object;

  // Dashboard
  movieData: Movie[];
  getMoviesData: () => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
  // App
  accessToken: '',
  setToken: (token) => set({ accessToken: token }),

  // Counter
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),

  // User
  userProfile: {},

  // Dashboard
  movieData: [],
  getMoviesData: async () => {
    try {
      const response = await HTTPService.get(Endpoints.Movies);
      if (Array.isArray(response)) {
        set({ movieData: response as unknown as Movie[] });
      } else {
        set({ movieData: [response] as unknown as Movie[] });
      }
    } catch (error: any) {
      console.error('Failed to fetch movies:', error);
    }
  },
}));
