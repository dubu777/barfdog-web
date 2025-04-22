import Header from "@/components/layout/header/Header";
import Spinner from "public/images/survey/dots-spinner.svg";
import Dog from "public/images/survey/result-dog.svg";
import * as styles from "./SurveyResultLoading.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { getNameWithPossessiveSuffix } from "@/utils";
import { commonWrapper } from "@/styles/common.css";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

interface SurveyResultLoadingProps {
  petName: string;
}

export default function SurveyResultLoading({
  petName,
}: SurveyResultLoadingProps) {
  return (
    <>
      <Header showCloseButton onClose={() => {}} />
      <div className={styles.surveyResultLoadingContainer}>
        <Spinner />
        <SvgIcon src={Dog} width={109} height={92.18} />
        <div className={commonWrapper({ gap: 8, direction: "col" })}>
          <div className={commonWrapper({ direction: "col" })}>
            <DefaultText type="title2">
              {getNameWithPossessiveSuffix(petName)}의
            </DefaultText>
            <DefaultText type="title2">
              1:1 맞춤 식단을 계산하고 있어요
            </DefaultText>
          </div>
          <div className={commonWrapper({ direction: "col" })}>
          <DefaultText type="body2" color="gray700">
            바프독은 보호자님의 반려견 정보를 기반으로
          </DefaultText>
          <DefaultText type="body2" color="gray700">
            맞춤형 식단을 도출하는
            알고리즘 서비스를 제공해드려요
          </DefaultText>
          </div>
        </div>
      </div>
    </>
  );
}
