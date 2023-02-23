export const userSuccess = {
  getFindById: {
    text: '회원 아이디 호출 성공',
  },
  getFindByEmail: {
    text: '회원 이메일 호출 성공',
  },
  postJoin: {
    text: '회원가입 성공',
  },
  postLogin: {
    text: '로그인 성공',
  },
  putEditProfile: {
    text: '회원 정보 수정 성공',
  },
  postCertification: {
    text: '휴대폰 인증 성공',
  },
  postEmailCheck: {
    text: '이메일 중복 체크 성공',
  },
  postEmailVerification: {
    text: '이메일 인증 성공',
  },
} as const;

export const boardSuccess = {
  getSeeBoards: {
    text: '게시물 전체 조회 성공',
  },
  getSeeBoard: {
    text: '게시물 조회 성공',
  },
  postWriteBoard: {
    text: '게시물 생성 성공',
  },
  putEditBoard: {
    text: '게시물 수정 성공',
  },
  deleteBoard: {
    text: '게시물 삭제 성공',
  },
} as const;

export const shopSuccess = {
  getSeeShopItems: {
    text: '상점 전체 조회 성공',
  },
  getSeeShopItem: {
    text: '상점 조회 성공',
  },
  postCreateShopItem: {
    text: '상품 생성 성공',
  },
  postSuccessShopItem: {
    vbankIssued: {
      status: 'vbankIssued',
      text: '가상계좌 발급 성공',
    },
    paid: {
      status: 'success',
      text: '일반 결제 성공',
    },
  },
  putEditShopItem: {
    text: '상품 수정 성공',
  },
  deleteShopItem: {
    text: '상품 삭제 성공',
  },
} as const;
