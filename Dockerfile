FROM node:16.17.1

RUN mkdir -p /app
WORKDIR /app
ADD . /app/

RUN rm -rf yarn.lock || true
RUN rm -rf package-lock.json || true

# 운영체제마다 비크립트 다시 설치해줘야함
RUN rm -rf /app/node_modules/bcrypt

# pm2 설치
RUN yarn global add pm2

RUN yarn install --only=production
ENV NODE_ENV production

RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

# pm2-runtime으로 실행 
CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]