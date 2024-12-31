export { reviewStatus, reviewType };

const reviewStatus = {
  REQUEST: '승인대기',
  RETURN: '반려',
  APPROVAL: '승인',
  ADMIN: '관리자',
} as  const;

const reviewType = {
  ITEM: '일반상품',
  SUBSCRIBE: '정기구독',
} as const;