"use client";
import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import SubscriptionCard from "./subscription/SubscriptionCard";
import GeneralCard from "./general/GeneralCard";
import InfoText from "@/components/common/typography/infoText/InfoText";
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

  const handleCancelOrder = () => {
    // TODO: 주문취소 기능 추가
    console.log('주문취소');
  };

  const handleConfirm = (selectedItems: OrderItemType[]) => {
    // TODO: 구매확정 기능 추가
    console.log('구매확정', selectedItems);
  };

  const handleDeliveryTracking = () => {
    // TODO: 배송조회 기능 추가
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

      <article className={commonWrapper({ direction: 'col', align: 'start', gap: 8 })}>
        <Text type="title4">주문 상품</Text>
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
      </article>
      {canShowDeliveryInfo(orderStatus as VisibleOrderStatus) && 
        (orderInfo.deliveryNumber && orderInfo.deliveryCode) && (
          <article className={commonWrapper({ direction: 'col', align: 'start', gap: 8 })}>
            <Text type="title4">배송 조회</Text>
            <DeliveryInfo 
              deliveryNumber={orderInfo.deliveryNumber}
              deliveryCode={orderInfo.deliveryCode}
              onDeliveryTracking={handleDeliveryTracking}
            />
          </article>
      )}
      <article className={commonWrapper({ direction: 'col', align: 'start', gap: 8 })}>
        <Text type="title4">배송 정보</Text>
          <AddressInfo
            userName={orderInfo.name}
            phoneNumber={orderInfo.phone}
            detailAddress={orderInfo.detailAddress}
            street={orderInfo.street}
          />
      </article>
      <article className={commonWrapper({ direction: 'col', align: 'start', gap: 8 })}>
        <Text type="title4">결제 정보</Text>
        <PaymentInfo
          orderPrice={orderInfo.orderPrice}
          paymentPrice={orderInfo.paymentPrice}
          deliveryPrice={orderInfo.deliveryPrice}
          discountCoupon={orderInfo.discountCoupon}
          discountReward={orderInfo.discountReward}
          discountGrade={orderInfo.discountGrade ?? 0}
          paymentMethod={orderInfo.paymentMethod}
        />
      </article>
      {canShowRefundInfo(orderStatus as VisibleOrderStatus) && (
        <article className={commonWrapper({ direction: 'col', align: 'start', gap: 8 })}>
          <Text type="title4">환불 정보</Text>
          <RefundInfo 
            requestDate={orderInfo.cancelRequestDate}
            confirmDate={orderInfo.cancelConfirmDate}
            reason={orderInfo.cancelReason}
            detailReason={orderInfo.cancelDetailReason}
            paymentMethod={orderInfo.paymentMethod}
            paymentPrice={orderInfo.paymentPrice}
          />
        </article>
      )}
    </section>
  );
}
