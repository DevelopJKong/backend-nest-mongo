export const userError = {
  existUser: {
    error: 'existUser',
    text: '이미 존재하는 유저 입니다.',
  },
  notExistUser: {
    error: 'notExistUser',
    text: '존재하지 않는 이메일[유저] 입니다.',
  },
  notMatchedPasswords: {
    error: 'notCorrectPasswords',
    text: '비밀번호와 확인 비밀번호가 일치 하지 않습니다.',
  },
  wrongPassword: {
    error: 'wrongPassword',
    text: '비밀번호가 잘못 되었습니다.',
  },
  notExistVerification: {
    error: 'notExistVerification',
    text: '존재하지 않는 인증코드 입니다.',
  },
  notVerifiedUser: {
    error: 'notVerifiedUser',
    text: '인증되지 않은 유저 입니다.',
  },
} as const;

export const boardError = {
  notExistBoard: {
    error: 'notExistBoard',
    text: '존재하지 않는 게시물 입니다.',
  },

  createFailedError: {
    error: 'createFailedError',
    text: '게시물 등록하는 과정에 문제 생겼습니다. 잠시후에 다시 시도해주세요.',
  },
} as const;

export const shopError = {
  notExistShop: {
    error: 'notExistItem',
    text: '존재하지 않는 상품 입니다.',
  },
  createFailedItem: {
    error: 'createFailedItem',
    text: '상품 등록하는 과정에 문제 생겼습니다. 잠시후에 다시 시도해주세요.',
  },
  postSuccessShop: {
    forgery: {
      status: 'forgery',
      text: '위조된 결제시도입니다.',
    },
  },
} as const;

export const commonError = {
  extraError: {
    error: 'extraError',
    text: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
  },
} as const;
