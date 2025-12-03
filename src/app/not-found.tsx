import { commonWrapper } from "@/styles/common.css";
import Link from "next/link";
import LogoIcon from "public/images/logo/logo.svg";
import EmptyImage from "public/images/icons/404.svg";
import Text from "@/components/ui/text/Text";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Header from "@/components/layout/header/Header";
import Button from "@/components/ui/button/Button";

export default function NotFoundPage() {
  return (
    <main>
      <Header
        leftElement={
          <Link href="/" aria-label="홈">
            <LogoIcon />
          </Link>
        }
      />
      <section
        className={commonWrapper({
          minHeight: "fullWithHeader",
          backgroundColors: "gray50",
          direction: "col",
          gap: 12,
        })}
      >
        <SvgIcon src={EmptyImage} width={166} height={69} />
        <Text type="body2" color="gray600" align="center">
          현재 찾을 수 없는
          <br />
          페이지를 요청하셨습니다
        </Text>
        <Link href="/" aria-label="홈">
          <Button variant="solid" intent="secondary" size="sm">
            홈으로 이동
          </Button>
        </Link>
      </section>
    </main>
  );
}
