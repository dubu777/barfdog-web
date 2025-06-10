export { itemFilterCategory, itemSortBy };

const itemFilterCategory = {
  ALL: '전체',
  RAW: '생식',
  COOKED: '화식',
  TOPPING: '토퍼',
  SNACK: '간식',
  ETC: '기타',
} as const;


const itemSortBy = {
  recent: '최근순',
  registration: '등록순',
  saleAmount: '판매량순',
} as const;