import CheckoutFailed from "@/components/pages/checkout/common/failed/CheckoutFailed";
import { ORDER_TYPE } from "@/constants";

export default function GeneralCheckoutFailedPage() {
  return <CheckoutFailed orderType={ORDER_TYPE.GENERAL} />;
}
