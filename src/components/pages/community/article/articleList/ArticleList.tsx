'use client';
import * as styles from './ArticleList.css';
import Text from "@/components/common/text/Text";
import RecommendArticle from "@/components/pages/community/article/articleList/recommendArticle/RecommendArticle";
import ArticleItemList from "@/components/pages/community/article/articleList/articleItemList/ArticleItemList";

const ArticleList = () => {
  return (
    <section>
      <div className={styles.articleTitle}>
        <Text type='title4'>바프독과 반려견의 모든 정보를<br/>이곳에서 확인하세요</Text>
        <Text type='label4' color='gray600'>이곳에 궁금하신 질문이 없다면<br/>우측 하단의 상담 아이콘을 통해 실시간 상담 받아보세요!</Text>
      </div>
      <RecommendArticle />
      <ArticleItemList />
    </section>
  );
};

export default ArticleList;