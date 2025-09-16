import { Page } from "@/types";

interface CommunityListItem {
  id : number;
  title: string;
  createdDate: string;
  category?: ArticleCategory;
}

interface NoticeListResponse {
  noticeList: CommunityListItem[];
  page: Page
}

interface CommunityItem extends CommunityListItem {
  contents: string;
}

interface NoticeDetail {
  noticeDto: CommunityItem;
  previous: CommunityListItem | null,
  next: CommunityListItem | null,
}

interface BaseArticle {
  id: number;
  category: string;
  title: string;
  url: string;
  createdDate: string;
}

interface RecommendArticle extends BaseArticle{
  number: number;
}

interface ArticleListItem extends BaseArticle{
  contents: string;
}

interface ArticleList {
  articleList: ArticleListItem[];
  page: Page
}

interface ArticleDetail {
  articleDetail: CommunityItem;
  previous: CommunityListItem | null;
  next: CommunityListItem | null;
}

type ArticleCategory = 'ALL' | 'NUTRITION' | 'HEALTH' | 'LIFE';
type NoticeCategory = 'ALL' | 'NOTICE' | 'EVENT' | 'POLICY';

type CommunityCategory = 'notice' | 'article';

export type {
  CommunityListItem, CommunityItem, CommunityCategory,
  ArticleCategory, RecommendArticle, ArticleListItem, ArticleList, ArticleDetail,
  NoticeListResponse, NoticeCategory, NoticeDetail,
};