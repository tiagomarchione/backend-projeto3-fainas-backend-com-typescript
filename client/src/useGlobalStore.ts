import { create } from "zustand";
import type { User } from "./types";

type StoreUser = User & { isAuthenticated: boolean, isEmailVerified: number };

type GlobalStore = {
    user: StoreUser,
    setUser: (user: Partial<StoreUser>) => void,
}

export const initialUser = {
    isAuthenticated: false,
    isEmailVerified: 0,
    id: 0,
    name: '',
    surname: '',
    email: '',
    userPicture: null,
};

export const useGlobalStore = create<GlobalStore>((set, get) => ({
    user: initialUser,
    setUser(user) {
        set({ user: { ...get().user, ...user } });
    }
}));