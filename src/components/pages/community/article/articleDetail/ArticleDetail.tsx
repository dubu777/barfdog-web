'use client';
import * as styles from './ArticleDetail.css';
import { sanitizedHTML } from "@/styles/common.css";
import 'react-quill/dist/quill.snow.css';
import { prefetchGetArticleDetail, useGetArticleDetail } from "@/api/community/queries/useGetArticleDetail";
import Text from "@/components/common/text/Text";
import PostNavigation from "@/components/pages/community/layout/postNavigation/PostNavigation";
import useSanitizedHTML from "@/hooks/useSanitizedHTML";
import { formatDate } from "@/utils/dateUtils";

const ArticleDetail = ({ articleId }: { articleId: number }) => {
  const { data } = useGetArticleDetail(articleId);
  const articleDetail = data.articleDetail;
  const contents = useSanitizedHTML(articleDetail.contents);
  return (
    <section className={styles.articleDetailContainer}>
      <div className={styles.articleDetailHeader}>
        <Text type='title' size='titleLg'>{articleDetail.title}</Text>
        <Text type='description' size='sm' color='grey' align='right'>
          {formatDate(articleDetail.createdDate, 'onlyDate')}
        </Text>
      </div>
      <div className={styles.articleDetailContents}>
        <div dangerouslySetInnerHTML={{ __html: contents }} className={`view ql-editor ${sanitizedHTML}`} />
      </div>
      <PostNavigation
        prefetchFn={prefetchGetArticleDetail}
        category='article'
        prevPost={data?.previous || null}
        nextPost={data?.next || null}
      />
    </section>
  );
};

export default ArticleDetail;