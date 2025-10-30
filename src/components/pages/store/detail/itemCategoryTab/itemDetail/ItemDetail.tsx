import * as styles from './ItemDetail.css';
import { sanitizedHTML } from "@/styles/common.css";
import { useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import Text from "@/components/ui/text/Text";
import Divider from "@/components/ui/divider/Divider";

interface ItemDetailProps {
  contents: string;
  description: string;
}

export default function ItemDetail({
  contents,
  description,
}: ItemDetailProps) {
  const cleanHTML = DOMPurify.sanitize(contents) ?? '';
  const contentRef = useRef<HTMLDivElement>(null);

  // HTML 콘텐츠가 로드된 후 observer 재시작을 위한 이벤트 발생
  useEffect(() => {
    if (contentRef.current && cleanHTML) {
      // DOM이 변경되었음을 알리는 커스텀 이벤트 발생
      const event = new CustomEvent('contentLoaded', {
        detail: { element: contentRef.current }
      });
      window.dispatchEvent(event);
    }
  }, [cleanHTML]);

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
        ref={contentRef}
        className={`${sanitizedHTML} ${styles.detailContents}`}
      >
        {parse(cleanHTML)}
      </div>
    </>
  );
}