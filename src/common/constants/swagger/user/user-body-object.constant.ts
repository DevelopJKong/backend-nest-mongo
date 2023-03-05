export const USER_BODY_OBJECT = {
  // * [postEmailCheck] 에 대한 Body
  postEmailCheck: {
    example: {
      email: 'jeongbin@naver.com',
    },
  },
  // * [postCertification] 에 대한 Body
  postCertification: {
    example: {
      imp_uid: 'imp_1234567890',
    },
  },
  // * [putEditProfile] 에 대한 Body
  putEditProfile: {
    example: {
      name: '정빈',
      email: 'jeongbin@naver.com',
      password: 'Jeongbin1234!@',
      confirmationPassword: 'Jeongbin1234!@',
      region: '서울',
      phoneNum: '010-1234-5678',
    },
  },
  // * [postJoin] 에 대한 Body
  postJoin: {
    example: {
      name: '정빈',
      email: 'jeongbin@naver.com',
      password: 'Jeongbin123!@',
      confirmationPassword: 'Jeongbin123!@',
      region: '서울',
      phoneNum: '010-1234-5678',
    },
  },
  postWriteBoard: {
    example: {
      title: '제목',
      content: '내용',
      boardImgName: '이미지 이름',
    },
  },
  putEditBoard: {
    example: {
      title: '제목',
      content: '내용',
      boardImgName: '이미지 이름',
    },
  },
} as const;
