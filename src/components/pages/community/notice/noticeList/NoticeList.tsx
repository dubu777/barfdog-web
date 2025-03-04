'use client';
import * as styles from './NoticeList.css';
import { useEffect, useMemo } from "react";
import Link from "next/link";
import Pagination from "@/components/common/pagination/Pagination";
import Text from "@/components/common/text/Text";
import { formatDate } from "@/utils/dateUtils";
import { usePagination } from "@/hooks/usePagination";
import { prefetchGetNoticeList, useGetNoticeList } from "@/api/community/queries/useGetNoticeList";
import { useQueryClient } from '@tanstack/react-query';
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";

const NoticeList = () => {
  const queryClient = useQueryClient();
  const { pushWithQuery } = useDynamicQueryPush();
  const { currentPage, totalPages, setPaginationData, onPageChange } = usePagination({
    prefetchFn: (page: number) => prefetchGetNoticeList(queryClient, page),
    pushWithQuery,
  })

  const paginationProps = useMemo(() => ({ // 불필요한 props 객체 재생성 방지
    currentPage,
    totalPages,
    onPageChange,
  }), [currentPage, totalPages, onPageChange]);

  const { data } = useGetNoticeList(currentPage);
  const noticeList = data?.noticeList || [];

  useEffect(() => {
    if (data.page) {
      setPaginationData(data.page);
    }
  }, [data.page, setPaginationData])

  return (
    <section className={styles.noticeContainer}>
      <Text type='title' size='titleMd' align='left'>공지사항</Text>
      <ul className={styles.noticeList}>
        <li className={styles.noticeItem({ isHeader: true })}>
          <Text type='description' size='md' weight='bold' color='black' className={styles.noticeId}>
            No.
          </Text>
          <Text type='description' size='md' weight='bold' color='black' className={styles.noticeTitle}>
            제목
          </Text>
          <Text type='description' size='md' weight='bold' color='black' className={styles.noticeCreatedDate}>
            등록일
          </Text>
        </li>
        {noticeList.map(notice => (
          <li key={notice.id}>
            <Link
              href={`/community/notice/${notice.id}`}
              className={styles.noticeItem({})}
            >
              <Text type='description' size='sm' color='grey' className={styles.noticeId}>
                {notice.id}
              </Text>
              <Text type='description' size='sm' color='black' className={styles.noticeTitle}>
                {notice.title}
              </Text>
              <Text type='description' size='sm' color='grey' className={styles.noticeCreatedDate}>
                {formatDate(notice.createdDate, 'onlyDate')}
              </Text>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        {...paginationProps}
      />
    </section>
  );
};

export default NoticeList;