
const ITEM_FILTER_CATEGORY = {
  ALL: '전체',
  RAW: '생식',
  COOKED: '화식',
  TOPPING: '토퍼',
  SNACK: '간식',
  ETC: '기타',
} as const;


const ITEM_SORT_BY = {
  recent: '최근순',
  registration: '등록순',
  saleAmount: '판매량순',
  // new: '신상품순',
  // rowPrice: '낮은 가격 순',
  // highPrice: '높은 가격 순',
} as const;

const ITEM_TAG_COLOR = {
  NEW: 'gray900',
  BEST: 'red',
} as const;

export {
  ITEM_FILTER_CATEGORY,
  ITEM_SORT_BY,
  ITEM_TAG_COLOR
};
