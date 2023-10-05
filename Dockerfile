# Gunakan image node LTS sebagai base
FROM node:lts

# Tentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Menyalin pnpm-lock.yaml dan package.json
COPY pnpm-lock.yaml package.json ./

# Instal dependencies menggunakan pnpm
RUN npm install -g pnpm && pnpm install

# Menyalin sisa proyek
COPY . .

# Menyalin kode TypeScript
RUN npm run build

# Jalankan prisma generate
RUN pnpm prisma generate

# Port yang akan digunakan oleh aplikasi
EXPOSE 3000

# Menjalankan aplikasi
CMD ["node", "dist/main.js"]
