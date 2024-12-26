import axiosInstance from "@/api/axiosInstance";
import { NoticeDetail, NoticeList } from "@/types";

export { getNoticeList, getNoticeDetail };

const getNoticeList = async (page = 0, size = 10): Promise<NoticeList> => {
  const { data } = await axiosInstance.get(`/api/notices?page=${page}&size=${size}`);
  console.log(data._embedded)
  return {
    page: data.page,
    noticeList: data._embedded.queryNoticesDtoList,
  };
};

const getNoticeDetail = async (noticeId: number): Promise<NoticeDetail> => {
  const { data } = await axiosInstance.get(`/api/notices/${noticeId}`);
  return data;
}