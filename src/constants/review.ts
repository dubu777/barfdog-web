export { REVIEW_STATUS, REVIEW_TYPE };

const REVIEW_STATUS = {
  REQUEST: '승인대기',
  RETURN: '반려',
  APPROVAL: '승인',
  ADMIN: '관리자',
} as  const;

const REVIEW_TYPE = {
  ITEM: '일반상품',
  SUBSCRIBE: '정기구독',
} as const;