'"use client";';

import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Text from "@/components/ui/text/Text";
import { commonWrapper, marginStyles, pointColor } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import WarningIcon from "public/images/icons/warning-circle.svg";
import { CHECKOUT_ROUTES } from "@/constants";
import { usePersistOrderStore } from "@/store/checkout/usePersistOrderStore";
import { OrderType } from "@/types";

interface CheckoutFailedProps {
  subscribeId?: number;
  orderType: OrderType;
}

export default function CheckoutFailed({
  subscribeId,
  orderType,
}: CheckoutFailedProps) {
  const router = useRouter();
  const { clearItemList } = usePersistOrderStore();
  const handleGoToCheckout = () => {
    if (orderType === "GENERAL") {
      router.push(CHECKOUT_ROUTES.GENERAL.order);
    } else {
      router.push(CHECKOUT_ROUTES.SUBSCRIPTION.order(subscribeId!));
    }
  };
  const handleGoToHome = () => {
    if (orderType === "GENERAL") {
      clearItemList();
    }
    router.push("/");
  };
  return (
    <div
      className={commonWrapper({
        direction: "col",
        paddingTop: 60,
        paddingX: 20,
        backgroundColors: "gray0",
        height: "full",
      })}
    >
      <SvgIcon
        src={WarningIcon}
        size={48}
        color="red"
        className={marginStyles({ bottom: 12 })}
      />
      <Text
        type="title2"
        align="center"
        className={marginStyles({ bottom: 28 })}
      >
        <span className={pointColor}>결제가 실패</span>되어
        <br />
        주문이 완료되지 않았습니다
      </Text>
      <div
        className={commonWrapper({
          padding: 16,
          border: "gray200",
          borderRadius: 8,
          backgroundColors: "gray100",
        })}
      >
        <Text type="label4" color="gray600">
          재시도를 하신 후에도 계속해서 같은 오류가 발생한다면 채널톡으로
          문의하여 주시기 바랍니다. 이용에 불편을 드려 죄송합니다.
        </Text>
      </div>
      <ButtonDocked
        type="dual-button"
        primaryButtonSize="lg"
        primaryButtonLabel="상품 재구매"
        secondaryButtonLabel="홈으로"
        onPrimaryClick={handleGoToCheckout}
        onSecondaryClick={handleGoToHome}
      />
    </div>
  );
}
