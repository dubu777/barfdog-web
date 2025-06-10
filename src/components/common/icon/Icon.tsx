import React from "react";
import Image, { ImageProps } from "next/image";

interface IconProps extends Omit<ImageProps, "src"> {
  name: string; // 아이콘 이름 (이미지 경로를 결정)
  ext?: "svg" | "png" | "jpg"; // 확장자 (기본값: svg)
  size?: number;
  alt: string;
}

export default function Icon({
  name,
  ext = "svg",
  size = 18, // 기본 크기 18px
  alt,
  ...rest // image prop
}: IconProps) {
  return (
    <Image
      src={`/images/icons/${name}.${ext}`}
      width={size}
      height={size}
      alt={alt}
      {...rest}
    />
  );
}
