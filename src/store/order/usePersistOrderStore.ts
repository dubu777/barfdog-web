import { GeneralOrderItemRequest, OrderItemDto } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface PersistOrderStore {
  orderItemDtoList: OrderItemDto[];
  setOrderItemDtoList: (items: OrderItemDto[]) => void;
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
      name: 'general-order',
    }
  )
);