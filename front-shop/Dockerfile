FROM node:20.11.1-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /frontend

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

EXPOSE 3000
# Ваше приложение будет запущено командой npm start
CMD ["npm", "start"]

