import * as styles from "./RewardFilter.css";
import { usePathname } from "next/navigation";
import DefaultText from "@/components/common/defaultText/DefaultText";
import TabBar from "@/components/common/tabBar/TabBar";
import { RewardFilterType } from "@/types/reward";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";

const RewardFilter = ({ totalCount, statusFilter }: { totalCount: number, statusFilter: RewardFilterType | null }) => {
  const filterStatus = statusFilter === null ? 'ALL' as RewardFilterType : statusFilter;

  const pathname = usePathname();
  const { pushWithQuery } = useDynamicQueryPush();

  const tabs = [
    { label: '전체', value: 'ALL', onInit: () => handleStatusFilterChange('ALL') },
    { label: '적립', value: 'SAVED', onInit: () => handleStatusFilterChange('SAVED') },
    { label: '사용', value: 'USED', onInit: () => handleStatusFilterChange('USED') },
    { label: '소멸', value: 'EXPIRED', onInit: () => handleStatusFilterChange('EXPIRED') },
  ]

  const handleStatusFilterChange = async (status: string) => {
    pushWithQuery(pathname, { status: status })
  }

  const defaultTabIndex = tabs.findIndex(tab => tab.value === filterStatus);

  return (
    <article className={styles.rewardFilterContainer}>
      <div className={styles.rewardFilter}>
        <TabBar
          variant='chips'
          tabs={tabs}
          defaultIndex={defaultTabIndex}
          width={68}
          justifyContent='center'
        />
      </div>
      {totalCount > 0 &&
        <div>
          <DefaultText type='label4'>총 {totalCount}건</DefaultText>
        </div>
      }
    </article>
  );
};

export default RewardFilter;