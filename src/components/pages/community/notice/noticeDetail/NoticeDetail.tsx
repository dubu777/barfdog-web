'use client';
import * as styles from './NoticeDetail.css';
import { ellipsis } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import DownArrow from '/public/images/icons/angle-down.svg';
import { DefaultObjectType } from "@/types";
import { formatDate } from "@/utils/dateUtils";
import { useSanitizedHTML } from "@/hooks/useSanitizedHTML";
import { prefetchGetNoticeDetail, useGetNoticeDetail } from "@/api/community/queries/useGetNoticeDetail";

const NoticeDetail = ({ noticeId }: { noticeId: number }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useGetNoticeDetail(noticeId);
  const noticeDetail = data?.noticeDto;
  const nextNotice = data?.next || null;
  const prevNotice = data?.previous || null;
  
  const sanitizedHTML = useSanitizedHTML(noticeDetail.contents || '')

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

  const handleNavigate = async (id: number) => {
    await prefetchGetNoticeDetail(queryClient, id);
    router.push(`/community/notice/${id}`);
  }

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
        <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
      </div>
      <div className={styles.moveToNoticeList}>
        <DefaultButton
          type='main'
          linkUrl='/community/notice'
          borderRadius='sm'
        >
          목록 보기
        </DefaultButton>
      </div>
      <div className={styles.noticeNavigation}>
        <ul>
          {prevNotice &&
            <li className={styles.navigationItem}>
              <Text type='description' size='sm' color='grey' className={styles.navTitle}>
                다음 글<DownArrow className={styles.prevArrow} />
              </Text>
              <button onClick={() => handleNavigate(prevNotice.id)} className={styles.navLink}>
                <Text type='description' size='sm' color='black'>{prevNotice.title}</Text>
              </button>
            </li>
          }
          {nextNotice &&
            <li className={styles.navigationItem}>
              <Text type='description' size='sm' color='grey' className={styles.navTitle}>
                이전 글<DownArrow  />
              </Text>
              <button onClick={() => handleNavigate(nextNotice.id)} className={styles.navLink}>
                <Text type='description' size='sm' color='black'>{nextNotice.title}</Text>
              </button>
            </li>
          }
        </ul>
      </div>
    </section>
  );
};

export default NoticeDetail;