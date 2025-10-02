"use client";
import { create } from "zustand";
import { ReactNode } from "react";

export type AlertConfig = {
  title: string;
  content: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  buttonType?: "default" | "text";
  buttonPosition?: "center" | "right";
  closeOnBackgroundClick?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type ModalState = {
  isOpen: boolean;
  modal: AlertConfig | null;
  open: (payload: AlertConfig) => void;
  close: () => void;
};

export const useAlertModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modal: null,
  open: (payload) => set({ isOpen: true, modal: payload }),
  close: () => set({ isOpen: false, modal: null }),
}));
