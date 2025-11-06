import { Fragment } from "react";
import { commonWrapper } from "@/styles/common.css";
import ListDivider from "@/components/ui/listDivider/ListDivider";
import Button from "@/components/ui/button/Button";
import CardWrapper from "@/components/pages/mypage/common/wrapper/CardWrapper";
import OrderStatus from "../../../common/card/OrderStatus";
import GeneralItem from "./GeneralItem";
import { isOrderStatusStepBelow, isOrderStatusStepEqual } from "@/utils/mypage/orders/orderStatusStep";
import { OrderInfo, OrderItem as OrderItemType, VisibleOrderStatus } from "@/types/mypage/orders";

interface GeneralCardProps {
  orderInfo: OrderInfo;
  orderItemInfoList: OrderItemType[];
  openConfirmModal: () => void;
  openCancelModal: () => void;
  openCancelRequestModal: () => void;
  openExchangeReturnGuide: () => void;
}

export default function GeneralCard({ 
  orderInfo, 
  orderItemInfoList, 
  openConfirmModal,
  openCancelModal,
  openCancelRequestModal,
  openExchangeReturnGuide,
}: GeneralCardProps) {
  const isDeliveryReady = isOrderStatusStepEqual(orderInfo.orderStatus as VisibleOrderStatus, 'DELIVERY_READY');
  const isPaymentDone = isOrderStatusStepEqual(orderInfo.orderStatus as VisibleOrderStatus, 'PAYMENT_DONE');
  const isDeliveryDone = isOrderStatusStepEqual(orderInfo.orderStatus as VisibleOrderStatus, 'DELIVERY_DONE');
  
  return (
    <CardWrapper>
      {orderItemInfoList.map((orderItem, index) => {
        const isItemDeliveryDone = isOrderStatusStepEqual(orderItem.status as VisibleOrderStatus, 'DELIVERY_DONE');
        return (
          <Fragment key={orderItem.itemId}>
            <div className={commonWrapper({ direction: 'col', gap: 10, justify: 'start', align: 'start' })}> 
              <OrderStatus
                orderStatus={orderItem.status}
              />
              <GeneralItem 
                orderItem={orderItem}
              />
              {isItemDeliveryDone && 
                <Button variant="outline" fullWidth size='sm'onClick={openConfirmModal}>
                  구매확정
                </Button>
              }
            </div>
            <ListDivider listLength={orderItemInfoList.length} index={index} color="gray100" />
          </Fragment>
        )
      })}
      {isOrderStatusStepBelow(orderInfo.orderStatus as VisibleOrderStatus, 'DELIVERY_READY') && 
        <Button 
          variant="outline" 
          intent="assistive" 
          fullWidth 
          size='sm'
          onClick={
            isPaymentDone 
              ? openCancelModal 
              : isDeliveryReady 
                ? openCancelRequestModal 
                : undefined
          }
        >
          주문취소
        </Button>
      }
      {isDeliveryDone && 
        <Button variant="outline" intent="assistive" fullWidth size='sm'onClick={openExchangeReturnGuide}>
          교환/반품 신청
        </Button>
      }
    </CardWrapper>
  );
}