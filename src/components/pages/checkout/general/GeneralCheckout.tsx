"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// API & Data Fetching
import { usePrepareGeneralPayment } from "@/api/checkout/mutations/general/usePrepareGeneralPayment";
import { useSuccessGeneralPayment } from "@/api/checkout/mutations/general/useSuccessGeneralPayment";
import { useFailGeneralPayment } from "@/api/checkout/mutations/general/useFailGeneralPayment";
import { useCancelGeneralPayment } from "@/api/checkout/mutations/general/useCancelGeneralPayment";
import { useCheckoutFlow } from "@/hooks/checkout/useCheckoutFlow";

// Stores (상태 관리)
import { usePersistOrderStore } from "@/store/checkout/usePersistOrderStore";
import { useOrderStore } from "@/store/checkout/useOrderStore";
import { usePaymentStore } from "@/store/checkout/usePaymentStore";
import { useToastStore } from "@/store/useToastStore";

// UI
import DeliveryAddress from "../common/deliveryAddress/DeliveryAddress";
import BundleDeliverySelector from "./bundleDeliverySelector/BundleDeliverySelector";
import GeneralOrderItemList from "./generalOrderItemList/GenaralOrderItemList";
import CouponSelector from "../common/couponSelector/CouponSelector";
import RewardUsage from "../common/reward/RewardUsage";
import PaymentMethod from "../common/paymentMethod/PaymentMethod";
import OrderSummary from "../common/orderSummary/OrderSummary";
import OrderTerms from "../common/orderTerms/OrderTerms";
import OrderSection from "../common/orderSection/OrderSection";
import Divider from "@/components/ui/divider/Divider";
import Text from "@/components/ui/text/Text";

// Constants & Types
import { CHECKOUT_ROUTES, ORDER_MESSAGE, ORDER_TYPE } from "@/constants";
import {
  GeneralIamportRequest,
  GeneralIamportResponse,
  GetGeneralCheckoutResponse,
  PrepareGeneralPaymentRequest,
} from "@/types";

// Utils
import { formatNumberWithCommas } from "@/utils";
import { scrollToElement } from "@/utils/scrollToElement";
import useDeviceState from "@/hooks/useDeviceState";

// Strategy & Adapter
import { createGeneralStrategy } from "@/utils/checkout/strategies/generalStrategy";
import { iamportAdapter } from "@/utils/checkout/adapters/iamportAdapter";
import { useHydrateGeneralOrderStores } from "@/hooks/checkout/useHydrateGeneralOrderStores";
import Spinner from "@/components/ui/spinner/Spinner";
import { useGetGeneralCheckout } from "@/api/checkout/queries/useGetGeneralCheckout";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import { checkoutPageContainer } from "../OrderSheetCommon.css";
import { useDeliveryStore } from "@/store/checkout/useDeliveryStore";
import { convertToDeliveryAddresses } from "@/utils/delivery/convertToDeliveryRequest";
import Error from "@/components/layout/error/Error";

export default function GeneralCheckout() {
  // Local State
  const [showTermsErrors, setShowTermsErrors] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);
  const deliveryRef = useRef<HTMLDivElement>(null);
  // Store State
  const { itemList, clearItemList } = usePersistOrderStore();
  const paymentPrice = usePaymentStore((s) => s.paymentPrice);
  const getRequestBody = useOrderStore((s) => s.getRequestBody);
  const agreePrivacy = useOrderStore((s) => s.agreePrivacy);
  const deliveryDto = useDeliveryStore((state) => state.deliveryDto);
  const addToast = useToastStore((s) => s.addToast);

  console.log("itemList", itemList);

  // Routing & Device
  const router = useRouter();
  const { isMobileDevice, isWebView } = useDeviceState();

  // React Query Data Fetching
  const {
    data: generalOrderData,
    isPending,
    isError,
  } = useGetGeneralCheckout({
    itemList,
  });

  console.log("generalOrderData", generalOrderData);

  // React Query mutations
  const { mutateAsync: preparePayment } = usePrepareGeneralPayment();
  const { mutateAsync: successPayment } = useSuccessGeneralPayment();
  const { mutateAsync: failPayment } = useFailGeneralPayment();
  const { mutateAsync: cancelPayment } = useCancelGeneralPayment();

  // Store Hydration
  useHydrateGeneralOrderStores(generalOrderData);

  // Payment Strategy
  const strategy = useMemo(
    () =>
      createGeneralStrategy({
        sheet: generalOrderData as GetGeneralCheckoutResponse,
        isMobile: isMobileDevice,
        isWebView,
        successPayment: (args) => successPayment(args),
        cancelPayment: (orderId) => cancelPayment(orderId),
        failPayment: (orderId) => failPayment(orderId),
      }),
    [
      generalOrderData,
      isMobileDevice,
      isWebView,
      successPayment,
      cancelPayment,
      failPayment,
    ]
  );

  // Checkout Flow
  const { start, isProcessing } = useCheckoutFlow<
    PrepareGeneralPaymentRequest,
    GetGeneralCheckoutResponse,
    GeneralIamportRequest,
    GeneralIamportResponse
  >({
    preparePayment: async (req) => {
      const res = await preparePayment(req);
      return {
        orderId: res.orderId,
        merchantUid: res.merchantUid,
        orderStatus: res.orderStatus,
      };
    },
    paymentAdapter: iamportAdapter,
    strategy,
    onPaymentFailed: () => {
      router.push(CHECKOUT_ROUTES.GENERAL.failed);
    },
    onPaymentSuccess: (orderId) => {
      clearItemList();
      router.push(CHECKOUT_ROUTES.GENERAL.completed(orderId));
    },
  });

  // 스크롤
  const scrollToTerms = () => scrollToElement(termsRef.current);
  const scrollToDelivery = () => scrollToElement(deliveryRef.current);

  // 결제 버튼
  const handlePaymentSubmit = async () => {
    if (!deliveryDto) {
      addToast("배송지를 입력해주세요", "above-button");
      setTimeout(scrollToDelivery, 100);
    }

    if (!agreePrivacy) {
      setShowTermsErrors(true);
      addToast("결제 필수 사항에 동의해 주세요", "above-button");
      setTimeout(scrollToTerms, 100);
      return;
    }
    const requestBody = getRequestBody(
      ORDER_TYPE.GENERAL
    ) as PrepareGeneralPaymentRequest;
    await start(requestBody);
  };

  if (isError) {
    return <Error />;
  }

  if (isPending || !generalOrderData) {
    return <Spinner fullscreen />;
  }

  // PackageableDelivery를 DeliveryAddress 형식으로 변환
  const convertedDeliveryAddresses = convertToDeliveryAddresses(
    generalOrderData.pakageableDeliveryList
  );

  return (
    <div className={checkoutPageContainer}>
      <DeliveryAddress ref={deliveryRef} />
      <Divider />
      <BundleDeliverySelector
        bundleDeliveryAddress={convertedDeliveryAddresses}
      />
      <Divider />
      <GeneralOrderItemList itemList={generalOrderData.itemList} />
      <Divider />
      <CouponSelector
        orderType={ORDER_TYPE.GENERAL}
        originalPrice={generalOrderData.paymentInfo.originalPrice}
      />
      <Divider />
      <RewardUsage />
      <Divider />
      <PaymentMethod />
      <Divider />
      <OrderSummary
        orderType={ORDER_TYPE.GENERAL}
        originalPrice={generalOrderData.paymentInfo.originalPrice}
        discountDefault={generalOrderData.paymentInfo.discountProduct}
        freeCondition={generalOrderData.paymentInfo.freeCondition}
        deliveryPrice={generalOrderData.paymentInfo.deliveryPrice}
        itemList={generalOrderData.itemList}
      />
      <Divider />
      <OrderTerms
        orderType={ORDER_TYPE.GENERAL}
        showErrors={showTermsErrors}
        ref={termsRef}
      />
      <Divider />
      <OrderSection padding={20}>
        <Text type="headline2">{ORDER_MESSAGE.CONFIRM}</Text>
      </OrderSection>
      <ButtonDocked
        type="full-button"
        isPrimaryDisabled={isProcessing}
        onPrimaryClick={handlePaymentSubmit}
        primaryButtonLabel={
          isProcessing
            ? "결제 처리 중..."
            : `${formatNumberWithCommas(paymentPrice)}원 결제하기`
        }
      />
    </div>
  );
}
