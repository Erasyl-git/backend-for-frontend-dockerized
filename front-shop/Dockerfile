FROM node:20.11.1-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /front-shop

# Копируем package.json и package-lock.json для установки зависимостей
COPY /frontend /package*.json ./

# Устанавливаем зависимости
RUN npm install

# Устанавливаем nodemon глобально
RUN npm install -g nodemon

# Копируем остальные файлы приложения
COPY . .

# Ваше приложение будет запущено командой npm start
CMD ["npm", "start"]