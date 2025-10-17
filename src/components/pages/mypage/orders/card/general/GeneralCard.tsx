import { Fragment } from "react";
import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import ListDivider from "@/components/common/listDivider/ListDivider";
import Button from "@/components/common/button/Button";
import CardWrapper from "../common/CardWrapper";
import OrderStatus from "../common/OrderStatus";
import OrderImage from "../common/OrderImage";
import OrderPrice from "../common/OrderPrice";
import OrderName from "../common/OrderName";
import { OrderInfo, OrderItem } from "@/types/mypage/orders";

interface GeneralCardProps {
  orderInfo: OrderInfo;
  orderItemInfoList: OrderItem[];
}

export default function GeneralCard({ 
  orderInfo, 
  orderItemInfoList, 
}: GeneralCardProps) {

  return (
    <CardWrapper>
      {orderItemInfoList.map((orderItem, index) => (
        <Fragment key={orderItem.itemId}>
          <div className={commonWrapper({ direction: 'col', gap: 10, justify: 'start', align: 'start' })}> 
            <OrderStatus
              orderStatus={orderItem.status}
            />
            <div className={commonWrapper({ gap: 12, justify: 'start', align: 'start' })}>
              <OrderImage
                thumbnailUrl={orderItem.thumbnailUrl}
                itemName={orderItem.itemName}
              />
              <div className={commonWrapper({ direction: 'col', gap: 4, justify: 'start', align: 'start' })}>
                <OrderName name={orderItem.itemName} />
                <Text type="body3" color="gray700">{orderItem.amount}개</Text>
                <Divider thickness={1} color="gray100" />
                {orderItem.selectOptionList.length > 0 && orderItem.selectOptionList.map((option) => (
                  <div key={option.optionName} className={commonWrapper({ gap: 6, justify: 'between' })}>
                    <Text type="caption2" color="gray600">{option.optionName}</Text>
                    <Text type="caption" color="gray600">{option.optionAmount}개</Text>
                  </div>
                ))}
                <OrderPrice
                  paymentPrice={orderItem.finalPrice}
                />
              </div>
            </div>
          </div>
          <ListDivider listLength={orderItemInfoList.length} index={index} color="gray100" />
        </Fragment>
      ))}
      {orderInfo.orderStatus === 'PAYMENT_DONE' && 
        <Button 
          variant="outline" 
          intent="assistive" 
          fullWidth 
          size='sm'
        >
          주문취소
        </Button>
      }
    </CardWrapper>
  );
}