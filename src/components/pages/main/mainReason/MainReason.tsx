import * as styles from './MainReason.css';
import Image from "next/image";
import Link from "next/link";
import RightArrow from "/public/images/icons/right-arrow-red.svg";
import Text from '@/components/common/text/Text';
import { reasonBarfdogList } from "@/constants";
import { useBreakpoints } from "@/hooks/useBreakpoints";

const MainReason = () => {
  const { isMobile } = useBreakpoints();
  return (
    <article className={styles.mainReasonWrapper}>
      <Text type='title' size='titleLg' weight='bold'>
        따져 볼수록{isMobile && <br/>} 결론은 바프독
      </Text>
      <div style={{ margin: '4px 0 71px' }}>
        <Text type='description' size='sm' color='grey'>
          늘 곁에서 함께 도와드릴게요
        </Text>
      </div>
      <ul>
        {reasonBarfdogList.map(item => (
          <li key={item.key} className={styles.mainReasonListItem}>
            <div className={styles.mainReasonItemInfo}>
              <Text type='description' size='md' color='black' align='left'>
                {item.title}
              </Text>
              <div style={{ margin: '6px 0 12px' }}>
                <Text type='description' size='xs' color='grey' align='left'>
                  {!isMobile ? item.description : item.descriptionMobile}
                </Text>
              </div>
              {item.linkUrl &&
                <Link href={item.linkUrl} className={styles.mainReasonLink}>
                  {item.linkText} <RightArrow/>
                </Link>
              }
            </div>
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={128}
              height={117}
              className={styles.mainReasonImage}
            />
          </li>
        ))}
      </ul>
    </article>
  );
};

export default MainReason;