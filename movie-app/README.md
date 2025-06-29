# Movie App - React + Node.js + MongoDB (Netflix Theme)

โปรเจค Movie App ที่มีความสามารถในการจัดการข้อมูลภาพยนตร์ พร้อมทั้งหน้า About สำหรับแสดงข้อมูลส่วนตัว ออกแบบด้วย Netflix Theme

## ✨ Features

### 🏠 Home Page
- แสดงรายการภาพยนตร์ทั้งหมด
- ข้อมูลที่แสดง: ชื่อภาพยนตร์, ปีที่ฉาย, คะแนน IMDB, คะแนน Rotten Tomatoes, โปสเตอร์
- เพิ่ม/ลบ/แก้ไขข้อมูลภาพยนตร์ได้ (CRUD operations)
- UI แบบ Netflix theme ที่สวยงามและ responsive
- การ์ดภาพยนตร์แบบ hover effects เหมือน Netflix
- Form validation และ error handling

### 👤 About Page
- แสดงข้อมูลส่วนตัว 2 คน: รูปภาพ, ชื่อ, นามสกุล, ชื่อเล่น, ID
- **คนที่ 1**: จักรพันธุ์ ฤทธิแผลง (บอล) - ID: 67130401
- **คนที่ 2**: พยุงศักดิ์ ฟูกุนนา (เอิร์ธ) - ID: 67130643
- การ์ดโปรไฟล์แบบ Netflix style พร้อม navigation
- ใช้ข้อมูล hardcode (ไม่ผ่าน API)

## 🎨 Design Theme

### Netflix-Inspired UI
- **Dark Theme**: Background สีดำ (#141414) เหมือน Netflix
- **Netflix Red**: สี primary (#E50914) 
- **Modern Typography**: Helvetica Neue font
- **Hover Effects**: Card animations เหมือน Netflix
- **Fixed Navigation**: Top bar แบบ Netflix
- **Responsive Grid**: Movie cards layout แบบ Netflix catalog

## 🛠 Technology Stack

- **Frontend**: React.js + CSS (Netflix Theme)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with sample data
- **Containerization**: Docker + Docker Compose
- **Development**: Hot reload และ volume mounting

## 📁 Project Structure

```
movie-app/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── images/              # รูปภาพโปรไฟล์
│   │       ├── student-photo-01.png
│   │       └── student-photo-02.jpg
│   ├── src/
│   │   ├── App.js              # Main React component
│   │   ├── App.css             # Netflix theme styles
│   │   └── index.js            # React entry point
│   ├── package.json
│   └── Dockerfile
├── backend/
│   ├── server.js               # Express server with API routes
│   ├── package.json
│   ├── .env                    # Environment variables
│   └── Dockerfile
├── mongo-init.js               # Database initialization
├── docker-compose.yml          # Multi-container setup
└── README.md
```

## 🚀 Quick Start with Docker

### Prerequisites
- Docker
- Docker Compose

### การติดตั้งและรัน

1. **สร้างโครงสร้างโปรเจค**
```bash
mkdir movie-app
cd movie-app
mkdir frontend backend
mkdir frontend/src frontend/public frontend/public/images
```

2. **สร้างไฟล์ที่จำเป็น**
```bash
# Frontend files
touch frontend/src/App.js
touch frontend/src/App.css  
touch frontend/src/index.js
touch frontend/public/index.html
touch frontend/package.json
touch frontend/Dockerfile

# Backend files
touch backend/server.js
touch backend/package.json
touch backend/.env
touch backend/Dockerfile

# Root files
touch docker-compose.yml
touch mongo-init.js
touch README.md
```

3. **ใส่ code ตาม artifacts ที่ให้**
   - Copy React components ใน `frontend/src/`
   - Copy Backend API ใน `backend/`
   - Copy Docker configs

4. **เพิ่มรูปภาพโปรไฟล์**
```bash
# ใส่รูปภาพใน frontend/public/images/
# student-photo-01.png (สำหรับ จักรพันธุ์)
# student-photo-02.jpg (สำหรับ พยุงศักดิ์)
```

5. **รันด้วย Docker Compose**
```bash
docker-compose up --build
```

6. **เข้าใช้งาน**
   - Frontend: http://localhost:3000 (Netflix theme UI)
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

### Movie Management (API-based)
- **เพิ่มภาพยนตร์**: กรอกชื่อ, ปี, คะแนน IMDB, คะแนน RT, URL โปสเตอร์
- **แก้ไขภาพยนตร์**: คลิกปุ่มแก้ไขเพื่อเปลี่ยนข้อมูล (Form focus แก้ไขแล้ว)
- **ลบภาพยนตร์**: คลิกปุ่มลบพร้อม confirmation dialog
- **แสดงผล**: การ์ดภาพยนตร์แบบ Netflix พร้อม hover effects
- **Real-time Updates**: ข้อมูลอัปเดตผ่าน API ทันที

### Profile Management (Hardcode)
- **2 Profiles**: จักรพันธุ์ (บอล) และ พยุงศักดิ์ (เอิร์ธ)
- **Navigation**: เปลี่ยนระหว่างโปรไฟล์ด้วยปุ่มก่อนหน้า/ถัดไป
- **Profile Display**: รูป, ชื่อ, นามสกุล, ชื่อเล่น, ID
- **Netflix Style**: การ์ดโปรไฟล์แบบ Netflix

### User Interface (Netflix Theme)
- **Responsive Design**: ใช้งานได้ทั้งมือถือและเดสก์ท็อป
- **Netflix Colors**: Dark background, Netflix red accents
- **Modern Animations**: Hover effects, transitions, transforms
- **Form Validation**: ตรวจสอบข้อมูลก่อนบันทึก
- **Loading States**: แสดงสถานะการโหลดและ error messages
- **Fixed Navigation**: Navigation bar แบบ Netflix

## 🔐 Environment Variables

สร้างไฟล์ `.env` ใน backend folder:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://admin:password123@mongodb:27017/moviedb?authSource=admin
CORS_ORIGIN=http://localhost:3000
```

## 🐳 Docker Configuration

- **MongoDB**: Port 27017, Authentication enabled, มีข้อมูลเริ่มต้น 3 หนัง + 2 โปรไฟล์
- **Backend**: Port 5000, Hot reload พร้อม volume mounting
- **Frontend**: Port 3000, Hot reload พร้อม volume mounting
- **Volumes**: Persistent MongoDB data + development volume mounting
- **Health Checks**: MongoDB health check ก่อน Backend start

## 🎬 Sample Data

### Movies (จาก MongoDB)
1. **The Dark Knight** (2008) - IMDB: 9.0, RT: 94%
2. **Inception** (2010) - IMDB: 8.8, RT: 87% 
3. **Interstellar** (2014) - IMDB: 8.6, RT: 72%

### Profiles (Hardcode)
1. **จักรพันธุ์ ฤทธิแผลง** (บอล) - ID: 67130401
2. **พยุงศักดิ์ ฟูกุนนา** (เอิร์ธ) - ID: 67130643

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

## 📝 Development Notes

### Fixed Issues
- ✅ **Form Focus**: แก้ไขปัญหา textbox หลุด focus เมื่อพิมพ์
- ✅ **Component Separation**: แยก HomePage และ AboutPage เป็น separate components
- ✅ **API Integration**: Movies ใช้ API, About ใช้ hardcode
- ✅ **Docker Optimization**: Volume mounting สำหรับ hot reload
- ✅ **MongoDB Connection**: Retry logic และ health checks

### Architecture Decisions
- **Movies**: Full CRUD ผ่าน MongoDB API
- **About**: Static hardcode data (ไม่มี CRUD ไม่จำเป็นต้องใช้ API)
- **Theme**: Netflix-inspired design เพื่อ modern UX
- **Development**: Hot reload ทั้ง Frontend และ Backend

## 🚀 Performance Features

- **Hot Reload**: แก้ไข code เห็นผลทันทีโดยไม่ต้อง rebuild
- **Volume Mounting**: Source code mount จาก host
- **Component Optimization**: Prevent unnecessary re-renders
- **Lazy Loading**: รูปภาพโหลดเมื่อจำเป็น
- **Error Boundaries**: Handle errors gracefully

## 🤝 Contributing

1. Fork the project
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📄 License

This project is open source and available under the MIT License.