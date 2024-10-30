'use client';

import React from 'react';
import * as styles from './MainReason.css';
import Image from "next/image";
import Link from "next/link";

import RightArrow from "/public/images/icons/right-arrow-red.svg";
import {useBreakpoints} from "@/hooks/useBreakpoints";
import MainText from "@/components/pages/main/mainText/MainText";
import {reasonBarfdogList} from "@/constants/mainData";

const MainReason = () => {
  const { isMobile } = useBreakpoints();
  return (
    <article className={styles.mainReasonWrapper}>
      <MainText type='title' size='titleLg'>
        따져 볼수록{isMobile && <br/>} 결론은 바프독
      </MainText>
      <div style={{ margin: '4px 0 71px' }}>
        <MainText type='description' size='sm' color='grey'>
          늘 곁에서 함께 도와드릴게요
        </MainText>
      </div>
      <ul>
        {reasonBarfdogList.map(item => (
          <li key={item.key} className={styles.mainReasonListItem}>
            <div className={styles.mainReasonItemInfo}>
              <MainText type='description' size='md' color='black' align='left'>
                {item.title}
              </MainText>
              <div style={{ margin: '6px 0 12px' }}>
                <MainText type='description' size='xs' color='grey' align='left'>
                  {!isMobile ? item.description : item.descriptionMobile}
                </MainText>
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