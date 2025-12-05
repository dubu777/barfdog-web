import * as styles from "./CircleProgressBar.css";
import { ComponentType, SVGProps, useEffect, useState } from "react";
import { animate, cubicBezier } from "framer-motion";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Text from "@/components/ui/text/Text";
import { fontColors } from "@/components/ui/text/Text.css";
import { COLORS } from "@/constants/style";
import { getSimpleHealthStatus } from "@/utils/healthNote/common/getHealthStatus";

interface CircleProgressBarProps {
  score: number; // 0 ~ 100
  svgImage?: ComponentType<SVGProps<SVGSVGElement>>;
  hasFontColor?: boolean;
}

const circleFullDegree = 360;
const displayDegree = 270;
const radius = 120;
const stroke = 12;

export default function CircleProgressBar({
  score,
  svgImage,
  hasFontColor,
}: CircleProgressBarProps) {
  const [animatedScore, setAnimatedScore] = useState<number>(0);

  const strongMiddleEase = cubicBezier(0.4, 0.0, 0.2, 1.0);
  useEffect(() => {
    const controls = animate(0, score, {
      duration: 1.3,
      ease: strongMiddleEase,
      onUpdate: (latest) => {
        setAnimatedScore(latest);
      },
    });

    return () => {
      controls.stop();
    };
  }, [score]);

  const displayScore = Math.round(animatedScore);

  // 애니메이션되는 현재 점수를 기준으로 상태/색상 계산
  const { label, color } = getSimpleHealthStatus(displayScore, "400");

  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const progressRatio = displayScore / 100;
  const totalArcLength = (displayDegree / circleFullDegree) * circumference;
  const progressLength = progressRatio * totalArcLength;

  const strokeDasharray = `${progressLength} ${circumference}`;
  const strokeDashoffset = 0;

  return (
    <div className={styles.circleProgressBox}>
      <svg width="240" height="240" className={styles.svg}>
        {/* 배경 원 */}
        <circle
          className={styles.circleBackground}
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="120"
          cy="120"
          strokeDasharray={`${totalArcLength} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-135 120 120)"
        />
        {/* 진행 원 (애니메이션 대상) */}
        <circle
          className={`${styles.circleProgressBase} ${
            styles.circleProgressColor[
              color as keyof typeof styles.circleProgressColor
            ]
          }`}
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="120"
          cy="120"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-135 120 120)"
        />
      </svg>

      <Text type="label2" color="gray700" className={styles.centerLabel}>
        {label}
      </Text>

      <div className={styles.centerContent}>
        <Text
          type="display2"
          color={hasFontColor ? (color as keyof typeof fontColors) : "gray700"}
        >
          {displayScore}점
        </Text>

        {svgImage && (
          <SvgIcon
            src={svgImage}
            size={100}
            color={color as keyof typeof COLORS}
          />
        )}

        <Text type="headline4" color="gray700" className={styles.leftLabel}>
          0
        </Text>
        <Text type="headline4" color="gray700" className={styles.rightLabel}>
          100
        </Text>
      </div>
    </div>
  );
}
