# Этап 1: С\борка приложения
FROM node:22 AS build-stage

# Установка рабочей директории
WORKDIR /app

# Копирование исходного кода и установка зависимостей
COPY . .
RUN ls
RUN cd ./Mtaste &&  npm install -g npm@10.8.1 
RUN ls
# Сборка приложения
RUN cd Mtaste && npm run build

# Этап 2: Запуск приложения с Nginx
FROM nginx:alpine

# Копирование собранного приложения в каталог html Nginx
COPY --from=build-stage /app/Mtaste/dist /usr/share/nginx/html

# Открытие порта 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]