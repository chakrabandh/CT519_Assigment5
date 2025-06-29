# Movie App - React + Node.js + MongoDB

โปรเจค Movie App ที่มีความสามารถในการจัดการข้อมูลภาพยนตร์ พร้อมทั้งหน้า About สำหรับแสดงข้อมูลส่วนตัว

## ✨ Features

### 🏠 Home Page
- แสดงรายการภาพยนตร์ทั้งหมด
- ข้อมูลที่แสดง: ชื่อภาพยนตร์, ปีที่ฉาย, คะแนน IMDB, คะแนน Rotten Tomatoes, โปสเตอร์
- เพิ่ม/ลบ/แก้ไขข้อมูลภาพยนตร์ได้
- UI ที่สวยงามและ responsive

### 👤 About Page
- แสดงข้อมูลส่วนตัว: รูปภาพ, ชื่อ, นามสกุล, ชื่อเล่น
- การ์ดโปรไฟล์ที่สวยงาม

## 🛠 Technology Stack

- **Frontend**: React.js + CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Containerization**: Docker + Docker Compose

## 📁 Project Structure

```
movie-app/
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── Dockerfile
├── backend/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── mongo-init.js
└── README.md
```

## 🚀 Quick Start with Docker

### Prerequisites
- Docker
- Docker Compose

### การติดตั้งและรัน

1. **Clone โปรเจค** (หรือสร้างไฟล์ตามโครงสร้างข้างต้น)

2. **สร้างโฟลเดอร์และไฟล์**
```bash
mkdir movie-app
cd movie-app
mkdir frontend backend
```

3. **ใส่ไฟล์ต่างๆ ในตำแหน่งที่ถูกต้อง**
   - ใส่ React code ใน `frontend/src/`
   - ใส่ Backend code ใน `backend/`
   - ใส่ `package.json` ในแต่ละโฟลเดอร์
   - ใส่ `Dockerfile` ในแต่ละโฟลเดอร์

4. **รันด้วย Docker Compose**
```bash
docker-compose up --build
```

5. **เข้าใช้งาน**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

## 🔧 Manual Setup (ไม่ใช้ Docker)

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm หรือ yarn

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### MongoDB Setup
ติดตั้ง MongoDB และรันบน port 27017 หรือใช้ MongoDB Atlas

## 📡 API Endpoints

### Movies
- `GET /api/movies` - ดูภาพยนตร์ทั้งหมด
- `GET /api/movies/:id` - ดูภาพยนตร์ตัวเดียว
- `POST /api/movies` - เพิ่มภาพยนตร์ใหม่
- `PUT /api/movies/:id` - แก้ไขภาพยนตร์
- `DELETE /api/movies/:id` - ลบภาพยนตร์

### Profile
- `GET /api/profile` - ดูข้อมูลโปรไฟล์
- `PUT /api/profile` - แก้ไขข้อมูลโปรไฟล์

### Health Check
- `GET /api/health` - ตรวจสอบสถานะ API

## 🎨 Features Detail

### Movie Management
- **เพิ่มภาพยนตร์**: กรอกชื่อ, ปี, คะแนน IMDB, คะแนน RT, URL โปสเตอร์
- **แก้ไขภาพยนตร์**: คลิกปุ่มแก้ไขเพื่อเปลี่ยนข้อมูล
- **ลบภาพยนตร์**: คลิกปุ่มลบเพื่อเอาออก
- **แสดงผล**: การ์ดภาพยนตร์ที่สวยงาม พร้อมรูปภาพและข้อมูลครบถ้วน

### User Interface
- **Responsive Design**: ใช้งานได้ทั้งมือถือและเดสก์ท็อป
- **Modern UI**: ใช้ gradient, shadow, hover effects
- **Form Validation**: ตรวจสอบข้อมูลก่อนบันทึก
- **Loading States**: แสดงสถานะการโหลด

## 🔐 Environment Variables

สร้างไฟล์ `.env` ใน backend folder:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/moviedb
```

## 🐳 Docker Configuration

- **MongoDB**: Port 27017, มีข้อมูลเริ่มต้น
- **Backend**: Port 5000, เชื่อมต่อกับ MongoDB
- **Frontend**: Port 3000, เชื่อมต่อกับ Backend
- **Volume**: เก็บข้อมูล MongoDB แบบ persistent

## 🚨 Troubleshooting

### ปัญหาที่อาจพบ
1. **MongoDB Connection Error**: ตรวจสอบว่า MongoDB รันอยู่
2. **Port Already in Use**: เปลี่ยน port ใน docker-compose.yml
3. **CORS Error**: ตรวจสอบการตั้งค่า CORS ใน backend

### คำสั่งที่มีประโยชน์
```bash
# ดู logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild images
docker-compose up --build --force-recreate

# เข้าไปใน container
docker exec -it movie_app_backend sh
```

## 📝 Todo / Enhancements

- [ ] Authentication system
- [ ] Image upload functionality
- [ ] Search and filter movies
- [ ] Movie categories/genres
- [ ] Rating system
- [ ] Movie reviews
- [ ] Export data functionality
- [ ] Movie recommendations

## 🤝 Contributing

1. Fork the project
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📄 License

This project is open source and available under the MIT License.