import { create } from "zustand";
import { DeliveryDto } from "@/types";
import { initialDeliveryDto } from "@/config/orderInitialValues";
import { number } from "yup";

interface DeliveryState {
  deliveryDto: DeliveryDto;
  backupDeliveryDto: DeliveryDto;
  deliveryId: number | null;
  isBundleDelivery: boolean;
  defaultAddressId: number | null;
  setDeliveryDto: (delivery: DeliveryDto) => void;
  setBackupDeliveryDto: (delivery: DeliveryDto) => void;
  setDeliveryId: (id: number | null) => void;
  setIsBundleDelivery: (isBundleDelivery: boolean) => void;
  setDefaultAddressId: (id: number | null) => void;
}

export const useDeliveryStore = create<DeliveryState>((set) => ({
  deliveryDto: initialDeliveryDto,
  backupDeliveryDto: initialDeliveryDto,
  deliveryId: null,
  isBundleDelivery: false,
  defaultAddressId: null,
  setDeliveryDto: (delivery) => set({ deliveryDto: delivery }),
  setBackupDeliveryDto: (delivery) => set({ backupDeliveryDto: delivery }),
  setDeliveryId: (id) => set({ deliveryId: id }),
  setIsBundleDelivery: (isBundleDelivery) =>
    set({ isBundleDelivery }),
  setDefaultAddressId: (id) => set({ defaultAddressId: id }),

}));
