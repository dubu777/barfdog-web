import { GeneralOrderItemDto } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface PersistOrderStore {
  orderItemDtoList: GeneralOrderItemDto[];
  setOrderItemDtoList: (items: GeneralOrderItemDto[]) => void;
  clearOrderItemDtoList: () => void;
}

export const usePersistOrderStore = create(
  persist<PersistOrderStore>(
    (set) => ({
      orderItemDtoList: [],
      setOrderItemDtoList: (items) => set({ orderItemDtoList: items }),
      clearOrderItemDtoList: () => set({ orderItemDtoList: [] }),
    }),
    {
      name: 'general-order', // localStorage 키 이름
    }
  )
);