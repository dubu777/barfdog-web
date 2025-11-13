import { create } from "zustand";
import { DeliveryAddress } from "@/types";

interface DeliveryState {
  deliveryDto: DeliveryAddress | null; // 서버에 전송할 delivery 값
  backupDeliveryDto: DeliveryAddress | null; // 묶음 배송 선택에 영향 받지 않는 값
  bundleDeliveryDto: DeliveryAddress | null; // 묶음 배송으로 선택한 delivery 값
  deliveryId: number | null; // 묶음 배송지 delivery Id
  isBundleDelivery: boolean; // 묶음 배송 여부
  setDeliveryDto: (delivery: DeliveryAddress | null) => void;
  setBackupDeliveryDto: (delivery: DeliveryAddress | null) => void;
  setBundleDeliveryDto: (delivery: DeliveryAddress | null) => void;
  setDeliveryId: (id: number | null) => void;
  setIsBundleDelivery: (isBundleDelivery: boolean) => void;
}

export const useDeliveryStore = create<DeliveryState>((set) => ({
  deliveryDto: null,
  backupDeliveryDto: null,
  bundleDeliveryDto: null,
  deliveryId: null,
  isBundleDelivery: false,
  setDeliveryDto: (delivery) => set({ deliveryDto: delivery }),
  setBackupDeliveryDto: (delivery) => set({ backupDeliveryDto: delivery }),
  setBundleDeliveryDto: (delivery) => set({ bundleDeliveryDto: delivery }),
  setDeliveryId: (id) => set({ deliveryId: id }),
  setIsBundleDelivery: (isBundleDelivery) => set({ isBundleDelivery }),
}));
