import { ReactNode, useState } from "react";
import {
  tabBarButton,
  tabBarButtonWrapper,
  tabBarSlideItem,
  tabBarSlider,
  tabBarContainer,
} from "@/components/ui/tabBar/TabBar.css";
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
  borderRadius?: boolean;
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
  borderRadius = false,
  fullWidth = false,
}: TabBarProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleTabChange = (index: number) => {
    setActiveIndex(index);
    tabs[index]?.onTabChange?.();
    onTabClick?.(index);
  };

  const TabButtonComponent = ({ tab, index }: { tab: Tab; index: number }) => {
    const isActive = activeIndex === index;

    return (
      <button
        key={index}
        className={tabBarButton({
          variant,
          isActive,
          chipsActiveColor,
          borderRadius,
        })}
        onClick={() => handleTabChange(index)}
      >
        {tab.label}
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
            className={tabBarButtonWrapper({ variant, justify, borderRadius, fullWidth })}
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
