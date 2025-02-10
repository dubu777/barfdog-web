'use client';
import * as styles from './NoticeDetail.css';
import { ellipsis, sanitizedHTML } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import PostNavigation from "@/components/pages/community/postNavigation/PostNavigation";
import { DefaultObjectType } from "@/types";
import { formatDate } from "@/utils/dateUtils";
import useSanitizedHTML from "@/hooks/useSanitizedHTML";
import { prefetchGetNoticeDetail, useGetNoticeDetail } from "@/api/community/queries/useGetNoticeDetail";

const NoticeDetail = ({ noticeId }: { noticeId: number }) => {
  const { data } = useGetNoticeDetail(noticeId);
  const noticeDetail = data?.noticeDto;
  const sanitizedHTMLContents = useSanitizedHTML(noticeDetail.contents || '')

  const noticeHeader: DefaultObjectType[] = [
    {
      id: 'title',
      name: '제목',
      value: noticeDetail?.title,
    },
    {
      id: 'createdDate',
      name: '등록일',
      value: formatDate(noticeDetail?.createdDate, 'onlyDate'),
    },
  ]

  return (
    <section className={styles.noticeDetailContainer}>
      <Text type='title' size='titleMd' align='left'>공지사항</Text>
      <ul className={styles.noticeHeader}>
        {noticeHeader.map(info => (
          <li key={info.id} className={styles.noticeHeaderItem}>
            <Text type='description' color='black' size='sm' className={styles.headerTitle({ isTitle: true })}>{info.name}</Text>
            <Text type='description' color='grey' size='sm' className={`${styles.headerTitle({})} ${ellipsis({ lineSize: 'line1' })}`}>{info.value}</Text>
          </li>
        ))}
      </ul>
      <div className={styles.noticeContents}>
        <div dangerouslySetInnerHTML={{ __html: sanitizedHTMLContents }} className={sanitizedHTML} />
      </div>
      <PostNavigation
        prefetchFn={prefetchGetNoticeDetail}
        category='notice'
        prevPost={data?.previous || null}
        nextPost={data?.next || null}
      />
    </section>
  );
};

export default NoticeDetail;