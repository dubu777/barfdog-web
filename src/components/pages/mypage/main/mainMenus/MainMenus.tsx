"use client";
import { commonWrapper } from "@/styles/common.css";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Text from "@/components/ui/text/Text";
import Divider from "@/components/ui/divider/Divider";
import ListDivider from "@/components/ui/listDivider/ListDivider";
import { saveEntryPoint } from "@/utils/navigationEntry";
import { MENU_LIST } from "@/constants/mypage/common";
import { useLogout } from "@/api/auth/mutations/useLogout";

export default function MainMenus() {
  const pathname = usePathname();

  const { mutate: logout } = useLogout();

  // 커뮤니티 링크 클릭 시 진입 경로 저장
  const handleCommunityLinkClick = (url: string) => {
    saveEntryPoint(url, pathname, (_, target) =>
      target.startsWith("/community/")
    );
  };
  const handleLogout = () => {
    logout(undefined);
  };
  return (
    <article>
      <div
        className={commonWrapper({
          padding: 20,
          direction: "col",
          gap: 16,
          align: "start",
          backgroundColors: "gray0",
        })}
      >
        {MENU_LIST.map(({ category, menus }) => (
          <div
            key={category}
            className={commonWrapper({
              direction: "col",
              align: "start",
            })}
          >
            <Text
              type="headline1"
              className={commonWrapper({
                paddingTop: 20,
                paddingBottom: 16,
                justify: "start",
              })}
            >
              {category}
            </Text>
            <Divider height={2} color="gray900" />
            <ul className={commonWrapper({ direction: "col" })}>
              {menus.map(({ label, url, action }, index) => (
                <Fragment key={label}>
                  <li
                    className={commonWrapper({
                      paddingY: 16,
                    })}
                  >
                    {url ? (
                      <Link
                        href={url ?? "/mypage"}
                        className={commonWrapper({ justify: "start" })}
                        onClick={() =>
                          handleCommunityLinkClick(url ?? "/mypage")
                        }
                      >
                        <Text type="body1">{label}</Text>
                      </Link>
                    ) : (
                      action && (
                        <button
                          onClick={action}
                          className={commonWrapper({ justify: "start" })}
                        >
                          <Text type="body1">{label}</Text>
                        </button>
                      )
                    )}
                  </li>
                  <ListDivider
                    listLength={menus.length}
                    index={index}
                    color="gray200"
                  />
                </Fragment>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        className={commonWrapper({
          paddingX: 20,
          paddingTop: 16,
          paddingBottom: 60,
          backgroundColors: "gray50",
          justify: "start",
        })}
      >
        <button
          onClick={handleLogout}
          className={commonWrapper({
            paddingY: 4,
            justify: "start",
          })}
        >
          <Text type="body2">로그아웃</Text>
        </button>
      </div>
    </article>
  );
}
