'use client';

import { useState } from "react";
import * as styles from './Footer.css';
import Image from "next/image";
import Link from "next/link";
import FooterArrow from '/public/images/icons/footer-arrow.png';
import { commonLayoutStyle } from "@/styles/common.css";
import { useBannerStore } from "@/store/mainStore";
import { motion } from "framer-motion";

const footerData = [
  {
    key: '사업자등록번호.',
    value: '351-87-02455    사업자정보확인',
  },
  {
    key: '통신판매업신고.',
    value: '제 2022-충북충주-0578호',
  },
  {
    key: '사업제안 및 문의.',
    value: 'info@freshour.co.kr',
  },
  {
    key: '본사.',
    value: '충북 충주시 번영대로 214, 1층',
  },
  {
    key: '연구소.',
    value: '서울특별시 마포구 백범로31길 21, 607호',
  },
]

export default function Footer() {
  const { isBottomBannerVisible } = useBannerStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <footer className={`${commonLayoutStyle} ${styles.footerContainer({ isBottomBannerVisible: isBottomBannerVisible })}`}>
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.footerButton({ open: isOpen })}
        >
          (주)프레쉬아워 Freshour INC.
          <motion.span
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 },
            }}
            transition={{ duration: 0.2 }}
            style={{ originY: 0.55 }}
          >
            <Image src={FooterArrow} alt='footer detail button' width={10} height={10} style={{ height: 'auto' }} />
          </motion.span>
        </button>
        <div className={styles.footerInfo({ open: isOpen })}>
          <p className={styles.footerText}>CEO. 임경호</p>
          {footerData.map(info => (
            <p className={styles.footerText} key={info.key}>
              <b>{info.key}</b><span>{info.value}</span>
            </p>
          ))}
          <ul className={styles.footerPolicy}>
            <li className={styles.footerText}>
              <Link href='/policy/privacy'>Privacy policy</Link>
            </li>
            <li className={`${styles.footerText} ${styles.terms}`}>
              <Link href='/policy/terms'>Terms&Conditions</Link>
            </li>
          </ul>
        </div>
      </motion.div>
    </footer>
  )
}
