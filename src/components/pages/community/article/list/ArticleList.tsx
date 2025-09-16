'use client';
import { commonWrapper } from '@/styles/common.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import GalleryIcon from "public/images/header/gallery.svg";
import ListIcon from "public/images/header/list.svg";
import Header from "@/components/layout/header/Header";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Text from "@/components/common/text/Text";
import RecommendArticle from "@/components/pages/community/article/list/recommendArticle/RecommendArticle";
import ArticleItemList from "@/components/pages/community/article/list/articleItemList/ArticleItemList";
import { getEntryPoint, navigateToEntryPoint } from "@/utils/navigationEntry";


export default function ArticleList() {
  const router = useRouter();

  const [mode, setMode] = useState<'board' | 'gallery'>('board');
  
  return (
    <>
    <Header 
      showBackButton
      centerTitle='아티클'
      onBack={() => navigateToEntryPoint(router, getEntryPoint() ?? '/')}
      rightElement={(
        <button
          onClick={() => setMode(mode === 'board' ? 'gallery' : 'board')}
          className={commonWrapper({})}
        >
          <SvgIcon
            src={mode === 'board' ? GalleryIcon : ListIcon} 
            width={mode === 'board' ? 18 : 20}
            height={mode === 'board' ? 18 : 16}
            onClick={() => setMode(mode === 'board' ? 'gallery' : 'board')}
          />
        </button>
      )}
    />
    <section>
      <div className={commonWrapper({
        direction: 'col',
        align: 'start',
        gap: 12,
        padding: 20,
      })}>
        <Text type='title4'>바프독과 반려견의 모든 정보를<br/>이곳에서 확인하세요</Text>
        <Text type='label4' color='gray600'>이곳에 궁금하신 질문이 없다면<br/>우측 하단의 상담 아이콘을 통해 실시간 상담 받아보세요!</Text>
      </div>
      <RecommendArticle />
      <ArticleItemList mode={mode} />
    </section>
    </>
  );
};