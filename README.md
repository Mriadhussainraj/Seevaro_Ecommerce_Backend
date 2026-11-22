# Seevaro Backend API

Seevaro অ্যাপ্লিকেশনের জন্য একটি স্কেলেবল ও ক্লিন আর্কিটেকচার Node.js + Express REST API ব্যাকএন্ড।

---

## 📁 প্রজেক্ট স্ট্রাকচার (Project Structure)

```
F:\Seevaro_backend\
├── src/
│   ├── config/              # কনফিগারেশন ফাইল (Database, Environment)
│   │   ├── db.js            # MongoDB কানেকশন সেটআপ
│   │   └── env.js           # Environment ভ্যারিয়েবল লোডার
│   │
│   ├── controllers/         # বিজনেস লজিক হ্যান্ডলার
│   │   ├── authController.js# রেজিস্ট্রেশন, লগইন এবং প্রোফাইল কন্ট্রোলার
│   │   └── userController.js# ইউজার ম্যানেজমেন্ট কন্ট্রোলার
│   │
│   ├── middleware/          # কাস্টম মিডলওয়্যার
│   │   ├── authMiddleware.js# JWT টোকেন ভেরিফিকেশন ও রোল-বেসড এক্সেস
│   │   └── errorHandler.js  # গ্লোবাল এরর ও 404 হ্যান্ডলার
│   │
│   ├── models/              # ডাটাবেজ স্কিমা / মডেলস
│   │   └── userModel.js     # User স্কিমা (Bcrypt পাসওয়ার্ড হ্যাশিং সহ)
│   │
│   ├── routes/              # API রাউট ডেফিনিশন
│   │   ├── index.js         # সেন্ট্রাল রাউটার (/api/v1)
│   │   ├── authRoutes.js    # অথেন্টিকেশন রাউটস
│   │   └── userRoutes.js    # ইউজার রাউটস
│   │
│   ├── utils/               # হেল্পার ও ইউটিলিটি ফাংশন
│   │   └── apiResponse.js   # স্ট্যান্ডার্ড JSON রেসপন্স ক্লাস
│   │
│   ├── app.js               # Express অ্যাপ কনফিগারেশন ও মিডলওয়্যার সেটআপ
│   └── server.js            # সার্ভার এন্ট্রি পয়েন্ট ও পোর্ট লিসেনার
│
├── .env                     # সিক্রেট ও কনফিগারেশন ভ্যারিয়েবল
├── .env.example             # ডেমো পরিবেশ ভ্যারিয়েবল
├── .gitignore               # গিট ইগনোর রুলস
├── package.json             # প্রজেক্ট ডিপেন্ডেন্সি ও স্ক্রিপ্ট
└── README.md                # প্রজেক্ট ডকুমেন্টেশন
```

---

## 🚀 ডিপেন্ডেন্সি ইনস্টল ও রান করার নিয়ম (Setup & Run)

### ১. ডিপেন্ডেন্সি ইনস্টল করুন:
টার্মিনালে এই কমান্ডটি রান করুন:
```bash
cd F:\Seevaro_backend
npm install
```

### ২. ডেভেলপমেন্ট মোডে চালু করুন (Hot Reload সহ):
```bash
npm run dev
```

### ৩. প্রোডাকশন মোডে চালু করুন:
```bash
npm start
```

---

## 🌐 ডিফল্ট API এন্ডপয়েন্টস (Default Endpoints)

| Method | Endpoint | Description | এক্সেস |
|---|---|---|---|
| GET | `/` | Root Welcome API | Public |
| GET | `/api/v1/health` | Health Check Endpoint | Public |
| POST | `/api/v1/auth/register` | নতুন ইউজার রেজিস্ট্রেশন | Public |
| POST | `/api/v1/auth/login` | ইউজার লগইন (JWT টোকেন রিটার্ন করে) | Public |
| GET | `/api/v1/auth/profile` | লগইন করা ইউজারের প্রোফাইল | Private (Bearer Token) |
| GET | `/api/v1/users` | সকল ইউজারের তালিকা | Admin Only |
| GET | `/api/v1/users/:id` | আইডি অনুযায়ী ইউজারের তথ্য | Private |

---

## 🛠️ ব্যবহৃত প্যাকেজসমূহ (Dependencies)
- **Express**: দ্রুত ও হালকা ওজনের ওয়েব ফ্রেমওয়ার্ক
- **Mongoose**: MongoDB অবজেক্ট মডেলিং
- **JsonWebToken (JWT)**: সুরক্ষিত অথেন্টিকেশন টোকেন
- **Bcryptjs**: পাসওয়ার্ড হ্যাশিং ও সিকিউরিটি
- **CORS**: Cross-Origin Resource Sharing হ্যান্ডলার
- **Helmet**: HTTP সিকিউরিটি হেডার সেটআপ
- **Morgan**: কনসোল এইচটিটিপি রিকোয়েস্ট লগার
- **Dotenv**: এনভায়রনমেন্ট ভেরিয়েবল লোডার
- **Nodemon**: ডেভেলপমেন্টের জন্য অটো সার্ভার রিস্টার্টার
