import { useRouter } from "next/navigation";
import Button from "@/components/common/button/Button";
import Text from "@/components/common/text/Text";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { commonWrapper } from "@/styles/common.css";
import AddIcon from "/public/images/icons/add.svg";

interface CreateButtonProps {
  text?: string;
  url?: string;
  routeType?: "router" | "location";
  onClick?: () => void;
}

const CreateButton = ({
  text,
  url,
  routeType = "router",
  onClick,
}: CreateButtonProps) => {
  const router = useRouter();

  const handleNavigateToCreateDog = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (url) {
      if (routeType === "router") {
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
      <Text type="headline3" className={commonWrapper({ gap: 6 })}>
        <SvgIcon src={AddIcon} size={24} color="gray900" />
        {text ? text : "새로운 아이 등록하기"}
      </Text>
    </Button>
  );
};

export default CreateButton;
