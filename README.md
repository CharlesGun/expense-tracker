# ExpenseTracker - Personal Expense Tracker App

**ExpenseTracker** adalah aplikasi manajemen keuangan pribadi modern yang membantu pengguna mencatat, melacak, dan menganalisis pengeluaran bulanan mereka. Dibangun dengan stack **Vite + React.js** di sisi frontend, serta **Node.js (Express)** dan **PostgreSQL**  dengan **ORM Sequelize** di sisi backend.

---

## 1. Normalisasi Database

Proyek ini menerapkan prinsip **3NF (Third Normal Form)** untuk memastikan integritas data, efisiensi penyimpanan, dan kemudahan pemeliharaan.

### Sebelum Dinormalisasi
Terdapat banyak pengulangan data pada kolom user dan kategori yang menyebabkan pemborosan memori.

| ID | User Name | Email | Category Name | Amount | Date | Description |
|----|-----------|-------|---------------|--------|------|-------------|
| 1  | Budi      | b@m.id | Makanan      | 20000  | 2026-01-01 | Bakso |
| 2  | Budi      | b@m.id | Transport    | 15000  | 2026-01-01 | Ojek  |

### Proses Tahapan Normalisasi:

#### **1NF (First Normal Form)**
**Tujuan:** Menghilangkan grup berulang dan memastikan setiap kolom bersifat atomik (tunggal). Pada tahap ini, kita memastikan tidak ada sel yang berisi daftar harga atau banyak kategori sekaligus. Setiap baris harus unik dan memiliki *Primary Key*.

#### **2NF (Second Normal Form)**
**Tujuan:** Menghapus ketergantungan parsial (*Partial Functional Dependency*). Kita memisahkan data yang tidak sepenuhnya bergantung pada *Primary Key* utama. Contohnya, data profil User (Nama, Email) dipisahkan dari tabel Transaksi. Hal ini mencegah pengulangan data user setiap kali mereka mencatat pengeluaran baru.

#### **3NF (Third Normal Form)**
**Tujuan:** Menghapus ketergantungan transitif (*Transitive Dependency*). Tahap ini memastikan kolom non-key tidak bergantung pada kolom non-key lainnya. Nama Kategori dipindahkan ke tabel `categories`. Dengan begitu, jika nama kategori diubah, kita hanya perlu memperbarui satu baris saja, bukan ribuan baris transaksi.


### Setelah Dinormalisasi (3NF)
Memisahkan data ke dalam tabel-tabel spesifik yang saling berelasi.



**Tabel-Tabel:**
- `users`: Menyimpan identitas pengguna (nama, email, password).
- `categories`: Master data kategori pengeluaran.
- `expenses`: Transaksi pengeluaran yang merelasikan `user_id` dan `category_id`.
- `auths`: Penyimpanan *Refresh Token* berbasis `TEXT` untuk manajemen sesi JWT.

**Relasi antar tabel**
- `users` -> `expenses`: *One to Many*
- `categories` -> `expenses`: *One to Many*
- `auths` -> `users`: *One to Many*

---

## 2. Teknologi yang Digunakan

### Backend
- **Node.js + Express.js**: Server-side framework.
- **PostgreSQL**: Database relasional.
- **Sequelize ORM**: Manajemen migrasi dan model.
- **JWT (JSON Web Token)**: Autentikasi aman berbasis token.
- **Bcrypt**: Enkripsi password.

### Frontend
- **React.js (Vite)**: Library UI utama.
- **Chart.js**: Visualisasi pengeluaran (Pie Chart).
- **Lucide React**: Library ikon modern.
- **Tailwind CSS / Custom CSS**: Desain responsif dan Glassmorphism UI.

---

## 3. Fitur Utama

- **Autentikasi**: Register dan Login dengan sistem keamanan JWT.
- **Manajemen Pengeluaran (CRUD)**:
  - Menambahkan data transaksi.
  - Edit dan hapus transaksi.
- **Dashboard Analitik**:
  - Filter pengeluaran berdasarkan bulan dan tahun.
  - Pengelompokan (Grouping) pengeluaran otomatis per kategori.
  - Grafik proporsi pengeluaran interaktif.

---

## 4. Cara Menjalankan Proyek
- Clone repository expense-tracker:
  ```bash 
  git clone https://github.com/CharlesGun/expense-tracker.git
  ```

  ### Backend Setup
  ‼️**Perhatian**‼️

  🚫**Pada saat setup tidak perlu membuat database secara manual terlebih dahulu**🚫
  
  Ikuti saja langkah-langkah berikut:


  - Masuk ke folder backend dan install dependensi:
     ```bash
      cd be
      npm install
     ```

  - Buat file `.env` dan konfigurasi file `.env`:
    ```env
    DB_USERNAME=
    DB_PASSWORD=
    DB_NAME=
    DB_HOST=
    DB_PORT=

    ACCESS_TOKEN_KEY=
    REFRESH_TOKEN_KEY=
    ACCESS_TOKEN_AGE=3600

    CLIENT_URL=http://localhost:5173
    NODE_ENV=development
    PORT=3000
    ```

    Isi DB_NAME dengan nama database yang ingin dibuat.

  - Membuat database, migrating, dan input seeders:
    ```bash
    npm run db:init
    ```
  - Menjalankan backend service:
    ```bash
    npm run dev
    ```

  ### Frontend Setup
  - Masuk ke folder frontend dan install dependensi:
    ```bash
    cd fe
    npm install
    ```
  - Buat file `.env` dan konfigurasi file `.env`:
    ```env
    VITE_API_BASE_URL=http://localhost:3000/api
    ```
  - Menjalankan frontend service:
    ```bash
    npm run dev
    ```
## 5. File SQL
`db.sql`
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    category_id INTEGER,
    amount INTEGER NOT NULL,
    date DATE NOT NULL,
    description VARCHAR(255),
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_expense_user 
        FOREIGN KEY (user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
        
    CONSTRAINT fk_expense_category 
        FOREIGN KEY (category_id) 
        REFERENCES categories(id) 
        ON DELETE RESTRICT 
        ON UPDATE CASCADE
);

CREATE TABLE auths (
    id BIGSERIAL PRIMARY KEY,
    token TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_auth_user 
        FOREIGN KEY (user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);
```