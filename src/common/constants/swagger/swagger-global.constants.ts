export const paramObject = {
  // ? [getSeeBoard] 에 대한 Param
  getSeeBoard: {
    name: 'id',
    description: '소유자 id',
    required: true,
    type: Number,
  },
  // ? [getSeeShop] 에 대한 Param
  getSeeShop: {
    name: 'id',
    description: '상품 id',
    type: Number,
    required: true,
  },
} as const;
