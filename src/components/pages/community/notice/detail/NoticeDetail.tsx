'use client';
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "@/components/layout/header/Header";
import { prefetchGetNoticeDetail, useGetNoticeDetail } from "@/api/community/queries/useGetNoticeDetail";

const DetailSection = dynamic(() => import("@/components/pages/community/common/detailSection/DetailSection"), { ssr: false });

export default function NoticeDetail({ noticeId }: { noticeId: number }) {
  const router = useRouter();
  const { data } = useGetNoticeDetail(noticeId);
  const noticeDetail = data?.currentNotice;

  return (
    <>
      <Header 
        showCloseButton
        centerTitle='공지사항'
        onClose={() => router.back()}
      />
      <DetailSection
        id={noticeDetail.id}
        title={noticeDetail.title}
        createdDate={noticeDetail.createdDate}
        contents={noticeDetail.contents}
        category='notice'
        categoryLabel='공지사항'
        categoryPointLabel='전체'
        prevPost={data?.previousNotice || null}
        nextPost={data?.nextNotice || null}
        prefetchFn={prefetchGetNoticeDetail}
      />
    </>
  );
};