export type {
  NoticeList,
  NoticeListItem,
  NoticeDetail,
};

interface NoticeListItem {
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
  noticeList: NoticeListItem[];
  page: Page
}

interface NoticeItem extends NoticeListItem {
  contents: string;
}

interface NoticeDetail {
  noticeDto: NoticeItem;
  previous: NoticeListItem | null,
  next: NoticeListItem | null,
}