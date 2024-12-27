import axiosInstance from "@/api/axiosInstance";
import { BlogArticle, BlogCategory, BlogDetail, BlogList, CommunityItem, NoticeDetail, NoticeList } from "@/types";

export { getNoticeList, getNoticeDetail, getBlogArticleList, getBlogList, getBlogDetail };

const getNoticeList = async (page = 0, size = 10): Promise<NoticeList> => {
  const { data } = await axiosInstance.get(`/api/notices?page=${page}&size=${size}`);
  return {
    page: data.page,
    noticeList: data._embedded.queryNoticesDtoList,
  };
};

const getNoticeDetail = async (noticeId: number): Promise<NoticeDetail> => {
  const { data } = await axiosInstance.get(`/api/notices/${noticeId}`);
  return data;
}

const getBlogArticleList = async (): Promise<BlogArticle[]> => {
  const { data } = await axiosInstance.get(`/api/blogs/articles`);
  return data._embedded.articlesDtoList.sort((a: BlogArticle, b: BlogArticle) => a.number - b.number);
}

const getBlogList = async (category: BlogCategory, page = 0, size = 5): Promise<BlogList> => {
  let data;
  if (category === 'all') {
    data = await axiosInstance.get(`/api/blogs?page=${page}&size=${size}`);
  } else {
    data = await axiosInstance.get(`/api/blogs/category/${category}?page=${page}&size=${size}`);
  }
  return {
    page: data.data.page,
    blogList: data?.data?._embedded?.queryBlogsDtoList || [],
  }
}

const getBlogDetail = async (blogId: number): Promise<BlogDetail> => {
  const { data } = await axiosInstance.get(`/api/blogs/${blogId}`);

  const { data: blogListData } = await axiosInstance.get(`/api/blogs`);
  const blogList = blogListData._embedded.queryBlogsDtoList;
  const currentIndex = blogList.findIndex((blog: CommunityItem) => blog.id === blogId);

  const previous = currentIndex > 0 ? blogList[currentIndex - 1] : null;
  const next = currentIndex < blogList.length - 1 ? blogList[currentIndex + 1] : null;

  return {
    blogDetail: data,
    previous,
    next
  };
}