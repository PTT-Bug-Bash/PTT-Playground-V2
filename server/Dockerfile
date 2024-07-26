FROM node:18-alpine

ENV NODE_OPTIONS=--max_old_space_size=8000

RUN mkdir -p server
RUN mkdir -p admin
RUN mkdir -p admin/src
RUN mkdir -p admin/src/models
COPY ./admin/src/models/db_models.js ./admin/src/models/
WORKDIR ./server
COPY ./server/package.json .
RUN npm i
COPY ./server .
EXPOSE 8000
CMD [ "npm", "start" ]