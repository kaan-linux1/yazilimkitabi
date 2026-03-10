# 1. Aşama: React uygulamasını derleme (Build stage)
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Aşama: Nginx ile React'ı sunma (Production stage)
FROM nginx:alpine
# Özel nginx yapılandırmamızı kopyalıyoruz
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Build edilmiş React dosyalarını nginx'in varsayılan html klasörüne kopyalıyoruz
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
