export type {
  NoticeList,
  CommunityListItem,
  CommunityItem,
  NoticeDetail,
  BlogCategory,
  BlogArticle,
  BlogListItem,
  BlogList,
  BlogDetail,
  CommunityCategory,
};
interface CommunityListItem {
  id : number;
  title: string;
  createdDate: string;
}

interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
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

interface BlogArticle {
  id: number;
  number: number;
  url: string;
  category: string;
  title: string;
  createdDate: string;
}

interface BlogListItem {
  id: number;
  category: string;
  title: string;
  contents: string;
  createdDate: string;
  url: string;
}

interface BlogList {
  blogList: BlogListItem[];
  page: Page
}

interface BlogDetail {
  blogDetail: CommunityItem;
  previous: CommunityListItem | null;
  next: CommunityListItem | null;
}

type BlogCategory = 'all' | 'nutrition' | 'health' | 'life';

type CommunityCategory = 'notice' | 'blog';