# Bước 1: Dùng Node.js làm nền tảng
FROM node:18-alpine

# Bước 2: Tạo thư mục làm việc trong container
WORKDIR /app

# Bước 3: Copy các file quản lý thư viện vào trước
COPY package*.json ./

# Bước 4: Cài đặt các thư viện (dependencies)
RUN npm install

# Bước 5: Copy toàn bộ code từ máy mình vào container
COPY . .

# Bước 6: Mở cổng 8080 để web có thể chạy
EXPOSE 8080

# Bước 7: Lệnh thần thánh để khởi động server
CMD ["node", "server.js"]
