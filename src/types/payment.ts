
export type { PaymentMethodType, PackageInfo };

type PaymentMethodType = "card" | "naverpay" | "kakaopay";

interface PackageInfo {
  value: number | null;
  label: string;
  discount: number;
  freeKit: boolean | number;
  freeTopper: boolean | number;
  freeSkip: boolean;
  freeDelivery: boolean;
  fullDeliveryCount: number;
  halfDeliveryCount: number;
}