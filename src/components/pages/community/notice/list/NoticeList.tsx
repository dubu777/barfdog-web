'use client';
import { commonWrapper } from '@/styles/common.css';
import { Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import Text from "@/components/ui/text/Text";
import useFilterTabs from "@/hooks/useFilterTabs";
import TabBar from "@/components/ui/tabBar/TabBar";
import Divider from '@/components/ui/divider/Divider';
import Header from '@/components/layout/header/Header';
import InfiniteScrollTrigger from "@/components/ui/infiniteScrollTrigger/InfiniteScrollTrigger";
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useFlattenedInfiniteData } from '@/hooks/useFlattenedInfiniteData';
import { NOTICE_CATEGORY } from "@/constants/community";
import { NoticeCategory } from "@/types";
import { getEntryPoint, navigateToEntryPoint } from '@/utils/navigationEntry';
import { useGetInfiniteNoticeList } from "@/api/community/queries/useGetInfiniteNoticeList";

export default function NoticeList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noticeTypeFilter = searchParams.get('noticeType') as NoticeCategory || 'ALL';
  const noticeCategoryFilter = Object.entries(NOTICE_CATEGORY).map(([value, { label }]) => ({label, value}));
  
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInfiniteNoticeList();
  const ref = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  const noticeList = useFlattenedInfiniteData(data, 'noticeList', {
    filter: (notice) => 
      noticeTypeFilter === "ALL"
        ? true
        : notice.title.includes(NOTICE_CATEGORY[noticeTypeFilter].label),
  });

  const { defaultTabIndex, handleFilterChange } = useFilterTabs({
    filterKey: 'noticeType',
    defaultValue: 'ALL',
    tabs: noticeCategoryFilter,
  })

  return (
    <>
      <Header
        showBackButton
        showCartButton
        centerTitle='공지사항'
    		// 목록 페이지에서 뒤로가기 시 진입 경로로 이동
        onBack={() => navigateToEntryPoint(router, getEntryPoint() ?? '/')}
      />
      <section 
        className={commonWrapper({ 
          backgroundColors: 'gray0',
          direction: 'col',
          justify: 'start',
          minHeight: 'fullWithHeader',
          paddingBottom: 40,
        })}
      >
        <article
          style={{
            position: 'sticky',
            top: 51,
            zIndex: 100,
          }}
          className={commonWrapper({
            padding: 20,
            justify: 'start',
            backgroundColors: 'gray0',
          })}
        >
          <TabBar
            variant='chips'
            tabs={noticeCategoryFilter.map(tab => ({
              ...tab,
              onInit: async () => {
                handleFilterChange(tab.value);
              }
            }))}
            defaultIndex={defaultTabIndex}
            width={68}
            justifyContent='flexStart'
          />
        </article>
        <Divider thickness={1} color='gray50' />
        <ul className={commonWrapper({ direction: 'col' })}>
          {noticeList?.map((notice) => (
            <Fragment key={notice.id}>
              <Link 
                href={`/community/notice/${notice.id}`} 
                className={commonWrapper({
                  padding: 20,
                  direction: 'col',
                  align: 'start',
                  gap: 16,
                })}
              >
                <Text type='label3'>{notice.title}</Text>
                {notice.createdDate && (
                  <Text type='label4'>{format(new Date(notice.createdDate), 'yyyy-MM-dd')}</Text>
                )}
              </Link>
              <Divider color='gray50' thickness={2} />
            </Fragment>
          ))}
        </ul>
        <InfiniteScrollTrigger
          ref={ref}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </section>
    </>
  );
};