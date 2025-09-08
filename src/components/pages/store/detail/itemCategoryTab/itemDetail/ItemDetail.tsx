import * as styles from './ItemDetail.css';
import { sanitizedHTML } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import useSanitizedHTML from "@/hooks/useSanitizedHTML";

interface ItemDetailProps {
  contents: string;
  description: string;
}

export default function ItemDetail({
  contents,
  description,
}: ItemDetailProps) {
  const itemContents = useSanitizedHTML(contents);

  return (
    <>
      <div className={styles.itemDetail}>
        <Text className={styles.detailTip} type='body2' color='gray700'>
          상품 Tip!
        </Text>
        <Text type='label2' color='gray700'>
          {description}
        </Text>
      </div>
      <Divider thickness={1} color='gray100' />
      <div 
        dangerouslySetInnerHTML={{ __html: itemContents }} 
        className={`${sanitizedHTML} ${styles.detailContents}`} 
      />
    </>
  );
}