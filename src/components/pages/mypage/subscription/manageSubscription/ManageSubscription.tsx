'use client'
import * as styles from './ManageSubscription.css';
import { useGetSubscriptionList } from "@/api/subscription/queries/useGetSubscriptionList";
import Text from "@/components/common/text/Text";
import TabBar from "@/components/common/tabBar/TabBar";
import useFilterTabs from "@/hooks/useFilterTabs";
import FilterBottomSheet from "@/components/pages/mypage/common/bottomSheet/filterBottomSheet/FilterBottomSheet";
import SubscriptionCard from "@/components/pages/mypage/common/cards/section/SubscriptionCard";
import DefaultEmptyState from "@/components/pages/mypage/common/emptyState/defaultEmptyState/DefaultEmptyState";
import EmptyStateCard from "@/components/pages/mypage/common/cards/section/EmptyStateCard";
import { MYPAGE_DATE_FILTERS, MYPAGE_SORT_FILTERS } from "@/constants/mypage";

const ManageSubscription = () => {
  const { data: subscriptionData } = useGetSubscriptionList(0, 999);

  const filters = [
    { key: "date", label: "조회 기간", options: MYPAGE_DATE_FILTERS },
    { key: "sort", label: "정렬 방식", options: MYPAGE_SORT_FILTERS },
  ];

  const tabs = [
    { label: '전체', value: 'ALL' },
    { label: '구독중', value: 'SUBSCRIBING' },
    { label: '구독해지', value: 'UNSUBSCRIBING' },
  ]

  const { defaultTabIndex, handleFilterChange } = useFilterTabs({
    filterKey: 'status',
    defaultValue: 'ALL',
    tabs: tabs,
  })

  const defaultSubscriptionList = subscriptionData.filter(data => data.recipeNames);
  const subscribingSubscriptionList = defaultSubscriptionList.filter(data => data.subscribeDto.status === 'SUBSCRIBING');
  const subscriptionList = defaultSubscriptionList.filter(data => {
    const tabValue = tabs[defaultTabIndex].value;
    return tabValue === 'ALL' ? true : tabValue === 'SUBSCRIBING' ? data.subscribeDto.status === tabs[defaultTabIndex].value : data.subscribeDto.status !== 'SUBSCRIBING'
  }).map(data => ({ ...data.subscribeDto, recipeNames: data.recipeNames }));
  // const subscriptionList = []
  const emptyState = subscriptionList.length < 1;
  // const emptyState = subscriptionList.length < 1;
  const dogNames = subscribingSubscriptionList?.map(subscription => subscription.subscribeDto.dogName);

  return (
    <section>
      <article className={styles.manageSubscriptionTitle}>
        <Text type='label4' color='gray700'>나의 진행중 구독</Text>
        <Text type='title1' className={styles.manageSubscriptionCount}>총 {subscribingSubscriptionList.length || 0}건</Text>
        <Text type='caption' color='gray700'>
          {subscribingSubscriptionList.length < 1
            ? 'Tip. 맞춤 자연식을 통해 우리아이 면역력을 키워보세요! :)'
            : dogNames.map(dog => `#${dog} `)
          }
        </Text>
      </article>
      <article className={styles.manageSubscriptionTabBar}>
        <TabBar
          variant='chips'
          tabs={tabs.map(tab => ({
            ...tab,
            onInit: () => handleFilterChange(tab.value)
          }))}
          defaultIndex={defaultTabIndex}
        />
      </article>
      {!emptyState &&
        <FilterBottomSheet filters={filters} />
      }
      <article className={styles.manageSubscriptionList}>
        {emptyState ?
          defaultTabIndex === 2
            ? <DefaultEmptyState title='해지 내역이 존재하지 않아요' subTitle='더 행복한 반려견 라이프를 위한 선택, 바프독' />
            : <EmptyStateCard type='default'/>
          : subscriptionList.map(subscriptionDetail => (
            <SubscriptionCard
              key={subscriptionDetail.subscribeId}
              data={subscriptionDetail}
              type='subscription'
              subscriptionId={subscriptionDetail.subscribeId}
            />
          ))
        }
      </article>
    </section>
  );
};

export default ManageSubscription;