import Card from "@/components/common/card/Card";
import { commonWrapper } from "@/styles/common.css";
import * as styles from "./LevelGaugeCard.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

export interface LevelGaugeCardProps {
  segments: 3 | 5;
  level: number;
  color: "blue" | "yellow";
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}

export default function LevelGaugeCard({
  segments,
  level,
  color,
  icon,
  label,
}: LevelGaugeCardProps) {
  const iconColor = color === "blue" ? "blue300" : "yellow500";

  const bars = Array.from({ length: segments }, (_, i) => (
    <div
      key={i}
      className={styles.gaugeBar({ filled: i < level ? "on" : "off", color })}
      aria-hidden
    />
  ));

  return (
    <Card
      shadow="none"
      className={styles.resultCardStyle}
      padding={12}
      gap={12}
    >
      <div className={commonWrapper({ justify: "between" })}>
        <DefaultText type="headline2">{label}</DefaultText>
        <SvgIcon src={icon} color={iconColor} />
      </div>
      <div className={styles.gauge}>{bars}</div>
    </Card>
  );
}
