'use client';

import React from 'react';
import * as styles from './main.css';
import Image from "next/image";
import Link from "next/link";
import Image1 from "/public/images/main/reason-1.png";
import Image2 from "/public/images/main/reason-2.png";
import Image3 from "/public/images/main/reason-3.png";
import RightArrow from "/public/images/icons/right-arrow-red.svg";
import {useBreakpoints} from "@/hooks/useBreakpoints";

interface ReasonWhyBarfdogListProps {
  key: string;
  title: string;
  description: string;
  descriptionMobile?: string;
  linkText?: string;
  linkUrl?: string;
  imageUrl: string | StaticImageData;
}

const reasonWhyBarfdogList: ReasonWhyBarfdogListProps[] = [
  {
    key: 'item1',
    title: '수의 영양사가 설계한 레시피',
    description: '육고기, 뼈, 내장, 채소, 영양제의 완벽한 포뮬러로\n우리 아이에게 맞춤 식단을 제공합니다',
    descriptionMobile: '육고기, 뼈, 내장, 채소, 영양제의\n완벽한 포뮬러로우리 아이에게\n맞춤 식단을 제공합니다',
    linkText: 'AI 추천 문진 진행하기',
    linkUrl: '/survey',
    imageUrl: Image1,
  },
  {
    key: 'item2',
    title: '한 끼 한 팩\n편리하게 소분된 맞춤 식단',
    description: '위생적인 저온 생산 공정 후 멸균 처리된 한 끼 한 팩 식사를\n간편하게 급여할 수 있습니다',
    descriptionMobile: '위생적인 저온 생산 공정 후\n멸균 처리된 한 끼 한 팩 식사를\n간편하게 급여할 수 있습니다',
    imageUrl: Image2,
  },
  {
    key: 'item3',
    title: '어렵다면\n모든 과정 상담 가능',
    description: '설문 및 플랜 선택이 조금 어려우신가요?\n더 궁금하신 부분이 있으시면 바프독 전문 상담팀이 도와드리겠습니다',
    descriptionMobile: '설문 및 플랜 선택이 조금 어려우신가요?\n더 궁금하신 부분이 있으시면\n바프독 전문 상담팀이 도와드리겠습니다',
    linkText: '상담하러 가기',
    linkUrl: 'https://36o2x.channel.io/home',
    imageUrl: Image3,
  },
]

const MainReason = () => {
  const { isMobile } = useBreakpoints();
  return (
    <article className={styles.mainReasonWrapper}>
      <h2 className={styles.mainTitle({ size: 'titleLg' })}>
        따져 볼수록{isMobile && <br/>} 결론은 바프독
      </h2>
      <p
        className={styles.mainDescription({ size: 'sm' })}
        style={{ margin: '4px 0 71px' }}
      >
        늘 곁에서 함께 도와드릴게요</p>
      <ul>
        {reasonWhyBarfdogList.map(item => (
          <li key={item.key} className={styles.mainReasonListItem}>
            <div className={styles.mainReasonItemInfo}>
              <h4 className={styles.mainDescription({ size: 'md', color: 'black', align: 'left' })}>
                {item.title}
              </h4>
              <p
                className={styles.mainDescription({ size: 'xs', align: 'left' })}
                style={{ margin: '6px 0 12px' }}
              >
                {!isMobile ? item.description : item.descriptionMobile}
              </p>
              {item.linkUrl &&
                <Link href={item.linkUrl} className={`${styles.mainLink({ type: 'text', align: 'left' })} ${styles.flexRow}`}>
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