import { commonWrapper } from "@/styles/common.css";
import { recommendItem, recommendItemBox, recommendItemImage } from "./RecommendItems.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Text from "@/components/ui/text/Text";
import Button from "@/components/ui/button/Button";
import { DISCOUNT_UNIT } from "@/constants";
import { getRecommendItemIds } from "@/constants/healthNote/aiObesityCheck";
import { useGetRecommendItems } from "@/api/healthNote/aiObesityCheck/query/useGetRecommendItems";

export default function RecommendItems() {
  const router = useRouter();
  const { data: itemList } = useGetRecommendItems(getRecommendItemIds());

  return (
    <article className={commonWrapper({
      direction: 'col',
      gap: 24,
      paddingX: 20,
      paddingY: 40,
      backgroundColors: 'gray0'
    })}>
      <Text type='title3'>체중관리 추천 상품</Text>
      <div className={recommendItemBox}>
        {itemList?.map(item => {
          const isSale = (item.salePrice !== item.originalPrice) && item.discountDegree > 0;
          return (
            <Link
              key={item.id} 
              href={`/store/${item.id}`}
              target='_blank'
              className={recommendItem}
            >
              <Image 
                alt={item.name}
                src={item.imageUrl}
                width={276}
                height={276}
                className={recommendItemImage}
              />
              <div>
                <Text type='body3' color='gray800'>{item.name}</Text>
                {isSale && (
                  <div>
                    <Text type='caption2' color='red'>할인특가</Text>
                    <Text type='caption2' color='gray600'>{item.originalPrice.toLocaleString()}원</Text>
                  </div>
                )}
                <div>
                  {isSale && 
                    <Text type='headline1' color='red'>{item.discountDegree}{DISCOUNT_UNIT[item.discountType]}</Text>
                  }
                  <Text type='headline1'>{item.salePrice.toLocaleString()}원</Text>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      <Button 
        variant='outline' 
        onClick={() => router.push('/store')}
        fullWidth
      >
        스토어 가기
      </Button>
    </article>
  );
}