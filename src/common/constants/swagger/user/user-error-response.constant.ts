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
          text: '????????? ????????? ?????? ?????? ??????',
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
                text: '????????? ?????? ?????? ?????? ?????? ??????',
                statusCode: HttpStatus.BAD_REQUEST,
              },
            },
          },
          existUser: {
            value: {
              ok: false,
              error: 'existUser',
              message: {
                text: '????????? ?????? ???????????? ????????? ?????? ?????? ?????? ??????',
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
          text: '??????????????? ?????? ?????? ??????',
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
        text: '?????? ?????? ??????',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    },
  },
};
