import * as styles from "./CreateButton.css";
import { useRouter } from "next/navigation";
import Button from "@/components/common/button/Button";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import AddIcon from "/public/images/icons/plus.svg";

interface CreateButtonProps {
  text?: string;
  url?: string;
  routeType?: 'router' | 'location';
  onClick?: () => void;
}

const CreateButton = ({ text, url, routeType = 'router', onClick }: CreateButtonProps) => {
  const router = useRouter();

  const handleNavigateToCreateDog = () => {
    if (onClick) {
      onClick();
      return;
    }

    if(url) {
      if (routeType === 'router') {
        window.location.href = url;
      } else {
        router.push(url);
      }
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
        <SvgIcon src={AddIcon} size={24} />
        {text ? text : '새로운 아이 등록하기'}
      </DefaultText>
    </Button>
  );
};

export default CreateButton;
