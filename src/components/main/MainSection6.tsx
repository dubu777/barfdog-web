import React from 'react';
import * as styles from './main.css';
import Image1 from "/public/images/main/section6-1.png";
import Image2 from "/public/images/main/section6-2.png";
import Image3 from "/public/images/main/section6-3.png";
import Image4 from "/public/images/main/section6-4.png";
import Image from "next/image";

interface ServicesByBarfdogListProps {
  key: string;
  title: string;
  description: string;
  imageUrl: string;
}

const servicesByBarfdogList: ServicesByBarfdogListProps[] = [
  {
    key: 'item1',
    title: '75만 건 이상의 빅데이터 기반\nAI 추천 알고리즘',
    description: '국내외 논문과 75만건 이상의 빅데이터로\nAI 맞춤 서비스를 제공합니다',
    imageUrl: Image1,
  },
  {
    key: 'item2',
    title: '100% 사람이 먹는 재료만\n사용하여 건강하게',
    description: '우리 가족이 먹을 수 있는 재료 이상의 품질로\n최상 등급의 식단을 제공합니다',
    imageUrl: Image2,
  },
  {
    key: 'item3',
    title: 'AAFCO는 물론\n제조실 ISO 국제 표준 인증으로 안전하게',
    description: '당연히 지켜야하는 AAFCO 기준 충족은 물론,\nNRC, Fediaf 기준까지 모두 충족합니다\n또한, 제조 시설은 ISO 22000, 9001, 14001의\n국제 표준 인증을 취득해 위생적으로 생산됩니다',
    imageUrl: Image3,
  },
  {
    key: 'item4',
    title: '선 주문 후 생산으로\n항상 신선하게',
    description: '15도 이하로 유지되는 인증 받은 자체 저온 시설에서\n주문 후 바로 만들어 신선하게 전달됩니다',
    imageUrl: Image4,
  },
]

const MainSection6 = () => {
  return (
    <article className={styles.mainSection6}>
      <div className={styles.mainSection6Box}>
        <h2
          className={styles.mainTitle({ size: 'size23' })}
          style={{ marginBottom: '12px' }}
        >
          내 가족이 먹는<br/>안심 식단
        </h2>
        <p className={styles.mainDescription({ size: 'size14' })}>비교해 볼수록, 고민해 볼수록, 찾아볼수록,<br/>바프독은 최고의 서비스를 제공합니다</p>
      </div>
      <ul className={styles.mainSection6Box}>
        {servicesByBarfdogList.map(item => (
          <li key={item.key} className={styles.mainSection6ListItem}>
            <h4 className={styles.mainTitle({ size: 'size16' })}>
              {item.title}
            </h4>
            <p
              className={styles.mainDescription({ size: 'size14' })}
              style={{ margin: '12px 0 17px', lineHeight: '20px' }}
            >
              {item.description}
            </p>
            <div>
              <Image src={item.imageUrl} alt={item.title} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>
          </li>
        ))}
      </ul>
      <p className={styles.mainDescription({ size: 'size14', color: 'black' })}>
        바프독의 제품 안심하고 드실 수 있도록<br/>항상 최선을 다해 만들겠습니다
      </p>
    </article>
  );
};

export default MainSection6;