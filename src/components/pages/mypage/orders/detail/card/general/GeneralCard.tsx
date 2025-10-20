import { Fragment } from "react";
import { commonWrapper } from "@/styles/common.css";
import ListDivider from "@/components/common/listDivider/ListDivider";
import Button from "@/components/common/button/Button";
import CardWrapper from "@/components/pages/mypage/common/wrapper/CardWrapper";
import OrderStatus from "../../../common/card/OrderStatus";
import OrderCancelRequestModal from "../../modal/OrderCancelRequestModal";
import OrderCancelAlertModal from "../../modal/OrderCancelAlertModal";
import ExchangeReturnGuideBottomSheet from "../../bottomSheet/ExchangeReturnGuideBottomSheet";
import ConfirmBottomSheet from "../../bottomSheet/ConfirmBottomSheet";
import GeneralItem from "./GeneralItem";
import useModal from "@/hooks/useModal";
import { isOrderStatusStepBelow, isOrderStatusStepEqual } from "@/utils/mypage/orders/orderStatusStep";
import { OrderInfo, OrderItem as OrderItemType, VisibleOrderStatus } from "@/types/mypage/orders";

interface GeneralCardProps {
  orderInfo: OrderInfo;
  orderItemInfoList: OrderItemType[];
  onCancelOrder: () => void;
  onConfirm: (selectedItems: OrderItemType[]) => void;
}

export default function GeneralCard({ 
  orderInfo, 
  orderItemInfoList, 
  onCancelOrder,
  onConfirm,
}: GeneralCardProps) {
  const { isOpen, onToggle, onClose } = useModal();
  const { isOpen: isOpenConfirmBottomSheet, onToggle: onToggleConfirmBottomSheet, onClose: onCloseConfirmBottomSheet } = useModal();

  const isDeliveryReady = isOrderStatusStepEqual(orderInfo.orderStatus as VisibleOrderStatus, 'DELIVERY_READY');
  const isPaymentDone = isOrderStatusStepEqual(orderInfo.orderStatus as VisibleOrderStatus, 'PAYMENT_DONE');
  const isDeliveryDone = isOrderStatusStepEqual(orderInfo.orderStatus as VisibleOrderStatus, 'DELIVERY_DONE');
  
  return (
    <>
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
                  <Button variant="outline" fullWidth size='sm'onClick={onToggleConfirmBottomSheet}>
                    구매확정
                  </Button>
                }
              </div>
              <ListDivider listLength={orderItemInfoList.length} index={index} color="gray100" />
            </Fragment>
          )
        })}
        {isOrderStatusStepBelow(orderInfo.orderStatus as VisibleOrderStatus, 'DELIVERY_READY') && 
          <Button variant="outline" intent="assistive" fullWidth size='sm'onClick={onToggle}>
            주문취소
          </Button>
        }
        {isDeliveryDone && 
          <Button variant="outline" intent="assistive" fullWidth size='sm'onClick={onToggle}>
            교환/반품 신청
          </Button>
        }
      </CardWrapper>
      {isOpen && 
        isDeliveryReady ? 
          <OrderCancelRequestModal
            isOpen={isOpen}
            onClose={onClose}
          />
        : isPaymentDone ? 
          <OrderCancelAlertModal
            orderType="GENERAL"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onCancelOrder}
          />
          : isDeliveryDone &&
            <ExchangeReturnGuideBottomSheet
              isOpen={isOpen}
              onClose={onClose}
            />
      }
      {isOpenConfirmBottomSheet && 
        <ConfirmBottomSheet
          isOpen={isOpenConfirmBottomSheet}
          onClose={onCloseConfirmBottomSheet}
          orderItemInfoList={
            orderItemInfoList.filter((orderItem) => 
              isOrderStatusStepEqual(orderItem.status as VisibleOrderStatus, 'DELIVERY_DONE'))
          }
          onConfirm={onConfirm}
        />
      }
    </>
  );
}