export { itemFilterCategory, itemSortBy };

const itemFilterCategory = {
  ALL: '전체',
  RAW: '생식',
  TOPPING: '토퍼',
  GOODS: '용품',
} as const;


const itemSortBy = {
  recent: '최근순',
  registration: '등록순',
  saleAmount: '판매량순',
} as const;