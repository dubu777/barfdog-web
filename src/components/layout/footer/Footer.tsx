"use client";
import * as styles from "./Footer.css";
import Link from "next/link";
import Text from "@/components/ui/text/Text";
import { usePathname } from "next/navigation";
import { saveEntryPoint } from "@/utils/navigationEntry";
import useModal from "@/hooks/useModal";
import PrivacyPolicyModal from "@/components/layout/footer/termsModal/PrivacyPolicyModal";
import ServicePolicyModal from "@/components/layout/footer/termsModal/ServicePolicyModal";
import { commonWrapper } from "@/styles/common.css";
import Divider from "@/components/ui/divider/Divider";

const footerInfo = [
  "주식회사 프레쉬아워",
  "CEO : 임경호",
  "제안 및 문의 : info@freshour.co.kr",
  "대표번호 : 043-855-4995",
  "사업자등록번호 : 351-87-02455",
  "통신판매업신고 : 제 2022-충북충주-0578 호",
  "본사 : 충청북도 충주시 번영대로 214, 1층",
  "연구소 : 서울 관악구 봉천로 545, 202호",
];

const menuLink = [
  {
    label: "브랜드 소개",
    value: "/about",
  },
  {
    label: "공지사항",
    value: "/community/notice",
  },
  {
    label: "FAQ",
    value: "/community/faq",
  },
  {
    label: "아티클",
    value: "/community/article",
  },
];

const policyMenuLink = [
  {
    label: "Privacy policy",
    value: "privacy",
  },
  {
    label: "Terms&Conditions",
    value: "service",
  },
];

interface FooterProps {
  showMenu?: boolean;
}

export default function Footer({ showMenu = true }: FooterProps) {
  const pathname = usePathname();

  const {
    isOpen: isPrivacyModalOpen,
    onToggle: onPrivacyModalToggle,
    onClose: onPrivacyModalClose,
  } = useModal();
  const {
    isOpen: isServicePolicyModalOpen,
    onToggle: onServicePolicyModalToggle,
    onClose: onServicePolicyModalClose,
  } = useModal();

  // 커뮤니티 링크 클릭 시 진입 경로 저장
  const handleLinkClick = (url: string) => {
    saveEntryPoint(url, pathname, (_, target) =>
      target.startsWith("/community/")
    );
  };

  const handlePolicyModalToggle = (type: "privacy" | "service") => {
    console.log(type);
    if (type === "privacy") {
      onPrivacyModalToggle();
    } else {
      onServicePolicyModalToggle();
    }
  };

  return (
    <>
      <footer className={styles.footerContainer}>
        <div
          className={commonWrapper({
            direction: "col",
            gap: 12,
            align: "start",
          })}
        >
          {showMenu && (
            <div className={commonWrapper({ gap: 28, justify: "start" })}>
              {menuLink.map((menu) => (
                <Link
                  key={menu.value}
                  href={menu.value}
                  onClick={() => handleLinkClick(menu.value)}
                >
                  <Text type="headline3" color="gray0">
                    {menu.label}
                  </Text>
                </Link>
              ))}
            </div>
          )}

          <div className={styles.footerInfoBox({ gap: 6 })}>
            {footerInfo.map((text, idx, array) => (
              <>
                <Text
                  key={text}
                  type="caption2"
                  color="gray50"
                  block
                  className={styles.footerInfoText}
                >
                  {text}
                </Text>
                <div className={styles.footerInfoText}>
                  {idx < array.length - 1 && (
                    <Divider direction="vertical" thickness={1} color="gray0" />
                  )}
                </div>
              </>
            ))}
          </div>

          <div className={styles.footerInfoBox({ gap: 12 })}>
            {policyMenuLink.map((policy, idx, array) => (
              <>
                <button
                  className={styles.footerInfoText}
                  key={policy.value}
                  onClick={() =>
                    handlePolicyModalToggle(
                      policy.value as "privacy" | "service"
                    )
                  }
                >
                  <Text type="caption2" color="gray0">
                    {policy.label}
                  </Text>
                </button>
                <div className={styles.footerInfoText}>
                  {idx < array.length - 1 && (
                    <Divider direction="vertical" thickness={1} color="gray0" />
                  )}
                </div>
              </>
            ))}
            <Text type="caption2" color="gray50">
              Copyright © 바프독 All Right Reserved.
            </Text>
          </div>
        </div>
      </footer>
      {isPrivacyModalOpen && (
        <PrivacyPolicyModal
          isOpen={isPrivacyModalOpen}
          onClose={onPrivacyModalClose}
        />
      )}
      {isServicePolicyModalOpen && (
        <ServicePolicyModal
          isOpen={isServicePolicyModalOpen}
          onClose={onServicePolicyModalClose}
        />
      )}
    </>
  );
}
