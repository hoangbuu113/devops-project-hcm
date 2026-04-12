FROM node:18-alpine

WORKDIR /app

# 1. Copy file quản lý thư viện
COPY package*.json ./

# 2. Cài đặt thư viện (như Express, pg...)
RUN npm install

# 3. Copy code nguồn (server.js, routes...)
COPY . .

# 4. Mở cổng 8080 cho Backend
EXPOSE 8080

# 5. Chạy trực tiếp bằng node (Đúng chuẩn Lab 3)
CMD ["node", "server.js"]