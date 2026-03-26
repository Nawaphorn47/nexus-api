FROM node:20-alpine

WORKDIR /usr/src/app

# เพิ่มบรรทัดนี้: ติดตั้ง OpenSSL เพื่อให้ Prisma Engine ทำงานได้
RUN apk add --no-cache openssl

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]