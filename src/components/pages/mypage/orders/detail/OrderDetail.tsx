"use client";
import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import SubscriptionCard from "../card/subscription/SubscriptionCard";
import GeneralCard from "../card/general/GeneralCard";
import BasicInfo from "./basicInfo/BasicInfo";
import AddressInfo from "./addressInfo/AddressInfo";
import PaymentInfo from "./paymentInfo/PaymentInfo";
import DeliveryInfo from "./deliveryInfo/DeliveryInfo";
import RefundInfo from "./refundInfo/RefundInfo";
import { canShowDeliveryInfo, canShowRefundInfo } from "@/utils/mypage/orders/orderStatusStep";
import { OrderType, VisibleOrderStatus } from "@/types/mypage/orders";
import { useGetOrderDetail } from "@/api/mypage/orders/queries/useGetOrderDetail";

interface OrderDeliveryDetailProps {
  orderId: number;
  orderType: OrderType;
}

export default function OrderDetail({ orderId, orderType }: OrderDeliveryDetailProps) {
  const { data } = useGetOrderDetail(orderId, orderType);
  const { orderInfo, recipeInfo, orderItemInfoList } = data;
  const orderStatus = orderInfo.orderStatus;
  
  if (!data) return null;
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
          />
        )}
        {orderType === 'GENERAL' && orderItemInfoList && (
          <GeneralCard
            orderInfo={orderInfo}
            orderItemInfoList={orderItemInfoList}
          />
        )}
      </article>
      {canShowDeliveryInfo(orderStatus as VisibleOrderStatus) && 
        (orderInfo.deliveryNumber && orderInfo.deliveryCode) && (
          <article className={commonWrapper({ direction: 'col', align: 'start', gap: 8 })}>
            <Text type="title4">배송 조회</Text>
            <DeliveryInfo 
              deliveryNumber={orderInfo.deliveryNumber}
              deliveryCode={orderInfo.deliveryCode}
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
