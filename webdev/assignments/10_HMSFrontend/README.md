# 🏨 Hotel Management System

A full-stack Hotel Management System (HMS) modeled after enterprise Property Management Systems (PMS) like **Opera by Oracle**, built from real-world experience working with IHG's Opera PMS and GRS systems.

**Live Demo:** [https://hms-frontend-git-main-mohd-aadils-projects.vercel.app](https://hms-frontend-git-main-mohd-aadils-projects.vercel.app/login)

---

## 🔐 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Super Admin** | superadmin@hms.com | password123 |
| **Admin** | admin@hms.com | password123 |
| **Front Desk** | frontdesk@hms.com | password123 |

> **Note:** Hosted on Render free tier — first request may take 1-2 minutes to wake the server.

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication with **httpOnly cookies**
- Role-based access control — **Superadmin, Admin, Front Desk, Housekeeping**
- Login rate limiting (5 attempts per 15 minutes) via Redis
- Secure logout with cookie clearing

### 🏠 Multi-Property Architecture
- Manage multiple hotel properties from a single system
- Complete data isolation between properties
- Superadmin oversight across all properties

### 📅 Reservation Lifecycle
```
Reserved → Arrival → Inhouse → Departed
                   ↘ Cancelled
                   ↘ No Show
```
- Automatic status update to **Arrival** when check-in date is today
- Walk-in reservation support
- Full reservation history

### 🛎️ Front Desk Operations
- **Availability Search** — date overlap detection prevents double bookings
- **New Reservation** — multi-step booking flow with rate plan selection
- **Guest Search** — search by name or email
- **Check-in** — automatic room assignment from available clean rooms
- **Check-out** — atomic status update via MongoDB transactions
- **Cancel** — reservation cancellation with inventory release

### 🏷️ Rate Plan Management
- Multiple rate plans per property (INKPCM, BARCORP, WEEKND etc.)
- Room type pricing per rate plan
- Date validity ranges for seasonal pricing
- Dynamic price locking at booking time

### 🛏️ Room Management
- Physical room tracking with status board
- Color-coded room grid — Clean (green), Occupied (red), Dirty (yellow), Out of Order (gray)
- Housekeeping can mark dirty rooms as clean
- Room type assignment with bed type and features

### 👤 Guest Profiles
- Complete guest information — name, nationality, ID, membership
- Membership tiers — None, Silver, Gold, Platinum
- Search by last name or email
- Stay history tracking

### 📊 Reports
- **Occupancy Rate** — real-time occupancy percentage with room breakdown
- **Today's Arrivals** — list of expected arrivals with guest details
- **Monthly Revenue** — total revenue and reservation count for current month

### 📧 Email Notifications
- Reservation confirmation email with full stay details
- Checkout summary email with billing information
- Professional HTML email templates

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js + Express.js | Server framework |
| TypeScript | Type safety |
| MongoDB + Mongoose | Database |
| Redis (Upstash) | Caching + Rate limiting |
| JWT | Authentication |
| Zod | Request validation |
| Bcrypt | Password hashing |
| Nodemailer / Resend | Email notifications |
| Jest + Supertest | Testing |

### Frontend
| Technology | Purpose |
|-----------|---------|
| React + TypeScript | UI framework |
| React Query | Server state management |
| React Router v6 | Navigation |
| Axios | HTTP client |
| Tailwind CSS | Styling |
| Context API | Auth state |

### Infrastructure
| Service | Purpose |
|---------|---------|
| Render | Backend hosting |
| Vercel | Frontend hosting |
| MongoDB Atlas | Cloud database |
| Upstash | Cloud Redis |

---

## 🏗️ Architecture Highlights

### Availability Search Algorithm
Prevents double bookings using date overlap detection:
```typescript
// Find rooms already booked for requested dates
const bookedRoomIds = await Reservation.find({
  property,
  status: { $nin: ["cancelled", "noshow", "departed"] },
  $or: [{ checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } }],
}).distinct("room");

// Find available rooms not in booked list
const availableRooms = await Room.find({
  property,
  _id: { $nin: bookedRoomIds },
  isActive: true,
});
```

### MongoDB Transactions
Atomic check-in and checkout to ensure data consistency:
```typescript
await session.withTransaction(async () => {
  // Update reservation status
  await Reservation.findOneAndUpdate(
    { _id: id, status: "inhouse" },
    { status: "departed" },
    { session }
  );
  // Update room status
  await Room.findByIdAndUpdate(
    reservation.room,
    { $set: { status: "dirty" } },
    { session }
  );
});
```

### Redis Caching
Availability search results cached for 5 minutes with automatic invalidation:
```typescript
// Check cache first
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);

// Cache miss — query DB and store
await redis.set(cacheKey, JSON.stringify(result), "EX", 300);
```

### Aggregation Pipeline Reports
```typescript
// Occupancy rate using $cond and $divide
Room.aggregate([
  { $match: { property: propertyId, isActive: true } },
  {
    $group: {
      _id: null,
      totalRooms: { $sum: 1 },
      occupiedRooms: {
        $sum: { $cond: [{ $eq: ["$status", "occupied"] }, 1, 0] }
      }
    }
  },
  {
    $project: {
      occupancyRate: {
        $multiply: [{ $divide: ["$occupiedRooms", "$totalRooms"] }, 100]
      }
    }
  }
]);
```

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # DB, Redis, env config
│   ├── controllers/     # Route handlers
│   ├── middlewares/     # Auth, role, error middleware
│   ├── models/          # Mongoose models
│   │   ├── User.model.ts
│   │   ├── Property.model.ts
│   │   ├── RoomType.model.ts
│   │   ├── Room.model.ts
│   │   ├── RatePlan.model.ts
│   │   ├── Guest.model.ts
│   │   └── Reservation.model.ts
│   ├── routes/          # Express routes
│   ├── services/        # Business logic
│   ├── utils/           # Helpers, email templates
│   ├── validators/      # Zod schemas
│   └── __tests__/       # Jest tests
│
frontend/
├── src/
│   ├── api/             # Axios instance
│   ├── components/      # Reusable components
│   ├── context/         # Auth context
│   ├── hooks/           # React Query hooks
│   └── pages/           # Page components
│       ├── auth/        # Login, Register
│       ├── dashboard/   # Dashboard
│       ├── reservations/# Reservation management
│       ├── rooms/       # Room status board
│       ├── guests/      # Guest profiles
│       └── reports/     # Reports
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- Redis

### Backend Setup
```bash
git clone https://github.com/mohdaadil01/hotel-management-system
cd backend
npm install

# Create .env file
cp .env.example .env
# Fill in your environment variables

# Seed database with sample data
npm run seed

# Start development server
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install

# Create .env file
VITE_API_URL=http://localhost:9090/api/v1

npm run dev
```

### Environment Variables

**Backend `.env`:**
```env
PORT=9090
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SALT=10
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM_NAME=Hotel Management System
REDIS_URL=your_redis_url
CLIENT_URL=http://localhost:5173
```

---

## 🌐 API Endpoints

### Auth
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
GET    /api/v1/auth/me
```

### Reservations
```
POST   /api/v1/reservations/availability  ← search availability
POST   /api/v1/reservations               ← create reservation
GET    /api/v1/reservations               ← list reservations
GET    /api/v1/reservations/:id           ← get reservation
PATCH  /api/v1/reservations/:id/checkin   ← check in
PATCH  /api/v1/reservations/:id/checkout  ← check out
PATCH  /api/v1/reservations/:id/cancel    ← cancel
PATCH  /api/v1/reservations/:id/noshow    ← no show
```

### Rooms
```
POST   /api/v1/rooms
GET    /api/v1/rooms
PATCH  /api/v1/rooms/:id/status           ← update status
PATCH  /api/v1/rooms/:id/deactivate
```

### Reports
```
GET    /api/v1/reports/:propertyId/occupancy-rate
GET    /api/v1/reports/:propertyId/arrivals
GET    /api/v1/reports/:propertyId/revenue
```

---

## 🧪 Testing

```bash
npm test                 # run all tests
npm run test:watch       # watch mode
npm run test:coverage    # coverage report
```

Test coverage includes:
- Unit tests — utility functions
- Integration tests — auth routes, reservation flows
- Positive and negative scenarios
- Redis and email mocking

---

## 💡 Domain Knowledge

This system is modeled after real enterprise PMS workflows:

- **Rate Plans** — mirror Opera PMS rate codes (INKPCM, BARCORP etc.)
- **Room Types** — coded like Opera (KNGN, SUITE, DBLQ etc.)
- **Reservation Flow** — matches actual front desk operations
- **Status Lifecycle** — Reserved → Arrival → Inhouse → Departed mirrors Opera statuses
- **Availability Logic** — reflects how GRS prevents double bookings

Built by a developer with hands-on QA experience on IHG's Opera PMS system.

---

## 👨‍💻 Author

**Mohd Aadil**

- GitHub: [@mohdaadil01](https://github.com/mohdaadil01)
- LinkedIn: [mohdaadil01](https://www.linkedin.com/in/mohdaadil01/)
- Portfolio: [mohd-aadil.vercel.app](https://mohd-aadil.vercel.app/)

---

## 📝 License

MIT License — feel free to use this project for learning and portfolio purposes.