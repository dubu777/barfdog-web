import { imageWrapper } from "@/styles/common.css";
import Image from "next/image";
import DefaultImage from "public/images/foodong/default.png";

interface CardImageProps {
  imageUrl: string | null;
  name: string;
}

export default function CardImage({ imageUrl, name }: CardImageProps) {
  return (
    <Image
      src={imageUrl ? imageUrl : DefaultImage}
      alt={name}
      width={76}
      height={76}
      className={imageWrapper({ borderRadius: 8, width: 76 })}
    />
  );
}
