import { Page } from "@/types";

export type {
  CommunityListItem, CommunityItem, CommunityCategory,
  ArticleCategory, RecommendArticle, ArticleListItem, ArticleList, ArticleDetail,
  NoticeList, NoticeCategory, NoticeDetail,
  FAQItem, FAQCategory, FAQCategories, FAQCategoryKey, FAQCategoryKeyWithAll, FAQSubCategoryKey
};

interface CommunityListItem {
  id : number;
  title: string;
  createdDate: string;
}

interface NoticeList {
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


type FAQCategoryKey =
  | "DELIVERY"
  | "ORDER_CANCEL"
  | "EXCHANGE_RETURN"
  | "SERVICE"
  | "ORDER_PAYMENT"
  | "MEMBER_INFO"
  | "PRODUCT"
  | "BENEFIT";


// "ALL"을 포함하는 확장 타입 (카테고리 선택 시 사용)
type FAQCategoryKeyWithAll = FAQCategoryKey | "ALL";

type FAQSubCategoryKey<C extends FAQCategoryKey> = keyof FAQCategories[C]["subcategories"] | "ALL";

// 개별 질문-답변 타입
interface FAQItem {
  question: string;
  answer: string;
}

// 서브카테고리 타입
interface FAQSubCategory {
  label: string;
  items?: FAQItem[]; // `items`는 선택적으로 존재할 수 있음
}

// FAQ 카테고리 타입
interface FAQCategory {
  label: string;
  subcategories: Record<string, FAQSubCategory>; // 서브카테고리 키-값 매핑
}

// 전체 FAQ 데이터 타입
type FAQCategories = Record<FAQCategoryKey, Omit<FAQCategory, "subcategories"> & { subcategories: Record<string, FAQSubCategory> }>;