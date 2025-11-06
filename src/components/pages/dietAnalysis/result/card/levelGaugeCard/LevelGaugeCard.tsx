import Card from "@/components/ui/card/Card";
import { commonWrapper } from "@/styles/common.css";
import * as styles from "./LevelGaugeCard.css";
import Text from "@/components/ui/text/Text";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";

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
        <Text type="headline2">{label}</Text>
        <SvgIcon src={icon} color={iconColor} />
      </div>
      <div className={styles.gauge}>{bars}</div>
    </Card>
  );
}
