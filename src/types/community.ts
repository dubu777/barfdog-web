import { Pagination } from "@/types";

interface CommunityListItem {
  id : number;
  title: string;
  createdDate?: string;
  category?: ArticleCategory;
}

interface NoticeList {
  noticeList: CommunityListItem[];
  pagination: Pagination;
}

interface CommunityItem extends CommunityListItem {
  contents: string;
}

interface NoticeDetail {
  currentNotice: CommunityItem;
  previousNotice: CommunityListItem | null,
  nextNotice: CommunityListItem | null,
}

interface BaseArticle {
  id: number;
  category: string;
  title: string;
  createdDate: string;
  displayThumbnailUrl?: {
    url: string;
  };
  displayImageUrl?: {
    url: string;
  };
}

interface RecommendArticle {
  id: number;
  number: number;
  articleInfo: BaseArticle;
}

type RawRecommendArticle = Omit<RecommendArticle, 'articleInfo'> & {
  blogInfo: BaseArticle;
};

interface ArticleListItem extends BaseArticle {
  contents: string;
}

interface RawArticleList {
  blogList: ArticleListItem[];
  pagination: Pagination;
}

interface ArticleList {
  articleList: ArticleListItem[];
  pagination: Pagination;
}

interface RawArticleDetail {
  currentBlog: CommunityItem;
  previousBlog: CommunityListItem;
  nextBlog: CommunityListItem;
}

interface ArticleDetail {
  articleDetail: CommunityItem;
  previous: CommunityListItem;
  next: CommunityListItem;
}

type ArticleCategory = 'ALL' | 'NUTRITION' | 'HEALTH' | 'LIFE';
type NoticeCategory = 'ALL' | 'NOTICE' | 'EVENT' | 'POLICY';

type CommunityCategory = 'notice' | 'article';

export type {
  CommunityListItem,
  CommunityItem,
  CommunityCategory,
  ArticleCategory, 
  RecommendArticle, 
  RawRecommendArticle, 
  ArticleListItem, 
  ArticleList,
  ArticleDetail, 
  RawArticleList,
  RawArticleDetail,
  NoticeList,
  NoticeCategory, 
  NoticeDetail,
};