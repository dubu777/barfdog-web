import * as styles from "./SurveyResultLoading.css";
import Text from "@/components/ui/text/Text";
import { getNameWithPossessiveSuffix } from "@/utils";
import { commonWrapper } from "@/styles/common.css";
import SurveyLoader from "@/components/ui/loader/SurveyLoader";

interface SurveyResultLoadingProps {
  petName: string;
}

export default function SurveyResultLoading({
  petName,
}: SurveyResultLoadingProps) {
  return (
    <div className={styles.surveyResultLoadingContainer}>
      <SurveyLoader size="lg" />
      <div className={commonWrapper({ gap: 8, direction: "col" })}>
        <div className={commonWrapper({ direction: "col" })}>
          <Text type="title2">{getNameWithPossessiveSuffix(petName)}의</Text>
          <Text type="title2" className={styles.titleText}>
            1:1 맞춤 식단을{" "}
            <span className={styles.titleText}>계산하고 있어요</span>
          </Text>
        </div>
        <Text type="body2" color="gray700" align="center">
          바프독은 보호자님의 반려견 정보를 기반으로
          <br />
          <span className={styles.descriptionText}>
            맞춤형 식단을 도출하는 알고리즘 서비스를{" "}
          </span>
          <span className={styles.descriptionText}>제공해 드려요</span>
        </Text>
      </div>
    </div>
  );
}
