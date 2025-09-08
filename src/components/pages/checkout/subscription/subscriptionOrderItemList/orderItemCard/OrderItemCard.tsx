import { TEMP_RECIPE_DTO_DATA } from "@/constants";
import { OrderType, SubscribeDto } from "@/types";
import Image from "next/image";
import * as styles from "./OrderItemCard.css";
import Text from "@/components/common/text/Text";
import { formatNumberWithCommas } from "@/utils";

interface OrderItemCardProps {
  orderType: OrderType;
  orderData: SubscribeDto;
  recipeName: string;
  recipeCount: number;
  oneMealGramPerPack: number;
  originPrice: number;
}

export default function OrderItemCard({
  orderType,
  orderData,
  recipeName,
  recipeCount,
  oneMealGramPerPack,
  originPrice,
}: OrderItemCardProps) {
  // 🔥 주문 정보 문자열 생성 함수
  const getOrderInfoText = () => {
    const isFullPlan = orderData.plan === "FULL";
    const mealPerDay = isFullPlan ? "하루 두 끼" : "하루 한 끼";
    const deliveryDuration = isFullPlan ? "2주" : "4주";
    const packCount = 28 / recipeCount;

    return `${oneMealGramPerPack}g | ${mealPerDay} | ${deliveryDuration} | ${packCount}팩`;
  };

  // 필요 유무 판단 후 삭제 예정 25.07.30
  console.log("orderType", orderType);

  return (
    <div className={styles.orderItemCardContainer}>
      <Image
        src={TEMP_RECIPE_DTO_DATA[recipeName].imageUrl}
        alt={recipeName}
        width={88}
        height={88}
        priority
        className={styles.orderItemCardImage}
      />
      <div className={styles.orderItemContentWrapper}>
        <div className={styles.orderItemInfoWrapper}>
          <Text type="label2">
            {TEMP_RECIPE_DTO_DATA[recipeName].name}
          </Text>
          <Text type="body3">{getOrderInfoText()}</Text>
        </div>
        <Text type="headline2">
          {formatNumberWithCommas(originPrice)}원
        </Text>
      </div>
    </div>
  );
}
