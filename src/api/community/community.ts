import axiosInstance from "@/api/axiosInstance";
import {
  ArticleCategory,
  RecommendArticle,
  ArticleDetail,
  NoticeDetail,
  NoticeList,
  ApiResponse,
  RawArticleList,
  RawArticleDetail,
  RawRecommendArticle,
} from "@/types";
import { AxiosInstance } from "axios";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";

// 공지사항
const getNoticeList = async ({ 
  pageParam = 0, 
  size = 20, 
  instance = axiosInstance
}: { pageParam: number; size?: number; instance?: AxiosInstance }) => {
  const { data }: { data: ApiResponse<NoticeList> } = await instance.get(`/api/v2/public/notices`, {
    params: { page: pageParam, size },
  });

  return validateApiResponse(data, "공지사항 목록 조회에 실패했습니다.");
};

const getNoticeDetail = async (noticeId: number, instance: AxiosInstance = axiosInstance): Promise<NoticeDetail> => {
  const { data }: { data: ApiResponse<NoticeDetail> } = await instance.get(`/api/v2/public/notices/${noticeId}`);
  return validateApiResponse(data, "공지사항 상세 조회에 실패했습니다.");
}

// 아티클
const getRecommendArticleList = async (instance: AxiosInstance = axiosInstance) => {
  const { data }: { data: ApiResponse<Record<string, RawRecommendArticle[]>> } = await instance.get(`/api/v2/public/blogs/articles`);
  const responseData = validateApiResponse(data, "추천 아티클 조회에 실패했습니다.");
  return responseData.articleList
    .map(article => ({
      id: article.id,
      number: article.number,
      articleInfo: article.blogInfo,
    }))
    .sort((a: RecommendArticle, b: RecommendArticle) => a.number - b.number);
}

const getArticleList = async ({
  category, 
  page = 0, 
  size = 12, 
  instance = axiosInstance
}: { 
  category: ArticleCategory, 
  page: number, 
  size?: number, 
  instance?: AxiosInstance
}) => {
  const params = category === 'ALL' ? { page, size } : { category, page, size };
  const { data }: { data: ApiResponse<RawArticleList> } = await instance.get(`/api/v2/public/blogs`, {
    params,
  });

  const responseData = validateApiResponse(data, "아티클 목록 조회에 실패했습니다.");
  return {
    pagination: responseData.pagination,
    articleList: responseData.blogList,
  }
}

const getArticleDetail = async (articleId: number, instance: AxiosInstance = axiosInstance): Promise<ArticleDetail> => {
  const { data }: { data: ApiResponse<RawArticleDetail> } = await instance.get(`/api/v2/public/blogs/${articleId}`);

  const responseData = validateApiResponse(data, "아티클 상세 조회에 실패했습니다.");

  return {
    articleDetail: responseData.currentBlog,
    previous: responseData.previousBlog,
    next: responseData.nextBlog
  };
}

export { 
  getNoticeList, 
  getNoticeDetail,
  getRecommendArticleList,
  getArticleList, 
  getArticleDetail,
};
