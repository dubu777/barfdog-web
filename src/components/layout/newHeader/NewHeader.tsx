import React from "react";
import * as styles from "./NewHeader.css"; // 스타일 파일 (예시)

interface NewHeaderProps {
  /** 헤더 왼쪽 영역에 들어갈 요소(뒤로가기 버튼, 로고 등) */
  leftElement?: React.ReactNode;
  /** 헤더 중앙 영역에 들어갈 요소(텍스트 타이틀, 로고 등) */
  centerElement?: React.ReactNode;
  /** 헤더 오른쪽 영역에 들어갈 요소(장바구니 아이콘, 닫기 버튼 등) */
  rightElement?: React.ReactNode;
  /** style 객체를 직접 넘겨서 적용하고 싶을 때 */
  style?: React.CSSProperties;
}


export default function NewHeader({
  leftElement,
  centerElement,
  rightElement,
  style,
}: NewHeaderProps) {
  return (
    <header className={`${styles.headerContainer}`} style={style}>
      <div className={styles.leftSlot}>{leftElement}</div>
      <div className={styles.centerSlot}>{centerElement}</div>
      <div className={styles.rightSlot}>{rightElement}</div>
    </header>
  );
}