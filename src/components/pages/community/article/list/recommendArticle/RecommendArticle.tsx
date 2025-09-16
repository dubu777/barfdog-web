import * as styles from './RecommendArticle.css';
import { articleOverlay } from "@/components/pages/community/article/list/ArticleList.css";
import Image from "next/image";
import Link from "next/link";
import Text from "@/components/common/text/Text";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useGetRecommendArticleList } from "@/api/community/queries/useGetRecommendArticleList";
import { imageWrapper } from '@/styles/common.css';

export default function RecommendArticle() {
  const { data: recommendArticles } = useGetRecommendArticleList();
  return (
    <article className={styles.recommendArticleContainer}>
      <div className={styles.recommendArticleList}>
        <Text type='headline3' color='white' block className={styles.recommendArticleTitle}>추천 아티클</Text>
        <Swiper slidesPerView='auto'>
        {recommendArticles.map(article => (
          <SwiperSlide key={article.id}>
            <Link
              href={`/community/article/${article.id}`}
              className={styles.recommendArticle}
            >
              <Image
                src={article.url}
                alt={article.title}
                width={600}
                height={335}
                style={{ aspectRatio: '7 / 4' }}
                className={imageWrapper({ objectFit: 'cover'})}
              />
              <div className={`${styles.recommendArticleContents} ${articleOverlay}`}>
                <Text type='headline3' color='white'>{article.category}</Text>
                <Text type='headline1' color='white'>{article.title}</Text>
              </div>
            </Link>
          </SwiperSlide>
        ))}
        </Swiper>
      </div>
    </article>
  );
};