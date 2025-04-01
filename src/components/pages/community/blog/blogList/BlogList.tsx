'use client';
import * as styles from './BlogList.css';
import ItemList from "@/components/pages/community/blog/blogList/itemList/ItemList";
import ArticleList from "@/components/pages/community/blog/blogList/ArticleList/ArticleList";
import Text from "@/components/common/text/Text";

const BlogList = () => {
  return (
    <section className={styles.blogContainer}>
      <div className={styles.blogTitle}>
        <Text type='title' size='titleMd'>블로그</Text>
        <Text type='title' size='md' color='red'>바프독과 반려견의 모든 정보를 이곳에서 확인하세요</Text>
      </div>
      <ArticleList />
      <ItemList />
    </section>
  );
};

export default BlogList;