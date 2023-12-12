FROM node:18.15-alpine as builder

WORKDIR /usr/app


# install app dependencies
COPY ./package.json .
RUN npm install\
        && npm install typescript -g
COPY . .
#envyronment variables
RUN npm run build

FROM nginx:1.21.3-alpine
COPY --from=builder /usr/app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]

