import * as styles from './ItemDetail.css';
import { sanitizedHTML } from "@/styles/common.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
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
        <DefaultText className={styles.detailTip} type='body2' color='gray700'>
          상품 Tip!
        </DefaultText>
        <DefaultText type='label2' color='gray700'>
          {description}
        </DefaultText>
      </div>
      <Divider thickness={1} color='gray100' />
      <div 
        dangerouslySetInnerHTML={{ __html: itemContents }} 
        className={`${sanitizedHTML} ${styles.detailContents}`} 
      />
    </>
  );
}