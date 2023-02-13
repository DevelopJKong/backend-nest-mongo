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
        id: 1,
        email: 'jeongbin@naver.com',
        avatar: 'avatar',
        socialOnly: false,
        phoneNum: '010-1234-5678',
        region: '서울',
        role: 'User',
        refreshToken: 'refreshToken',
        verified: true,
        createdAt: '2021-08-01T00:00:00.000Z',
        updatedAt: '2021-08-01T00:00:00.000Z',
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

export const USER_ERROR_RESPONSE = {
  postJoin: {
    badRequest: {
      example: {
        ok: false,
        error: 'existUser',
        message: {
          text: '이미 존재하는 유저일 경우 에러',
          statusCode: HttpStatus.BAD_REQUEST,
        },
      },
    },
    unauthorized: {
      example: {
        ok: false,
        error: 'wrongPassword',
        message: {
          text: '비밀번호가 일치하지 않을 경우',
          statusCode: HttpStatus.UNAUTHORIZED,
        },
      },
    },
  },
  postLogin: {
    badRequest: {
      example: {
        ok: false,
        error: 'existUser',
        message: {
          text: '존재하지 않는 유저일 경우 에러',
          statusCode: HttpStatus.BAD_REQUEST,
        },
      },
    },
    unauthorized: {
      example: {
        ok: false,
        error: 'wrongPassword',
        message: {
          text: '잘못된 비밀번호를 입력했을 경우',
          statusCode: HttpStatus.UNAUTHORIZED,
        },
      },
    },
  },
  postEmailCheck: {
    badRequest: {
      'application/json': {
        examples: {
          existUser: {
            value: {
              ok: false,
              error: 'existUser',
              message: {
                text: '이미 존재하는 유저일 경우 에러',
                statusCode: HttpStatus.BAD_REQUEST,
              },
            },
          },
          notEmail: {
            value: {
              ok: false,
              error: 'notEmail',
              message: {
                text: '이메일 형식이 아닐 경우 에러',
                statusCode: HttpStatus.BAD_REQUEST,
              },
            },
          },
        },
      },
    },
  },
  postCertification: {
    notEmail: {
      example: {
        ok: false,
        error: 'notEmail',
        message: {
          text: '이메일 형식이 아닐 경우 에러',
          statusCode: HttpStatus.BAD_REQUEST,
        },
      },
    },
  },
  putEditProfile: {
    badRequest: {
      'application/json': {
        examples: {
          notExistUser: {
            value: {
              ok: false,
              error: 'notExistUser',
              message: {
                text: '유저가 존재 하지 않는 경우 에러',
                statusCode: HttpStatus.BAD_REQUEST,
              },
            },
          },
          existUser: {
            value: {
              ok: false,
              error: 'existUser',
              message: {
                text: '유저가 이미 존재하는 유저를 입력 했을 경우 에러',
                statusCode: HttpStatus.BAD_REQUEST,
              },
            },
          },
        },
      },
    },
    wrongPassword: {
      example: {
        ok: false,
        error: 'wrongPassword',
        message: {
          text: '비밀번호가 틀린 경우 에러',
          statusCode: HttpStatus.UNAUTHORIZED,
        },
      },
    },
  },
  internalServerError: {
    example: {
      ok: false,
      error: 'internalServerError',
      message: {
        text: '서버 내부 에러',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    },
  },
};
