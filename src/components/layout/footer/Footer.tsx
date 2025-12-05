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
import { footerInfo, menuLink, policyMenuLink } from "@/constants/main";

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

          <div
            className={commonWrapper({
              direction: "col",
              align: "start",
            })}
          >
            {footerInfo.map((text, idx, array) => (
              <div className={styles.footerInfoBox({ gap: 6 })}>
                <Text
                  key={text.left}
                  type="caption2"
                  color="gray50"
                  block
                  className={styles.footerInfoText}
                >
                  {text.left}
                </Text>
                <div className={styles.footerInfoText}>
                  {idx < array.length - 1 && (
                    <Divider direction="vertical" thickness={1} color="gray0" />
                  )}
                </div>
                <Text
                  key={text.right}
                  type="caption2"
                  color="gray50"
                  block
                  className={styles.footerInfoText}
                >
                  {text.right}
                </Text>
              </div>
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
