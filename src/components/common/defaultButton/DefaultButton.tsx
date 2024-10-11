'use client';

import { surveyTitle } from '@/app/survey/Survey.css';
import * as styles from './DefaultButton.css';

interface DefaultButtonProps {
  label: string;
  icon?: JSX.Element; // 아이콘은 optional
  onClick: () => void;
}

export default function DefaultButton({ label, icon, onClick }: DefaultButtonProps) {


  return (
    <button onClick={onClick} className={styles.defaultButtonStyle}>
      {icon && <></>} {/* 아이콘이 있으면 렌더링 */}
      {label}
  </button>
  )
}
