'use client';
import { prefetchGetNoticeDetail, useGetNoticeDetail } from "@/api/community/queries/useGetNoticeDetail";
import DetailSection from "@/components/pages/community/common/detailSection/DetailSection";

const NoticeDetail = ({ noticeId }: { noticeId: number }) => {
  const { data } = useGetNoticeDetail(noticeId);
  const noticeDetail = data?.noticeDto;

  return (
    <DetailSection
      id={noticeDetail.id}
      title={noticeDetail.title}
      createdDate={noticeDetail.createdDate}
      contents={noticeDetail.contents}
      category='notice'
      categoryLabel='공지사항'
      categoryPointLabel='전체'
      prevPost={data?.previous || null}
      nextPost={data?.next || null}
      prefetchFn={prefetchGetNoticeDetail}
    />
  );
};

export default NoticeDetail;