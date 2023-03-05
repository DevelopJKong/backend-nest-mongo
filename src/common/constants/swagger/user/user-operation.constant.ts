export const USER_OPERATION = {
  // * [getFindById] 에 대한 Operation
  getFindById: {
    summary: '소유자 호출 API',
    description: '소유자를 호출 합니다.',
  },
  postJoin: {
    summary: '회원가입 API',
    description: '회원가입을 위한 API 입니다.',
  },
  postLogin: {
    summary: '로그인 API',
    description: '로그인을 위한 API 입니다.',
  },
  postEmailCheck: {
    summary: '이메일 중복 확인 API',
    description: '이메일 중복 확인을 위한 API 입니다.',
  },
  postCertificateEmail: {
    summary: '이메일 인증 API',
    description: '이메일 인증을 위한 API 입니다.',
  },
  postCertificatePhone: {
    summary: '휴대폰 인증 API',
    description: '휴대폰 인증을 위한 API 입니다.',
  },
  putEditProfile: {
    summary: '회원 정보 수정 API',
    description: '회원 정보 수정을 위한 API 입니다.',
  },
} as const;
