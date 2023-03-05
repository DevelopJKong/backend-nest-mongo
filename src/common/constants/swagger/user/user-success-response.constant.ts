import { HttpStatus } from '@nestjs/common';
// ! USER RESPONSE
export const USER_SUCCESS_RESPONSE = {
  // ! [getFindById] 에 대한 Response
  getFindById: {
    example: {
      ok: true,
      message: {
        text: '소유자 호출 성공',
        statusCode: HttpStatus.OK,
      },
      user: {
        _id: '60b9f9c0b9d6b8a0b4b5b5b5',
        name: 'jeongbin',
        email: 'jeongbin@naver.com',
        username: 'jeongbin',
        password: '$2b$10$Q8',
        avatar: 'avatar',
        socialOnly: false,
        phoneNum: '010-1234-5678',
        region: '서울',
        role: 'User',
        refreshToken: 'refreshToken',
        isVerified: true,
      },
    },
  },
  // ! [getFindByEmail] 에 대한 Response
  getFindByEmail: {
    example: {
      ok: true,
      message: {
        text: '소유자 호출 성공',
        statusCode: HttpStatus.OK,
      },
      user: {
        _id: '60b9f9c0b9d6b8a0b4b5b5b5',
        name: 'jeongbin',
        email: 'jeongbin@naver.com',
        username: 'jeongbin',
        password: '$2b$10$Q8',
        avatar: 'avatar',
        socialOnly: false,
        phoneNum: '010-1234-5678',
        region: '서울',
        role: 'User',
        refreshToken: 'refreshToken',
        isVerified: true,
      },
    },
  },
  // ! [postEmailCheck] 에 대한 Response
  postEmailCheck: {
    example: {
      ok: true,
      message: {
        text: '이메일 중복 체크 성공',
        statusCode: HttpStatus.OK,
      },
    },
  },
  // ! [postCertification] 에 대한 Response
  postCertification: {
    example: {
      ok: true,
      message: {
        text: '인증번호 전송 성공',
        statusCode: HttpStatus.OK,
      },
    },
  },
  // ! [putEditProfile] 에 대한 Response
  putEditProfile: {
    example: {
      ok: true,
      message: {
        text: '프로필 수정 성공',
        statusCode: HttpStatus.OK,
      },
    },
  },
  // ! [postJoin] 에 대한 Response
  postJoin: {
    example: {
      ok: true,
      message: {
        text: '회원가입 성공',
        statusCode: HttpStatus.OK,
      },
    },
  },
  postLogin: {
    example: {
      ok: true,
      message: {
        text: '로그인 성공',
        statusCode: HttpStatus.OK,
      },
    },
  },
} as const;
