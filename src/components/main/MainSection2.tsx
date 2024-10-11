import React from 'react';
import * as styles from './main.css';

const MainSection2 = () => {
  return (
    <article className={styles.mainSection2}>
      <h2
        className={styles.mainTitle({ size: 'size23' })}
        style={{ marginBottom: '4px' }}
      >
        반려견 건강에 고민이 있다면?
      </h2>
      <p
        className={styles.mainDescription({ size: 'size14', color: 'default' })}
      >
        75만 데이터 기반 고민별 상품 추천
      </p>
    </article>
  );
};

export default MainSection2;