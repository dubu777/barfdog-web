"use client";
import { commonWrapper } from "@/styles/common.css";
import SubscriptionCard from "./card/subscription/SubscriptionCard";
import GeneralCard from "./card/general/GeneralCard";
import InfoText from "@/components/ui/typography/infoText/InfoText";
import InfoWrapper from "@/components/pages/mypage/common/wrapper/InfoWrapper";
import BasicInfo from "./info/basicInfo/BasicInfo";
import AddressInfo from "./info/addressInfo/AddressInfo";
import PaymentInfo from "./info/paymentInfo/PaymentInfo";
import DeliveryInfo from "./info/deliveryInfo/DeliveryInfo";
import RefundInfo from "./info/refundInfo/RefundInfo";
import AlertModal from "@/components/ui/modal/alertModal/AlertModal";
import OrderCancelRequestModal from "./modal/OrderCancelRequestModal";
import OrderCancelModal from "./modal/OrderCancelModal";
import ConfirmBottomSheet from "./bottomSheet/ConfirmBottomSheet";
import ExchangeReturnGuideBottomSheet from "./bottomSheet/ExchangeReturnGuideBottomSheet";
import { canShowDeliveryInfo, canShowRefundInfo, isAfterDelivery, isOrderStatusStepEqual } from "@/utils/mypage/orders/orderStatusStep";
import { OrderType, VisibleOrderStatus } from "@/types/mypage/orders";
import { useGetOrderDetail } from "@/api/mypage/orders/queries/useGetOrderDetail";
import { useOrderActions } from "@/hooks/mypage/orders/useOrderActions";
import { useOrderModalControl } from "@/hooks/mypage/orders/useOrderModalControl";

interface OrderDeliveryDetailProps {
  orderId: number;
  orderType: OrderType;
}

export default function OrderDetail({ orderId, orderType }: OrderDeliveryDetailProps) {
  const { data } = useGetOrderDetail(orderId, orderType);
  const { orderInfo, recipeInfo, orderItemInfoList } = data;
  const orderStatus = orderInfo.orderStatus;

  const { 
    onDeliveryTracking, 
    onCancelOrder,
    onConfirmOrder,
    onRequestCancelOrder,
  } = useOrderActions({
    orderId,
    orderType,
    orderInfo: {
      deliveryCode: orderInfo.deliveryCode || undefined,
      deliveryNumber: orderInfo.deliveryNumber || undefined,
    },
  });

  const {
    modals,
    openCancelModal,
    openCancelRequestModal,
    openCancelRequestSuccessModal,
    openConfirmModal,
    openExchangeReturnGuide,
    closeModal,
  } = useOrderModalControl();
  
  return (  
    <>
      <section
        className={commonWrapper({
          direction: 'col',
          align: 'start',
          gap: 32,
          padding: 20,
          paddingBottom: 40,
          backgroundColors: 'gray50',
        })}
      >
        <BasicInfo
          type={orderType}
          orderDate={orderInfo.orderDate}
          paymentDate={orderInfo.paymentDate ?? undefined}
          isPackage={orderInfo.package}
          merchantUid={orderInfo.merchantUid}
        />
        <InfoWrapper title="주문 상품" titleType="title4" padding={false}>
          {orderType === 'SUBSCRIPTION' && recipeInfo && (
            <SubscriptionCard
              orderInfo={orderInfo}
              recipeInfo={recipeInfo}
              openCancelModal={openCancelModal}
              openCancelRequestModal={openCancelRequestModal}
              // onToggleCancelRequestSuccessModal={openCancelRequestSuccessModal}
            />
          )}
          {orderType === 'GENERAL' && orderItemInfoList && (
            <GeneralCard
              orderInfo={orderInfo}
              orderItemInfoList={orderItemInfoList}
              openCancelModal={openCancelModal}
              openCancelRequestModal={openCancelRequestModal}
              openConfirmModal={openConfirmModal}
              openExchangeReturnGuide={openExchangeReturnGuide}
            />
          )}
          {isAfterDelivery(orderStatus as VisibleOrderStatus) && (
            <div>
              <InfoText 
                text="배송 완료 후 아래 기간이 지나면 자동으로 구매확정 처리돼요."
                color="gray500"
                type="body3"
              />
              <InfoText 
                text="신선식품 (생식, 토핑) : 2일 / 그 외 비신선식품 : 7일"
                color="gray500"
                type="body3"
              />
            </div>
          )}
        </InfoWrapper>
        {canShowDeliveryInfo(orderStatus as VisibleOrderStatus) && 
          (orderInfo.deliveryNumber && orderInfo.deliveryCode) && (
            <DeliveryInfo 
              deliveryNumber={orderInfo.deliveryNumber}
              deliveryCode={orderInfo.deliveryCode}
              onDeliveryTracking={onDeliveryTracking}
            />
        )}
        <AddressInfo
          userName={orderInfo.name}
          phoneNumber={orderInfo.phone}
          detailAddress={orderInfo.detailAddress}
          street={orderInfo.street}
        />
        <PaymentInfo
          orderPrice={orderInfo.orderPrice}
          paymentPrice={orderInfo.paymentPrice}
          deliveryPrice={orderInfo.deliveryPrice}
          discountCoupon={orderInfo.discountCoupon}
          discountReward={orderInfo.discountReward}
          discountGrade={orderInfo.discountGrade ?? 0}
          paymentMethod={orderInfo.paymentMethod}
          orderType={orderType}
        />
        {canShowRefundInfo(orderStatus as VisibleOrderStatus) && (
          <RefundInfo 
            requestDate={orderInfo.cancelRequestDate}
            confirmDate={orderInfo.cancelConfirmDate}
            reason={orderInfo.cancelReason}
            detailReason={orderInfo.cancelDetailReason}
            paymentMethod={orderInfo.paymentMethod}
            paymentPrice={orderInfo.paymentPrice}
          />
        )}
      </section>
      {modals.cancelRequestSuccess && (
        <AlertModal
          isOpen={modals.cancelRequestSuccess}
          onClose={() => closeModal('cancelRequestSuccess')}
          title="취소 신청이 접수됐어요"
          content="관리자가 확인 후 승인 또는 반려 결과를 알려드릴 예정이에요"
          confirmText="확인"
          closeOnBackgroundClick={false}
          buttonPosition="center"
        />
      )}
      {modals.cancelRequest && 
        <OrderCancelRequestModal
          isOpen={modals.cancelRequest}
          onClose={() => closeModal('cancelRequest')}
          onRequestCancelOrder={onRequestCancelOrder}
          openCancelRequestSuccessModal={openCancelRequestSuccessModal}
        />
      }
      {modals.cancelConfirm && 
        <OrderCancelModal
          orderType={orderType}
          isOpen={modals.cancelConfirm}
          onClose={() => closeModal('cancelConfirm')}
          onSubmit={onCancelOrder}
        />
      }
      {orderType === 'GENERAL' && modals.purchaseConfirm && 
        <ConfirmBottomSheet
          isOpen={modals.purchaseConfirm}
          onClose={() => closeModal('purchaseConfirm')}
          onConfirmOrder={onConfirmOrder}
          orderItemInfoList={
            orderItemInfoList?.filter((orderItem) => 
              isOrderStatusStepEqual(orderItem.status as VisibleOrderStatus, 'DELIVERY_DONE')) ?? []
          }
        />
      }
      {orderType === 'GENERAL' && modals.exchangeReturnGuide && 
        <ExchangeReturnGuideBottomSheet
          isOpen={modals.exchangeReturnGuide}
          onClose={() => closeModal('exchangeReturnGuide')}
        />
      }
    </>
  );
}
