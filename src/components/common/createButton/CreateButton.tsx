import { useRouter } from "next/navigation";
import Button from "@/components/common/button/Button";
import AddIcon from "/public/images/icons/add.svg";

interface CreateButtonProps {
  text?: string;
  url?: string;
  routeType?: "router" | "location";
  onClick?: () => void;
}

const CreateButton = ({
  text = "새로운 아이 등록하기",
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
      intent="assistive"
      size="lg"
      fullWidth
      icon={AddIcon}
      iconSize={24}
      onClick={handleNavigateToCreateDog}
    >
      {text}
    </Button>
  );
};

export default CreateButton;
