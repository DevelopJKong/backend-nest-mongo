import { HttpStatus } from '@nestjs/common';
import { USER_ERROR } from '../../error.constants';

export const USER_ERROR_RESPONSE = {
  postJoin: {
    badRequest: {
      example: {
        ok: false,
        error: USER_ERROR.existUser.error,
        message: {
          text: USER_ERROR.existUser.text,
          statusCode: HttpStatus.BAD_REQUEST,
        },
      },
    },
    unauthorized: {
      example: {
        ok: false,
        error: USER_ERROR.wrongPassword.error,
        message: {
          text: USER_ERROR.wrongPassword.text,
          statusCode: HttpStatus.UNAUTHORIZED,
        },
      },
    },
  },
  postLogin: {
    badRequest: {
      'application/json': {
        examples: {
          existUser: {
            value: {
              ok: false,
              error: USER_ERROR.existUser.error,
              message: {
                text: USER_ERROR.existUser.text,
                statusCode: HttpStatus.BAD_REQUEST,
              },
            },
          },
          notEmail: {
            value: {
              ok: false,
              error: USER_ERROR.notVerifiedUser.error,
              message: {
                text: USER_ERROR.notVerifiedUser.text,
                statusCode: HttpStatus.BAD_REQUEST,
              },
            },
          },
        },
      },
    },
    unauthorized: {
      example: {
        ok: false,
        error: USER_ERROR.wrongPassword.error,
        message: {
          text: USER_ERROR.wrongPassword.text,
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
              error: USER_ERROR.existUser.error,
              message: {
                text: USER_ERROR.existUser.text,
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
