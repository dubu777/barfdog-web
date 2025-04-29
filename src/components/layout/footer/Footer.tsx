import * as styles from './Footer.css';
import Image from "next/image";
import Link from "next/link";
import Logo from '/public/images/logo/logo-white.png';
import DefaultText from "@/components/common/defaultText/DefaultText";

const footerInfo = [
  'CEO: 임경호 | 사업제안 및 문의: info@freshour.co.kr',
  '사업자등록번호: 351-87-02455 [사업자정보확인]',
  '통신판매업신고: 제 2022-충북충주-0578 호',
  '본사: 충청북도 충주시 번영대로 214, 1층',
  '연구소: 서울특별시 마포구 백범로31길 21, 305호',
]

const menuLink = [
  {
    label: '브랜드 소개',
    value: '/community/about',
  },
  {
    label: '공지사항',
    value: '/community/notice',
  },
  {
    label: 'FAQ',
    value: '/community/faq',
  },
  {
    label: 'Article',
    value: '/community/article',
  },
]

const policyMenuLink = [
  {
    label: 'Privacy policy',
    value: '/policy/privacy',
  },
  {
    label: 'Terms&Conditions',
    value: '/policy/terms',
  },
]
export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <h1 className={styles.logo}>
        <Image src={Logo} alt='logo' width={139} height={24} />
      </h1>
      <div className={styles.menuLinkBox}>
        {menuLink.map(menu => (
          <Link key={menu.value} href={menu.value} className={styles.menuLink}>
            <DefaultText type='label2' color='gray100'>
              {menu.label}
            </DefaultText>
          </Link>
        ))}
      </div>
      <div className={styles.footerInfo}>
        {footerInfo.map(text => (
          <DefaultText key={text} type='caption2' color='gray100' block>{text}</DefaultText>
        ))}
      </div>
      <div className={styles.policyMenuLinkBox}>
        {policyMenuLink.map((policy) => (
          <Link key={policy.value} href={policy.value} className={styles.policyMenuLink}>
            <DefaultText type='caption2' color='gray100'>
              {policy.label}
            </DefaultText>
          </Link>
        ))}
      </div>
      <DefaultText type='caption2' color='gray100' className={styles.footerInfo}>
        Copyright © 바프독 All Right Reserved.
      </DefaultText>
    </footer>
  )
}
