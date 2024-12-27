import * as styles from './ArticleList.css';
import Image from "next/image";
import Link from "next/link";
import Text from "@/components/common/text/Text";
import { formatDate } from "@/utils/dateUtils";
import { useGetBlogArticleList } from "@/api/community/queries/useGetBlogArticleList";

const ArticleList = () => {
  const { data: blogArticleList } = useGetBlogArticleList();
  return (
    <article className={styles.blogArticleListContainer}>
      <Text type='description' size='md' color='grey' weight='bold' align='left'>
        추천 아티클
      </Text>
      <div className={styles.articleList}>
        {blogArticleList.map((article, index) => (
          <Link
            href={`/community/blog/${article.id}`}
            key={article.id}
            className={styles.article}
          >
            <Image
              src={article.url}
              alt={article.title}
              width={index === 0 ? 348 : 232}
              height={232}
              className={styles.articleImage}
            />
            <Text type='description' size='md' weight='bold' color='grey'>
              {article.category}
            </Text>
            <Text type='description' size='md' weight='bold' color='black'>
              {article.title}
            </Text>
            <Text type='description' size='sm' color='grey'>
              {formatDate(article.createdDate, 'onlyDate')}
            </Text>
          </Link>
        ))}
      </div>
    </article>
  );
};

export default ArticleList;