# Cara Kontribusi Proyek 🔥
Langkah-Langkah yang perlu dilakukan untuk memulai berkontribusi pada proyek inggris-land

## 1. Clone repository
pilih folder yang ingin dipakai, dalam terminal (git bash) jalankan:
```bash
git clone https://github.com/MadyanArashy/inggris-land
```

## 2. Install dependencies server/backend
dalam terminal (powershell) pilih directory **server**
```shell
cd server
```
install packages dengan node (direkomendasikan node v23.6.0)
```shell
npm install
```

## 3. Install dependencies client/frontend
dalam terminal yang berbeda (powershell) pilih directory **client**
```shell
cd client
```
install packages dengan node (direkomendasikan node v23.6.0)
```shell
npm install
```

## 4. Buatkan database untuk server pakai program kesukaan
pertama jalankan server apache dan MySQL dengan laragon, XAMPP, dsb.  
buat database dalam komputer Anda, melalui program seperti MySQL Workbench, phpmyadmin, Laragon, dsb.

## 5. Jalankan server express dengan nodemon
jika belum install **nodemon** secara global, lakukan terlebih dahulu
```shell
npm install -g nodemon
```
dalam terminal directory **server**, jalankan nodemon untuk aktivasi index.js (nodemon untuk auto restart ketika file diubah)
```shell
nodemon index
```

## 6. Jalankan frontend dengan vite hmr
dalam terminal directory **client**, jalankan vite run dev untuk bundle dan run react app dengan hot module replacement
```shell
npm run dev
```

## 8. Selesai
Terimakasih sudah baca. Happy coding!