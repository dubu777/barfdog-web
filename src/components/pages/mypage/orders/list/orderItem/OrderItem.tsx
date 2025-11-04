import { format } from "date-fns";
import { commonWrapper } from "@/styles/common.css";
import Link from "next/link";
import ArrowIcon from '/public/images/mypage/chevron-s.svg';
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Text from "@/components/ui/text/Text";
import CardWrapper from "../../../common/wrapper/CardWrapper";
import CardImage from "../../../common/card/image/CardImage";
import OrderStatus from "../../common/card/OrderStatus";
import OrderPrice from "../../common/card/OrderPrice";
import { ItemNameList, OrderStatus as OrderStatusType, OrderType } from "@/types/mypage/orders";

interface OrderItemProps {
  orderType: OrderType;
  orderId: number;
  orderDate: string;
  orderStatus: OrderStatusType;
  thumbnailUrl: string;
  name: string;
  paymentPrice: number;
  subscribeCount?: number;
  dogName?: string;
  recipeName?: string;
  itemNameList?: ItemNameList[];
}

export default function OrderItem({
  orderType,
  orderId,
  orderDate,
  orderStatus,
  thumbnailUrl,
  name,
  subscribeCount,
  dogName,
  paymentPrice,
  recipeName,
  itemNameList = [],
}: OrderItemProps) {
  return (
    <div className={commonWrapper({ 
      direction: 'col', 
      gap: 4, 
      padding: 20, 
      backgroundColors: 'gray50'
    })}>
      <div className={commonWrapper({ justify: 'between', align: 'center' })}>
        <Text type="label2" color="gray800">{format(new Date(orderDate), "yy-MM-dd HH:mm:ss")}</Text>
        <Link href={`/mypage/orders/${orderType.toLowerCase()}/${orderId}`}>
          <Text type="label4" color="gray800" className={commonWrapper({ gap: 4, align: 'center', width: 'auto' })}>
            주문상세
            <SvgIcon src={ArrowIcon} size={20} color="gray800" />
          </Text>
        </Link>
      </div>
      <CardWrapper gap={10}>
        <div className={commonWrapper({ direction: 'col', gap: 10, justify: 'start', align: 'start' })}>
          <OrderStatus
            orderStatus={orderStatus}
            orderType={orderType}
          />
          <div className={commonWrapper({ gap: 12, justify: 'start', align: 'start' })}>
            <CardImage
              imageUrl={thumbnailUrl}
              name={name}
            />
            <div className={commonWrapper({ direction: 'col', gap: 4, justify: 'start', align: 'start' })}>
              {orderType === 'GENERAL'
              ? (
                <>
                  <Text type="headline3">{name}</Text>
                  {itemNameList && itemNameList.length > 1 && (
                    <Text type='caption' color='gray600'>
                      외 {itemNameList.length - 1}건
                    </Text>
                  )}
                </>
              ) : (
                <>
                  <div className={commonWrapper({ justify: 'start', gap: 4 })}>
                    <Text type='headline4'>{subscribeCount}회차</Text>
                    <Text type='body3' color='gray800'>{dogName}</Text>
                  </div>
                  <Text type='caption' color='gray600'>{recipeName}</Text>
                </>
              )
            }
            <OrderPrice
              paymentPrice={paymentPrice}
              label="결제금액"
            />
            </div>
          </div>
        </div>
      </CardWrapper>
    </div>
  );
}