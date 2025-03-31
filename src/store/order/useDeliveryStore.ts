import { create } from "zustand";
import { ClientDeliveryDto } from "@/types";
import { initialDeliveryDto } from "@/config/orderInitialValues";

interface DeliveryState {
  deliveryDto: ClientDeliveryDto;
  backupDeliveryDto: ClientDeliveryDto;
  bundleDeliveryDto: ClientDeliveryDto;
  deliveryId: number | null;
  isBundleDelivery: boolean;
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
