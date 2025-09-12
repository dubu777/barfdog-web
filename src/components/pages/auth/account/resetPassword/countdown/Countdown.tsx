import Text from "@/components/common/text/Text";
import { useCountdown } from "@/hooks/useCountdown";
import { pointColor } from "@/styles/common.css";
import { parseYmdHms } from "@/utils/datetime/parseYmdHms";

interface CountdownProps {
  targetDate: string;
  sourceTz?: "local" | "utc";
  onExpiry?: () => void;
  className?: string;
}

export default function Countdown({
  targetDate,
  sourceTz = "utc",
  onExpiry,
  className,
}: CountdownProps) {
  const targetMs = parseYmdHms(targetDate, sourceTz);
  const { formatted } = useCountdown(targetMs, {
    onExpire: onExpiry,
    stopOnExpire: true,
  });

  return (
    <div className={className}>
      <Text type="label4" color="gray700">
        인증세션 유효시간 <span className={pointColor}>{formatted}</span>
      </Text>
    </div>
  );
}
