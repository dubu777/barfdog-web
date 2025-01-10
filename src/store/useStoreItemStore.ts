import {create} from "zustand";

interface ItemOption {
  value: number;
  label: string;
  name: string;
  price: number;
  remaining: number;
  count: number;
}


interface StoreItemStore {
  itemPrice: number; // 상품 기본 가격
  totalPrice: number; // 총 가격
  itemAmount: number; // 상품 수량
  selectedOptions: ItemOption[]; // 선택된 옵션 목록
  setItemPrice: (price: number) => void; // 초기 상품 가격 설정
  updateItemAmount: (itemAmount: number) => void; // 상품 수량 업데이트
  addOption: (option: ItemOption) => void; // 옵션 추가
  updateOptionCount: (value: number, count: number) => void; // 옵션 수량 업데이트
  removeOption: (value: number) => void; // 옵션 제거
  calculateTotalPrice: () => void; // 총 가격 재계산
}

const calculateOptionsTotal = (options: { count: number, price: number }[]) => {
  return options.reduce((total, option) => total + option.count * option.price, 0);
}

export const useStoreItemStore = create<StoreItemStore>((set, get) => ({
  itemPrice: 0,
  totalPrice: 0,
  itemAmount: 1,
  selectedOptions: [],

  setItemPrice: (price) => set(() => ({
    itemPrice: price,
    totalPrice: price,
  })),
  updateItemAmount: (itemAmount) => set((state) => {
    const optionsTotal = calculateOptionsTotal(state.selectedOptions);
    const newTotalPrice = state.itemPrice * itemAmount + optionsTotal;
    return {
      itemAmount,
      totalPrice: newTotalPrice,
    }
  }),
  addOption: (option) => set((state) => {
    const existingOption = state.selectedOptions.find(opt => opt.value === option.value);
    const updatedOptions = existingOption
      ? state.selectedOptions.map(opt =>
        opt.value === option.value
          ? { ...opt, count: Math.min(opt.count + 1, option.remaining) }
          : opt
      )
      : [...state.selectedOptions, { ...option, count: 1 }];
    const optionsTotal = calculateOptionsTotal(updatedOptions);
    const newTotalPrice = state.itemPrice * state.itemAmount + optionsTotal;
    return {
      selectedOptions: updatedOptions,
      totalPrice: newTotalPrice
    }
  }),
  updateOptionCount: (value, count) => set((state) => {
    const updatedOptions = state.selectedOptions.map(option => option.value === value ? { ...option, count } : option);
    const optionsTotal = calculateOptionsTotal(updatedOptions);
    const newTotalPrice = state.itemPrice * state.itemAmount + optionsTotal;
    return {
      selectedOptions: updatedOptions,
      totalPrice: newTotalPrice
    }
  }),
  removeOption: (value) => set((state) => {
    const updatedOptions = state.selectedOptions.filter(option => option.value !== value);
    const newTotalPrice = state.itemPrice * state.itemAmount + calculateOptionsTotal(updatedOptions);
    console.log(updatedOptions, newTotalPrice)
    return {
      selectedOptions: updatedOptions,
      totalPrice: newTotalPrice
    }
  }),
  calculateTotalPrice: () => set((state) => {
    const optionsTotal = calculateOptionsTotal(state.selectedOptions);
    return {
      totalPrice: state.itemPrice * state.itemAmount + optionsTotal,
    }
  }),
  resetStore: () => set({
    itemAmount: 1,
    selectedOptions: [],
  })
}))