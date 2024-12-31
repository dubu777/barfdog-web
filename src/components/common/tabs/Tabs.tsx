import * as styles from './Tabs.css';
import { ReactNode, useState } from "react";

interface Tab {
  label: string;
  content: ReactNode;
  onInit?: () => void;
}
interface TabsProps {
  tabs: Tab[];
  defaultIndex?: number;
}

const Tabs = ({ tabs, defaultIndex = 0 }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const handleTabChange = (index: number) => {
    setActiveIndex(index);
    tabs[index]?.onInit?.();
  }
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabHeaders}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={styles.tabButton({ active: activeIndex === index })}
            onClick={() => handleTabChange(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>{tabs[activeIndex]?.content}</div>
    </div>
  );
};

export default Tabs;