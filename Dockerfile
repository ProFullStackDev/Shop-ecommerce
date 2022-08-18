FROM node:16.14.2 as builder
WORKDIR /build

# RUN yarn config set registry http://registry.npmmirror.com
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
RUN yarn

COPY . .
ENV WEBSITE_API_BASEURL=https://api.tyqoon.co
RUN yarn generate:envFile
RUN yarn build:ssr

FROM node:16.14.2-alpine
WORKDIR /
COPY --from=builder /build/dist ./dist
# 时区
COPY --from=builder /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
EXPOSE 4200
CMD ["node", "dist/website/server/main.js"]
