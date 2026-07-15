# Hotel Management System

A full-stack Hotel Management System (HMS) built with Node.js, Express, TypeScript, and MongoDB — modeled after enterprise Property Management Systems (PMS) like Opera. Built with real-world hospitality domain knowledge from hands-on experience with IHG's Opera PMS and GRS systems.

---

## Features

### Multi-Property Architecture
- Manage multiple hotel properties from a single system
- Complete data isolation between properties
- Superadmin oversight across all properties

### Role-Based Access Control
| Role | Permissions |
|------|-------------|
| **Superadmin** | Full system access, manage all properties |
| **Admin** | Manage single property, staff, rooms, rate plans |
| **Front Desk** | Reservations, check-in, check-out, guest profiles |
| **Housekeeping** | View and update room status only |

### Reservation Lifecycle
```
Reserved → Arrival → Inhouse → Departed
                   ↘ Cancelled
                   ↘ No Show
```

### Core Modules
- **Auth** — JWT authentication with role-based middleware
- **Property Management** — Multi-property setup and configuration
- **Room Types** — KNGN, SUITE, DBLQ etc with bed type and features
- **Room Management** — Physical rooms with real-time status tracking
- **Rate Plans** — Dynamic pricing per room type with date validity
- **Guest Profiles** — Complete guest information with membership tracking
- **Reservations** — Full lifecycle from booking to checkout

---

## Technical Highlights

### Availability Search Algorithm
Date overlap detection to find available rooms:
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
Atomic operations for check-in and check-out to ensure data consistency:
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

### Price Locking
Rate plan prices are locked at booking time — price changes never affect existing reservations.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Language | TypeScript |
| Database | MongoDB + Mongoose |
| Authentication | JWT |
| Validation | Zod |
| Password Hashing | Bcryptjs |

---

## Project Structure

```
src/
├── config/
│   └── db.ts
├── controllers/
│   ├── auth.controller.ts
│   ├── property.controller.ts
│   ├── roomType.controller.ts
│   ├── room.controller.ts
│   ├── ratePlan.controller.ts
│   ├── guest.controller.ts
│   └── reservation.controller.ts
├── middlewares/
│   ├── auth.middleware.ts
│   ├── role.middleware.ts
│   └── error.middleware.ts
├── models/
│   ├── User.model.ts
│   ├── Property.model.ts
│   ├── RoomType.model.ts
│   ├── Room.model.ts
│   ├── RatePlan.model.ts
│   ├── Guest.model.ts
│   └── Reservation.model.ts
├── routes/
├── services/
├── utils/
│   ├── AppError.ts
│   ├── ApiResponse.ts
│   ├── AsyncHandler.ts
│   └── GenerateConfirmation.ts
├── validators/
└── types/
    └── express.d.ts
```

---

## API Endpoints

### Auth
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/auth/me
```

### Properties
```
POST   /api/v1/properties          (superadmin)
GET    /api/v1/properties          (superadmin, admin)
GET    /api/v1/properties/:id      (superadmin, admin)
PATCH  /api/v1/properties/:id      (superadmin)
```

### Room Types
```
POST   /api/v1/room-types          (superadmin, admin)
GET    /api/v1/room-types          (superadmin, admin, frontdesk)
GET    /api/v1/room-types/:id      (superadmin, admin, frontdesk)
PATCH  /api/v1/room-types/:id      (superadmin, admin)
PATCH  /api/v1/room-types/:id/deactivate (superadmin, admin)
```

### Rooms
```
POST   /api/v1/rooms               (superadmin, admin)
GET    /api/v1/rooms               (all roles)
GET    /api/v1/rooms/:id           (all roles)
PATCH  /api/v1/rooms/:id           (superadmin, admin)
PATCH  /api/v1/rooms/:id/status    (all roles)
PATCH  /api/v1/rooms/:id/deactivate (superadmin, admin)
```

### Rate Plans
```
POST   /api/v1/rate-plans                          (superadmin, admin)
GET    /api/v1/rate-plans                          (superadmin, admin, frontdesk)
GET    /api/v1/rate-plans/:id                      (superadmin, admin, frontdesk)
PATCH  /api/v1/rate-plans/:id                      (superadmin, admin)
PATCH  /api/v1/rate-plans/:id/add-room             (superadmin, admin)
PATCH  /api/v1/rate-plans/:id/remove-room          (superadmin, admin)
PATCH  /api/v1/rate-plans/:id/update-price         (superadmin, admin)
PATCH  /api/v1/rate-plans/:id/deactivate           (superadmin, admin)
```

### Guests
```
POST   /api/v1/guests              (superadmin, admin, frontdesk)
GET    /api/v1/guests              (superadmin, admin, frontdesk)
GET    /api/v1/guests/search       (superadmin, admin, frontdesk)
GET    /api/v1/guests/:id          (superadmin, admin, frontdesk)
PATCH  /api/v1/guests/:id          (superadmin, admin, frontdesk)
```

### Reservations
```
POST   /api/v1/reservations/availability  (superadmin, admin, frontdesk)
POST   /api/v1/reservations               (frontdesk, admin, superadmin)
GET    /api/v1/reservations               (superadmin, admin, frontdesk)
GET    /api/v1/reservations/:id           (superadmin, admin, frontdesk)
PATCH  /api/v1/reservations/:id/checkin   (frontdesk)
PATCH  /api/v1/reservations/:id/checkout  (frontdesk)
PATCH  /api/v1/reservations/:id/cancel    (superadmin, admin, frontdesk)
PATCH  /api/v1/reservations/:id/noshow    (frontdesk)
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/hotel-management-system

# Install dependencies
cd hotel-management-system
npm install

# Create .env file
cp .env.example .env
```

### Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hms
JWT_SECRET=your_jwt_secret_key
SALT_ROUNDS=10
```

### Run

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

---

## Domain Knowledge

This system is modeled after real enterprise PMS workflows used at IHG properties:

- **Rate Plans** — Mirror Opera PMS rate codes (INKPCM, BARCORP etc)
- **Room Types** — Coded like Opera (KNGN, SUITE, DBLQ etc)
- **Reservation Flow** — Matches actual front desk operations
- **Status Lifecycle** — Reserved → Arrival → Inhouse → Departed mirrors Opera statuses
- **Availability Logic** — Reflects how GRS prevents double bookings across channels

---

## Author

Built as part of a full-stack development journey, transitioning from QA engineering on enterprise hospitality software to software development.