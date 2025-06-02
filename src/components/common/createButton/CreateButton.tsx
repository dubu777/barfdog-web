import * as styles from "./CreateButton.css";
import { useRouter } from "next/navigation";
import Button from "@/components/common/button/Button";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import AddIcon from "/public/images/icons/add-circle.svg";

interface CreateButtonProps {
  from: "dietAnalysis" | "healthNoteDog" | 'healthCheck';
  text?: string;
}

const CreateButton = ({ from, text }: CreateButtonProps) => {
  const router = useRouter();

  const handleNavigateToCreateDog = () => {
    switch (from) {
      case "dietAnalysis":
        window.location.href = "/diet-analysis/survey";
        break;
      case "healthNoteDog":
        router.push("/health-note/dogs/create");
        break;
      case "healthCheck":
        router.push("/health-note/health-check-history/create");
        break;
      default: return;
    }
  };

  return (
    <Button
      variant="outline"
      type="assistive"
      size="lg"
      fullWidth
      onClick={handleNavigateToCreateDog}
    >
      <DefaultText type="headline3" className={styles.createButton}>
        <SvgIcon src={AddIcon} />
        {text ? text : '새로운 아이 등록하기'}
      </DefaultText>
    </Button>
  );
};

export default CreateButton;
