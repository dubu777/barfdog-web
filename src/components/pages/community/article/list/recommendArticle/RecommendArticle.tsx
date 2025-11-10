import { commonWrapper, imageWrapper } from '@/styles/common.css';
import { recommendArticle, recommendArticleList, recommendArticleTitle } from './RecommendArticle.css';
import { articleOverlay } from "@/components/pages/community/article/list/ArticleList.css";
import Image from "next/image";
import Link from "next/link";
import Text from "@/components/ui/text/Text";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useGetRecommendArticleList } from "@/api/community/queries/useGetRecommendArticleList";
import { ARTICLE_CATEGORY } from '@/constants/community';

export default function RecommendArticle() {
  const { data: recommendArticles } = useGetRecommendArticleList();

  return (
    <article className={commonWrapper({ paddingX: 20, paddingBottom: 20 })}>
      <div className={recommendArticleList}>
        <Text 
          type='headline3' 
          color='white' 
          block 
          className={recommendArticleTitle}
        >
          추천 아티클
        </Text>
        <Swiper slidesPerView='auto'>
        {recommendArticles.map(article => {
          const { articleInfo } = article;
          return (
            <SwiperSlide key={article.id}>
              <Link
                href={`/community/article/${articleInfo.id}?category=${articleInfo.category}`}
                className={recommendArticle}
              >
                {articleInfo?.displayThumbnailUrl?.url && 
                  <Image
                    src={articleInfo.displayThumbnailUrl?.url}
                    alt={articleInfo.title}
                    width={600}
                    height={335}
                    style={{ aspectRatio: '7 / 4' }}
                    className={imageWrapper({ objectFit: 'cover'})}
                  />
                }
                <div className={`${commonWrapper({ 
                  direction: 'col',
                  align: 'start',
                })} ${articleOverlay}`}>
                  <Text type='headline3' color='white'>
                    {ARTICLE_CATEGORY[articleInfo.category].label}
                  </Text>
                  <Text type='headline1' color='white'>
                    {articleInfo.title}
                  </Text>
                </div>
              </Link>
            </SwiperSlide>
          )
        })}
        </Swiper>
      </div>
    </article>
  );
};