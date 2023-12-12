FROM node:18.15-alpine as builder

WORKDIR /usr/app


# install app dependencies
COPY ./package.json .
RUN npm install\
        && npm install typescript -g
COPY . .
ARG VITE_API_URL
ARG VITE_AUTH_CLIENT_ID
ARG VITE_SECURE_LOCAL_STORAGE_HASH_KEY
ARG VITE_SECURE_LOCAL_STORAGE_PREFIX

# Ustawienie zmiennych środowiskowych dla etapu budowania
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_AUTH_CLIENT_ID=$VITE_AUTH_CLIENT_ID
ENV VITE_SECURE_LOCAL_STORAGE_HASH_KEY=$VITE_SECURE_LOCAL_STORAGE_HASH_KEY
ENV VITE_SECURE_LOCAL_STORAGE_PREFIX=$VITE_SECURE_LOCAL_STORAGE_PREFIX

RUN npm run build

FROM nginx:1.21.3-alpine
COPY --from=builder /usr/app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]

