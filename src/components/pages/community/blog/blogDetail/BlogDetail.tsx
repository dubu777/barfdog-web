'use client';
import * as styles from './BlogDetail.css';
import { sanitizedHTML } from "@/styles/common.css";
import 'react-quill/dist/quill.snow.css';
import { prefetchGetBlogDetail, useGetBlogDetail } from "@/api/community/queries/useGetBlogDetail";
import Text from "@/components/common/text/Text";
import PostNavigation from "@/components/pages/community/postNavigation/PostNavigation";
import useSanitizedHTML from "@/hooks/useSanitizedHTML";
import { formatDate } from "@/utils/dateUtils";

const BlogDetail = ({ blogId }: { blogId: number }) => {
  const { data } = useGetBlogDetail(blogId);
  const blogDetail = data.blogDetail;
  const contents = useSanitizedHTML(blogDetail.contents);
  return (
    <section className={styles.blogDetailContainer}>
      <div className={styles.blogDetailHeader}>
        <Text type='title' size='titleLg'>{blogDetail.title}</Text>
        <Text type='description' size='sm' color='grey' align='right'>
          {formatDate(blogDetail.createdDate, 'onlyDate')}
        </Text>
      </div>
      <div className={styles.blogDetailContents}>
        <div dangerouslySetInnerHTML={{ __html: contents }} className={`view ql-editor ${sanitizedHTML}`} />
      </div>
      <PostNavigation
        prefetchFn={prefetchGetBlogDetail}
        category='blog'
        prevPost={data?.previous || null}
        nextPost={data?.next || null}
      />
    </section>
  );
};

export default BlogDetail;