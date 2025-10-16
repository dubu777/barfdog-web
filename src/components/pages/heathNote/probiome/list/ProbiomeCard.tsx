import * as styles from "./ProbiomeList.css";
import Text from "@/components/common/text/Text";
import Chips from "@/components/common/chips/Chips";
import Button from "@/components/common/button/Button";
import Card from "@/components/common/card/Card";
import { ProbiomeStatus } from "@/types/healthNote/probiome";
import CheckIcon from "public/images/icons/check_small.svg";
import { commonWrapper } from "@/styles/common.css";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { getProbiomeStatusConfig } from "@/config/probiome";

interface ProbiomeCardProps {
  status: ProbiomeStatus;
  surveySubmittedDate: string;
  petName: string;
  downloadReportUrl?: string;
  onDetail: () => void;
  onReturn: () => void;
  onReportDownload: (url: string, memberName: string) => void;
}

export default function ProbiomeCard({
  status,
  surveySubmittedDate,
  petName,
  downloadReportUrl,
  onDetail,
  onReturn,
  onReportDownload,
}: ProbiomeCardProps) {
  const statusConfig = getProbiomeStatusConfig(status);

  return (
    <Card shadow="strong" gap={12} padding={12} align="start">
      <div className={styles.probiomeCardItem}>
        <Chips variant="solid" color={statusConfig.chipColor} borderRadius="lg">
          <div className={commonWrapper()}>
            {statusConfig.showIcon && (
              <SvgIcon
                src={CheckIcon}
                color={statusConfig.iconColor}
                size={18}
              />
            )}
            {statusConfig.label}
          </div>
        </Chips>
        <Text type="body3" color="gray600">
          {surveySubmittedDate}
        </Text>
      </div>
      <Text type="title4">{petName}</Text>
      <div className={styles.probiomeCardItem}>
        <Button
          variant="outline"
          intent="assistive"
          size="sm"
          fullWidth
          onClick={onDetail}
        >
          신청 상세
        </Button>
        {status === "SURVEY_SUBMITTED" && (
          <Button variant="outline" size="sm" fullWidth onClick={onReturn}>
            회수 신청
          </Button>
        )}
        {status === "REPORT_COMPLETED" && (
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => onReportDownload(downloadReportUrl!, petName)}
          >
            결과 다운로드
          </Button>
        )}
      </div>
    </Card>
  );
}
