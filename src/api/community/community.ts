import axiosInstance from "@/api/axiosInstance";
import {
  ArticleCategory,
  RecommendArticle,
  ArticleDetail,
  ArticleList,
  CommunityItem,
  NoticeDetail,
  NoticeListResponse, CommunityListItem
} from "@/types";
import {ARTICLE_CATEGORY} from "@/constants/community";
import { AxiosInstance } from "axios";

// 공지사항
const getNoticeList = async ({ pageParam = 0, size = 10, instance = axiosInstance }: { pageParam: number; size?: number; instance?: AxiosInstance }): Promise<NoticeListResponse> => {
  const { data } = await instance.get(`/api/notices?page=${pageParam}&size=${size}`);
  return {
    page: data.page,
    noticeList: data._embedded.queryNoticesDtoList,
  };
};

const getNoticeDetail = async (noticeId: number, instance: AxiosInstance = axiosInstance): Promise<NoticeDetail> => {
  const { data } = await instance.get(`/api/notices/${noticeId}`);
  return data;
}

// 아티클
const getRecommendArticleList = async (instance: AxiosInstance = axiosInstance): Promise<RecommendArticle[]> => {
  const { data } = await instance.get(`/api/blogs/articles`);
  return data._embedded.articlesDtoList.sort((a: RecommendArticle, b: RecommendArticle) => a.number - b.number);
}

const getArticleList = async (category: ArticleCategory, page = 0, size = 12, instance: AxiosInstance = axiosInstance): Promise<ArticleList> => {
  let data;
  if (category === 'ALL') {
    data = await instance.get(`/api/blogs?page=${page}&size=${size}`);
  } else {
    data = await instance.get(`/api/blogs/category/${category}?page=${page}&size=${size}`);
  }
  return {
    page: data.data.page,
    articleList: data?.data?._embedded?.queryBlogsDtoList || [],
  }
}

const getArticleDetail = async (articleId: number, instance: AxiosInstance = axiosInstance): Promise<ArticleDetail> => {
  const { data } = await instance.get(`/api/blogs/${articleId}`);

  const { data: articleListData } = await instance.get(`/api/blogs`);
  const articleList = articleListData._embedded.queryBlogsDtoList;
  const currentIndex = articleList.findIndex((article: CommunityItem) => article.id === articleId);

  const previous = currentIndex > 0 ? articleList[currentIndex - 1] : null;
  const next = currentIndex < articleList.length - 1 ? articleList[currentIndex + 1] : null;

  const formatTitle = (article: CommunityListItem) =>
    article ? { 
      ...article, 
      title: `[${article.category ? ARTICLE_CATEGORY[article.category].label : ''}] ${article.title}` 
    } : null;

  return {
    articleDetail: data,
    previous: formatTitle(previous),
    next: formatTitle(next)
  };
}

export { 
  getNoticeList, 
  getNoticeDetail,
  getRecommendArticleList,
  getArticleList, 
  getArticleDetail,
};
