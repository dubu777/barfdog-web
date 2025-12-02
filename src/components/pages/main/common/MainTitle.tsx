import { ReactNode } from "react";
import { mainTitle } from "@/components/pages/main/common/MainCommon.css";
import Text from "@/components/ui/text/Text";
import FadeInInteraction from "@/components/pages/main/common/FadeInInteraction";

interface MainTitleProps {
  title: string | ReactNode;
  subTitle: string | ReactNode;
  align?: "center" | "left";
  hasInteraction?: boolean;
  noPaddingTop?: boolean;
  paddingTop?: 0 | 60;
}

export default function MainTitle({
  title,
  subTitle,
  align = "center",
  hasInteraction = false,
  noPaddingTop = false,
  paddingTop = 0,
}: MainTitleProps) {
  const ContentElement = () => (
    <div className={mainTitle({ align, noPaddingTop, paddingTop })}>
      <Text type="title2" align={align} preLine>
        {title}
      </Text>
      <Text type="body2" align={align} preLine>
        {subTitle}
      </Text>
    </div>
  );
  return hasInteraction ? (
    <FadeInInteraction>
      <ContentElement />
    </FadeInInteraction>
  ) : (
    <ContentElement />
  );
}
