import * as styles from './Tabs.css';
import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  const handleTabChange = (index: number) => {
    setActiveIndex(index);
    tabs[index]?.onInit?.();
  }

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveIndex(tab === 'writable' ? 0 : 1);
    } else {
      if (tab === null) {
        setActiveIndex(0);
      }
    }
  }, [searchParams])

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