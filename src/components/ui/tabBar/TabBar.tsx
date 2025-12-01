import { ReactNode, useState } from "react";
import {
  tabBarButton,
  tabBarChipsActive,
  tabBarButtonWrapper,
  tabBarSlideItem,
  tabBarSlider,
  tabBarContainer,
} from "@/components/ui/tabBar/TabBar.css";
import Text from "@/components/ui/text/Text";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export interface Tab {
  label: string;
  value?: string;
  content?: ReactNode;
  onTabChange?: () => void;
}

interface TabBarProps {
  variant?: "text" | "segmentedButton" | "chips";
  tabs: Tab[];
  defaultIndex?: number;
  hasTabContent?: boolean;
  justify?: "center" | "between" | "start";
  className?: string;
  isScrollable?: boolean;
  onTabClick?: (index: number) => void;
  chipsActiveColor?: "gray800" | "red";
  borderRadius?: 20;
  fullWidth?: boolean;
}

export default function TabBar({
  variant = "segmentedButton",
  tabs = [],
  defaultIndex = 0,
  hasTabContent = false,
  justify = "start",
  className,
  isScrollable = false,
  onTabClick,
  chipsActiveColor = "red",
  borderRadius,
  fullWidth = false,
}: TabBarProps) {
  const VARIANT_CONFIG = {
    text: {
      textType: "label1",
      textColor: "gray300",
      activeTextColor: "gray900",
    },
    segmentedButton: {
      textType: "headline3",
      textColor: "gray300",
      activeTextColor: "white",
    },
    chips: {
      textType: "headline3",
      textColor: "gray600",
      activeTextColor: "white",
    },
  } as const;

  const config = VARIANT_CONFIG[variant];
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleTabChange = (index: number) => {
    setActiveIndex(index);
    tabs[index]?.onTabChange?.();
    onTabClick?.(index);
  };

  const TabButtonComponent = ({ tab, index }: { tab: Tab; index: number }) => {
    const isActive = activeIndex === index;
    const buttonClassName = tabBarButton({ variant, isActive });
    const chipsClassName =
      variant === "chips" && isActive
        ? tabBarChipsActive({ color: chipsActiveColor })
        : "";

    return (
      <button
        key={index}
        className={`${buttonClassName} ${chipsClassName}`.trim()}
        onClick={() => handleTabChange(index)}
      >
        <Text
          type={config.textType}
          color={isActive ? config.activeTextColor : config.textColor}
        >
          {tab.label}
        </Text>
      </button>
    );
  };

  return (
    <>
      <div
        className={`${tabBarContainer({ fullWidth })} ${
          className || ""
        }`.trim()}
      >
        {isScrollable ? (
          <Swiper
            spaceBetween={8}
            slidesPerView="auto"
            className={tabBarSlider}
          >
            {tabs.map((tab, index) => (
              <SwiperSlide key={index} className={tabBarSlideItem}>
                <TabButtonComponent tab={tab} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div
            className={tabBarButtonWrapper({ variant, justify, borderRadius })}
          >
            {tabs.map((tab, index) => (
              <TabButtonComponent key={index} tab={tab} index={index} />
            ))}
          </div>
        )}
      </div>
      {hasTabContent && tabs[activeIndex]?.content}
    </>
  );
}
