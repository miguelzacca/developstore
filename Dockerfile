FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

COPY sitemap.xml ./dist
COPY robots.txt ./dist
COPY manifest.webmanifest ./dist

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
