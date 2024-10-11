import React from 'react';
import * as styles from './main.css';
import Image1 from "/public/images/main/section4-1.png";
import Image2 from "/public/images/main/section4-2.png";
import Image3 from "/public/images/main/section4-3.png";
import Image from "next/image";
import Link from "next/link";

interface ReasonWhyBarfdogListProps {
  key: string;
  title: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
  imageUrl: string;
}

const reasonWhyBarfdogList: ReasonWhyBarfdogListProps[] = [
  {
    key: 'item1',
    title: '수의 영양사가 설계한 레시피',
    description: '육고기, 뼈, 내장, 채소, 영양제의\n완벽한 포뮬러로 우리 아이에게\n맞춤 식단을 제공합니다',
    linkText: 'AI 추천 문진 진행하기 ->',
    linkUrl: '/survey',
    imageUrl: Image1,
  },
  {
    key: 'item2',
    title: '한 끼 한 팩\n편리하게 소분된 맞춤 식단',
    description: '위생적인 저온 생산 공정 후\n멸균 처리된 한 끼 한 팩 식사를\n간편하게 급여할 수 있습니다',
    imageUrl: Image2,
  },
  {
    key: 'item3',
    title: '어렵다면\n모든 과정 상담 가능',
    description: '설문 및 플랜 선택이 조금 어려우신가요?\n더 궁금하신 부분이 있으시면\n바프독 전문 상담팀이 도와드리겠습니다',
    linkText: '상담하러 가기 ->',
    linkUrl: 'https://36o2x.channel.io/home',
    imageUrl: Image3,
  },
]

const MainSection4 = () => {
  return (
    <article className={styles.mainSection4}>
      <h2 className={styles.mainTitle({ size: 'size23' })}>
        따져 볼수록<br/>결론은 바프독
      </h2>
      <p
        className={styles.mainDescription({ size: 'size14' })}
        style={{ margin: '8px 0 41px' }}
      >
        늘 곁에서 함께 도와드릴게요</p>
      <ul>
        {reasonWhyBarfdogList.map(item => (
          <li key={item.key} className={styles.mainSection4ListItem}>
            <div className={styles.mainSection4ItemInfo}>
              <h4 className={styles.mainDescription({ size: 'size15', color: 'black', align: 'left' })}>
                {item.title}
              </h4>
              <p
                className={styles.mainDescription({ size: 'size12', align: 'left' })}
                style={{ margin: '9px 0 14px' }}
              >
                {item.description}
              </p>
              {item.linkUrl &&
                <Link href={item.linkUrl} className={`${styles.mainLink({ type: 'text', align: 'left' })} ${styles.flexRow}`}>
                  {item.linkText}
                </Link>
              }
            </div>
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={128}
              height={117}
              className={styles.mainSection4Image}
            />
          </li>
        ))}
      </ul>
    </article>
  );
};

export default MainSection4;