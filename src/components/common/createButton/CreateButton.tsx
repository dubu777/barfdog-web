import { useRouter } from "next/navigation";
import Button from "@/components/common/button/Button";
import AddIcon from "/public/images/icons/add.svg";

interface CreateButtonProps {
  text?: string;
  url?: string;
  onClick?: () => void;
}

export default function CreateButton({
  text = "새로운 아이 등록하기",
  url,
  onClick,
}: CreateButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (url) {
      router.push(url);
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
      onClick={handleClick}
    >
      {text}
    </Button>
  );
}
