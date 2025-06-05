import { Fragment } from "react";
import * as styles from "./SliderQuestion.css";
import CheckCircle from "public/images/icons/check_circle.svg";
import SliderCircle from "/public/images/healthNote/dogpedia/slider_circle.svg";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Divider from "@/components/common/divider/Divider";

interface SliderQuestionProps {
  label: string;
  minLevel: string;
  maxLevel: string;
  value: number;
}

const SliderQuestion = ({
  label,
  minLevel,
  maxLevel,
  value,
}: SliderQuestionProps) => {
  return (
    <div>
      <DefaultText type="headline2">{label}</DefaultText>
      <div className={styles.sliderBox}>
        {[1, 2, 3, 4, 5].map((step) => {
          const active = value === step;
          return (
            <Fragment key={step}>
              <SvgIcon
                key={step}
                src={active ? CheckCircle : SliderCircle}
                size={active ? 28 : 20}
                color={active ? "red" : "gray300"}
              />
              {step !== 5 && <Divider thickness={1} color="gray300" />}
            </Fragment>
          );
        })}
      </div>
      <div className={styles.minMaxLevel}>
        <DefaultText type="caption" color="gray700">
          {minLevel}
        </DefaultText>
        <DefaultText type="caption" color="gray700">
          {maxLevel}
        </DefaultText>
      </div>
    </div>
  );
};

export default SliderQuestion;
