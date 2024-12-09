import {create} from "zustand";

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastItem {
  id: string;
  message: string;
  duration?: number;
  type: ToastType;
}

interface ToastStore {
  toasts: ToastItem[];
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>()((set) => ({
  toasts: [],
  addToast: (message, type = 'success', duration = 3000) => {
    const id = Date.now().toString();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, duration);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}))