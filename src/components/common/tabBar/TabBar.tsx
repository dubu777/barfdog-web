import { ReactNode, useEffect, useState } from "react";
import {
  tabBarActiveVariants,
  tabBarBase,
  tabBarBaseVariants,
  tabBarContainerAlign,
  tabBarContainerBase,
  tabBarContainerVariants,
  tabBarSlideItem,
  tabBarSlider,
  tabBarVariants,
} from "@/components/common/tabBar/TabBar.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export interface Tab {
  label: string;
  value?: string;
  content?: ReactNode;
  onInit?: () => void;
}

interface TabBarProps {
  variant?: keyof typeof tabBarVariants;
  tabs: Tab[];
  defaultIndex?: number;
  hasTabContent?: boolean;
  width?: number;
  justifyContent?: "center" | "spaceBetween" | "flexStart";
  className?: string;
  isScrollable?: boolean;
  onTabClick?: (index: number) => void;
}

export default function TabBar({
  variant = "segmentedButton",
  tabs = [],
  defaultIndex = 0,
  hasTabContent = false,
  width,
  justifyContent = "flexStart",
  className,
  isScrollable = false,
  onTabClick,
}: TabBarProps) {
  const textType = variant === "text" ? "label1" : "headline3";
  const textColor = variant === "chips" ? "gray600" : "gray300";
  const activeTextColor = variant === "text" ? "gray900" : "white";

  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  useEffect(() => {
    setActiveIndex(defaultIndex);
  }, [defaultIndex]);

  const handleTabChange = (index: number) => {
    setActiveIndex(index);
    tabs[index]?.onInit?.();
    onTabClick?.(index);
  };

  const TabButtonComponent = ({ tab, index }: { tab: Tab; index: number }) => (
    <button
      key={index}
      style={{
        width:
          variant !== "chips"
            ? `calc(100% / ${tabs.length})`
            : width
            ? width
            : "auto",
      }}
      className={`${tabBarBaseVariants} ${tabBarVariants[variant]} ${
        activeIndex === index ? tabBarActiveVariants[variant] : ""
      }`}
      onClick={() => handleTabChange(index)}
    >
      <DefaultText
        type={textType}
        color={activeIndex === index ? activeTextColor : textColor}
      >
        {tab.label}
      </DefaultText>
    </button>
  );

  return (
    <>
      <div className={`${tabBarBase} ${className || ""}`}>
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
            className={`${tabBarContainerBase} ${tabBarContainerAlign[justifyContent]} ${tabBarContainerVariants[variant]}`}
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
