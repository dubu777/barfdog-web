'use client';
import * as styles from './NoticeList.css';
import { infiniteTrigger } from '@/styles/common.css';
import { useEffect } from "react";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import DefaultText from "@/components/common/defaultText/DefaultText";
import useFilterTabs from "@/hooks/useFilterTabs";
import TabBar from "@/components/common/tabBar/TabBar";
import { useGetNoticeList } from "@/api/community/queries/useGetNoticeList";
import { NOTICE_CATEGORY } from "@/constants/community";
import { NoticeCategory, NoticeListResponse } from "@/types";

const NoticeList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetNoticeList();
  const { ref, inView } = useInView();

  const searchParams = useSearchParams();
  const noticeTypeFilter = searchParams.get('noticeType') as NoticeCategory || 'ALL';
  const noticeCategoryFilter = Object.entries(NOTICE_CATEGORY).map(([value, { label }]) => ({label, value}));

  const filteredNoticeList = data?.pages
    ?.flatMap((page: NoticeListResponse) =>
      noticeTypeFilter === "ALL"
        ? page.noticeList
        : page.noticeList.filter(notice => notice.title.includes(NOTICE_CATEGORY[noticeTypeFilter].label))
    );

  const { defaultTabIndex, handleFilterChange } = useFilterTabs({
    filterKey: 'noticeType',
    defaultValue: 'ALL',
    tabs: noticeCategoryFilter,
  })

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage])

  return (
    <section className={styles.noticeContainer}>
      <article className={styles.noticeFilter}>
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
      <ul className={styles.noticeList}>
        {filteredNoticeList?.map(notice => (
          <Link key={notice.id} href={`/community/notice/${notice.id}`} className={styles.noticeItem}>
            <DefaultText type='label3'>{notice.title}</DefaultText>
            <DefaultText type='label4'>{format(new Date(notice.createdDate), 'yyyy-MM-dd')}</DefaultText>
          </Link>
        ))}
      </ul>
      {filteredNoticeList && filteredNoticeList?.length > 0 &&
        <div ref={ref} className={infiniteTrigger} />
      }
    </section>
  );
};

export default NoticeList;