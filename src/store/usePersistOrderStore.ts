import { GeneralOrderItemDto, OrderItem } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface PersistOrderStore {
  orderItemList: GeneralOrderItemDto[];
  setOrderItemList: (items: GeneralOrderItemDto[]) => void;
  clearOrderItemList: () => void;
}

export const usePersistOrderStore = create(
  persist<PersistOrderStore>(
    (set) => ({
      orderItemList: [],
      setOrderItemList: (items) => set({ orderItemList: items }),
      clearOrderItemList: () => set({ orderItemList: [] }),
    }),
    {
      name: 'general-order', // localStorage 키 이름
    }
  )
);