import { create } from "zustand";
import { ClientDeliveryDto } from "@/types";
import { initialDeliveryDto } from "@/config/orderInitialValues";

interface DeliveryState {
  deliveryDto: ClientDeliveryDto; // 서버에 전송할 delivery 값
  backupDeliveryDto: ClientDeliveryDto; // 묶음 배송 선택에 영향 받지 않는 값
  bundleDeliveryDto: ClientDeliveryDto; // 묶음 배송으로 선택한 delivery 값
  deliveryId: number | null; // 묶음 배송지 delivery Id
  isBundleDelivery: boolean; // 묶음 배송 여부
  setDeliveryDto: (delivery: ClientDeliveryDto) => void;
  setBackupDeliveryDto: (delivery: ClientDeliveryDto) => void;
  setBundleDeliveryDto: (delivery: ClientDeliveryDto) => void;
  setDeliveryId: (id: number | null) => void;
  setIsBundleDelivery: (isBundleDelivery: boolean) => void;
}

export const useDeliveryStore = create<DeliveryState>((set) => ({
  deliveryDto: initialDeliveryDto,
  backupDeliveryDto: initialDeliveryDto,
  bundleDeliveryDto: initialDeliveryDto,
  deliveryId: null,
  isBundleDelivery: false,
  setDeliveryDto: (delivery) => set({ deliveryDto: delivery }),
  setBackupDeliveryDto: (delivery) => set({ backupDeliveryDto: delivery }),
  setBundleDeliveryDto: (delivery) => set({ bundleDeliveryDto: delivery }),
  setDeliveryId: (id) => set({ deliveryId: id }),
  setIsBundleDelivery: (isBundleDelivery) =>
    set({ isBundleDelivery }),
}));
