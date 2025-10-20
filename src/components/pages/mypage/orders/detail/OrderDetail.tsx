"use client";
import { commonWrapper } from "@/styles/common.css";
import SubscriptionCard from "./card/subscription/SubscriptionCard";
import GeneralCard from "./card/general/GeneralCard";
import InfoText from "@/components/common/typography/infoText/InfoText";
import InfoWrapper from "@/components/pages/mypage/common/wrapper/InfoWrapper";
import BasicInfo from "./info/basicInfo/BasicInfo";
import AddressInfo from "./info/addressInfo/AddressInfo";
import PaymentInfo from "./info/paymentInfo/PaymentInfo";
import DeliveryInfo from "./info/deliveryInfo/DeliveryInfo";
import RefundInfo from "./info/refundInfo/RefundInfo";
import { canShowDeliveryInfo, canShowRefundInfo, isAfterDelivery } from "@/utils/mypage/orders/orderStatusStep";
import { OrderItem as OrderItemType, OrderType, VisibleOrderStatus } from "@/types/mypage/orders";
import { useGetOrderDetail } from "@/api/mypage/orders/queries/useGetOrderDetail";

interface OrderDeliveryDetailProps {
  orderId: number;
  orderType: OrderType;
}

export default function OrderDetail({ orderId, orderType }: OrderDeliveryDetailProps) {
  const { data } = useGetOrderDetail(orderId, orderType);
  const { orderInfo, recipeInfo, orderItemInfoList } = data;
  const orderStatus = orderInfo.orderStatus;

  // TODO: 하단 기능 로직 구현 필요
  const handleCancelOrder = () => {
    console.log('주문취소');
  };

  const handleConfirm = (selectedItems: OrderItemType[]) => {
    console.log('구매확정', selectedItems);
  };

  const handleDeliveryTracking = () => {
    console.log('배송조회');
  };
  
  return (  
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
            onCancelOrder={handleCancelOrder}
          />
        )}
        {orderType === 'GENERAL' && orderItemInfoList && (
          <GeneralCard
            orderInfo={orderInfo}
            orderItemInfoList={orderItemInfoList}
            onCancelOrder={handleCancelOrder}
            onConfirm={handleConfirm}
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
            onDeliveryTracking={handleDeliveryTracking}
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
  );
}
