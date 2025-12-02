import { ReactNode } from "react";
import { mainContainer } from "@/components/pages/main/common/MainCommon.css";
import { MAIN_BACKGROUND_COLORS } from "@/constants/style";

interface MainContainerProps {
  children: ReactNode;
  className?: string;
  backgroundColor?: keyof typeof MAIN_BACKGROUND_COLORS;
  backgroundImage?: string;
  paddingBottom?: 0 | 10 | 40;
  paddingY?: 0 | 40;
}

export default function MainContainer({
  children,
  className,
  backgroundColor = "gray50",
  backgroundImage,
  paddingBottom = 40,
  paddingY = 40,
}: MainContainerProps) {
  return (
    <article
      className={`${mainContainer({
        paddingBottom,
        paddingY,
        backgroundColor,
      })} ${className || ""}`}
      style={{
        background: backgroundImage
          ? `url(${backgroundImage}) no-repeat bottom center / cover`
          : undefined,
      }}
    >
      {children}
    </article>
  );
}
