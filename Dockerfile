FROM node:10.16
COPY ./ /app
WORKDIR /app
RUN npm config set registry=http://registry.npm.taobao.org
RUN npm install && npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
RUN echo build at $(date), commit ${GIT_COMMIT}@${GIT_URL} >/home/version
COPY nginx.conf /etc/nginx/nginx.conf
