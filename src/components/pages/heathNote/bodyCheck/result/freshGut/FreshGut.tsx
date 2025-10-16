import { commonWrapper } from "@/styles/common.css";
import {
  freshGutButton,
  freshGutImage,
  freshGutImageBox,
  freshGutInfo,
  freshGutInfoBox,
  freshGutLogoImage,
  freshGutSubText,
  freshGutText,
  freshGutTextBox,
} from "../BodyCheckResult.css";
import Microbe from "public/images/healthNote/body-check/microbe.svg";
import ProbiomeImage from "public/images/healthNote/body-check/probiome.jpg";
import FreshGutImage from "public/images/healthNote/body-check/freshGut.svg";
import LogoImage from "public/images/logo/logo-default.png";
import ResultCard from "../../../common/resultCard/ResultCard";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Text from "@/components/common/text/Text";
import Image from "next/image";
import Button from "@/components/common/button/Button";
import { useRouter } from "next/navigation";

interface FreshGutProps {
  petId: number;
}

export default function FreshGut({ petId }: FreshGutProps) {
  const router = useRouter();
  return (
    <ResultCard
      gap={20}
      title={`장내 미생물 균형이 무너지면\n위장이 예민해질 수 있어요`}
    >
      <div className={freshGutInfoBox}>
        <div className={commonWrapper({ gap: 6, justify: "start" })}>
          <SvgIcon src={Microbe} size={24} />
          <Text type="headline2" color="red">
            장내 미생물 균형
          </Text>
        </div>
        <Text type="body3" color="gray700">
          장염이나 설사처럼 자주 반복되는 증상은 장내 미생물 균형이 무너졌다는
          신호일 수 있어요 우리 아이의 장 속 미생물을 확인하여 관리해보세요
        </Text>
      </div>
      <div className={freshGutImageBox}>
        <Image
          src={ProbiomeImage}
          alt="kit"
          width={600}
          height={360}
          className={freshGutImage}
        />
        <div className={freshGutInfo}>
          <Image
            src={LogoImage}
            alt="kit"
            width={200}
            height={16}
            className={freshGutLogoImage}
          />
          <div className={freshGutTextBox}>
            <SvgIcon src={FreshGutImage} width={184} height={35} />
            <Text type="label4" color="white" className={freshGutText}>
              반려견 맞춤 건강 관리 장내 미생물 분석 키트
            </Text>
            <Text type="caption2" color="white" className={freshGutSubText}>
              마이크로바이옴 진단 + 맞춤 식이 솔루션
            </Text>
          </div>
          <Button
            onClick={() => router.push(`/health-note/${petId}/probiome`)}
            variant="outline"
            intent="primary"
            className={freshGutButton}
          >
            진단 키트 보러가기
          </Button>
        </div>
      </div>
    </ResultCard>
  );
}
