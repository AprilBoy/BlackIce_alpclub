import { create } from 'zustand';

interface StoreState {
    // Добавьте здесь ваши состояния
    // Пример:
    // count: number;
    // user: User | null;
}

interface StoreActions {
    // Добавьте здесь ваши действия
    // Пример:
    // increment: () => void;
    // setUser: (user: User) => void;
}

type Store = StoreState & StoreActions;

export const useStore = create<Store>((set) => ({
    // Инициализация состояний
    // Пример:
    // count: 0,
    // user: null,

    // Инициализация действий
    // Пример:
    // increment: () => set((state) => ({ count: state.count + 1 })),
    // setUser: (user) => set({ user }),
}));

