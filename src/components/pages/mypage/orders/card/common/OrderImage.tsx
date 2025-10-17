import { imageWrapper } from "@/styles/common.css";
import Image from "next/image";

interface OrderImageProps {
  thumbnailUrl: string;
  itemName: string;
}

export default function OrderImage({ thumbnailUrl, itemName }: OrderImageProps) {
  return (
    <Image
      src={thumbnailUrl}
      alt={itemName}
      width={76}
      height={76}
      className={imageWrapper({ borderRadius: 8, width: 76 })}
    />
  );
}