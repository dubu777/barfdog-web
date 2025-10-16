'use client';
import * as styles from './Footer.css';
import Image from "next/image";
import Link from "next/link";
import Logo from '/public/images/logo/logo-white.png';
import Text from "@/components/common/text/Text";
import { usePathname } from "next/navigation";
import { saveEntryPoint } from "@/utils/navigationEntry";
import useModal from '@/hooks/useModal';
import PrivacyPolicy from '@/components/layout/footer/termsModal/PrivacyPolicy';
import ServicePolicy from '@/components/layout/footer/termsModal/ServicePolicy';

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
    value: '/about',
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
    label: '아티클',
    value: '/community/article',
  },
]

const policyMenuLink = [
  {
    label: 'Privacy policy',
    value: 'privacy',
  },
  {
    label: 'Terms&Conditions',
    value: 'service',
  },
]

interface FooterProps {
  showMenu?: boolean;
}

export default function Footer({ showMenu = true }: FooterProps) {
  const pathname = usePathname();

  const { isOpen: isPrivacyModalOpen, onToggle: onPrivacyModalToggle, onClose: onPrivacyModalClose } = useModal();
  const { isOpen: isServicePolicyModalOpen, onToggle: onServicePolicyModalToggle, onClose: onServicePolicyModalClose } = useModal();

  // 커뮤니티 링크 클릭 시 진입 경로 저장
  const handleLinkClick = (url: string) => {
    saveEntryPoint(
      url, 
      pathname,
      (_, target) => target.startsWith('/community/')
    );
  };

  const handlePolicyModalToggle = (type: 'privacy' | 'service') => {

    console.log(type);
    if (type === 'privacy') {
      onPrivacyModalToggle();
    } else {
      onServicePolicyModalToggle();
    }
  };

  console.log('isPrivacyModalOpen', isPrivacyModalOpen);
  console.log('isServicePolicyModalOpen', isServicePolicyModalOpen);
  

  return (
    <>
      <footer className={styles.footerContainer}>
        <h1 className={styles.logo}>
          <Image src={Logo} alt='logo' width={139} height={24} />
        </h1>
        {showMenu && 
          <div className={styles.menuLinkBox}>
            {menuLink.map(menu => (
              <Link 
                key={menu.value} 
                href={menu.value} 
                className={styles.menuLink}
                onClick={() => handleLinkClick(menu.value)}
              >
                <Text type='headline3' color='gray0'>
                  {menu.label}
                </Text>
              </Link>
            ))}
          </div>
        }
        <div className={styles.footerInfo}>
          {footerInfo.map(text => (
            <Text key={text} type='caption2' color='gray50' block>{text}</Text>
          ))}
        </div>
        <div className={styles.policyMenuLinkBox}>
          {policyMenuLink.map((policy) => (
            <button 
              key={policy.value} 
              className={styles.policyMenuLink}
              onClick={() => handlePolicyModalToggle(policy.value as 'privacy' | 'service')}
            >
              <Text type='caption2' color='gray0'>
                {policy.label}
              </Text>
            </button>
          ))}
        </div>
        <Text type='caption2' color='gray50' className={styles.footerInfo}>
          Copyright © 바프독 All Right Reserved.
        </Text>
      </footer>
      {isPrivacyModalOpen && <PrivacyPolicy isOpen={isPrivacyModalOpen} onClose={onPrivacyModalClose} />}
      {isServicePolicyModalOpen && <ServicePolicy isOpen={isServicePolicyModalOpen} onClose={onServicePolicyModalClose} />}
    </>
  )
}

