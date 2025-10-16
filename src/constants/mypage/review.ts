const REVIEW_STATUS_COLOR_MAP = {
  REQUEST: 'gray100',
  RETURN: 'lightPink',
  APPROVAL: 'blue50',
  ADMIN: 'gray800',
} as const;

const REVIEW_STATUS = {
  REQUEST: '승인대기',
  RETURN: '반려',
  APPROVAL: '승인',
  ADMIN: '관리자',
} as const;

const REVIEW_TYPE = {
  ITEM: '일반상품',
  SUBSCRIBE: '정기구독',
} as const;

const REVIEW_LIST_KEY = {
  writable: 'reviewableList',
  written: 'reviewList',
} as const;

export {
  REVIEW_STATUS_COLOR_MAP,
  REVIEW_STATUS,
  REVIEW_TYPE,
  REVIEW_LIST_KEY,
};
