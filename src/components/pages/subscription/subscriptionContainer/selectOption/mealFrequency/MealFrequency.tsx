import DefaultText from "@/components/common/defaultText/DefaultText";
import { selectOptionWrapper } from "../SelectOption.css";

export default function MealFrequency() {
  return (
    <div className={selectOptionWrapper}>
      <DefaultText type="title4">식사량</DefaultText>
    </div>
  )
}