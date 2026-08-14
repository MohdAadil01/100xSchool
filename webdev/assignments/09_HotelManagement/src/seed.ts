import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

config();

import { User } from "./models/User.model";
import { Property } from "./models/Property.model";
import { RoomType } from "./models/RoomType.model";
import { Room } from "./models/Room.model";
import { RatePlan } from "./models/RatePlan.model";
import { Guest } from "./models/Guest.model";
import { Reservation } from "./models/Reservation.model";

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log("✅ Connected to DB");

  // clear existing data
  await User.deleteMany({});
  await Property.deleteMany({});
  await RoomType.deleteMany({});
  await Room.deleteMany({});
  await RatePlan.deleteMany({});
  await Guest.deleteMany({});
  await Reservation.deleteMany({});
  console.log("✅ Cleared existing data");

  // create property
  const property = await Property.create({
    name: "IHG DELHI",
    address: "123 Main Street, Connaught Place",
    city: "Delhi",
    country: "India",
    phone: "01123456789",
    email: "delhi@ihg.com",
    currency: "INR",
    timezone: "Asia/Kolkata",
  });
  console.log("✅ Property created");

  // create users
  const hashedPassword = await bcrypt.hash("password123", 10);

  const superadmin = await User.create({
    firstName: "Super",
    lastName: "Admin",
    email: "superadmin@hms.com",
    password: hashedPassword,
    phone: "9999999999",
    role: "superadmin",
  });

  const admin = await User.create({
    firstName: "Hotel",
    lastName: "Admin",
    email: "admin@hms.com",
    password: hashedPassword,
    phone: "8888888888",
    role: "admin",
    property: property._id,
  });

  const frontdesk = await User.create({
    firstName: "Front",
    lastName: "Desk",
    email: "frontdesk@hms.com",
    password: hashedPassword,
    phone: "7777777777",
    role: "frontdesk",
    property: property._id,
  });
  console.log("✅ Users created");

  // create room types
  const kngn = await RoomType.create({
    code: "KNGN",
    name: "King Non Smoking",
    description: "Spacious king bed room non smoking",
    bedType: "king",
    maxOccupancy: 2,
    features: ["wifi", "ac", "tv", "minibar"],
    property: property._id,
  });

  const suite = await RoomType.create({
    code: "SUITE",
    name: "Deluxe Suite",
    description: "Luxury suite with living area and jacuzzi",
    bedType: "king",
    maxOccupancy: 4,
    features: ["wifi", "ac", "tv", "jacuzzi", "balcony", "minibar"],
    property: property._id,
  });

  const dblq = await RoomType.create({
    code: "DBLQ",
    name: "Double Queen",
    description: "Two queen beds perfect for families",
    bedType: "queen",
    maxOccupancy: 4,
    features: ["wifi", "ac", "tv"],
    property: property._id,
  });
  console.log("✅ Room types created");

  // create rooms
  const rooms = await Room.insertMany([
    {
      roomNumber: "101",
      floor: 1,
      roomType: kngn._id,
      property: property._id,
      status: "clean",
    },
    {
      roomNumber: "102",
      floor: 1,
      roomType: kngn._id,
      property: property._id,
      status: "clean",
    },
    {
      roomNumber: "103",
      floor: 1,
      roomType: kngn._id,
      property: property._id,
      status: "dirty",
    },
    {
      roomNumber: "104",
      floor: 1,
      roomType: dblq._id,
      property: property._id,
      status: "clean",
    },
    {
      roomNumber: "105",
      floor: 1,
      roomType: dblq._id,
      property: property._id,
      status: "occupied",
    },
    {
      roomNumber: "201",
      floor: 2,
      roomType: kngn._id,
      property: property._id,
      status: "clean",
    },
    {
      roomNumber: "202",
      floor: 2,
      roomType: kngn._id,
      property: property._id,
      status: "occupied",
    },
    {
      roomNumber: "203",
      floor: 2,
      roomType: suite._id,
      property: property._id,
      status: "clean",
    },
    {
      roomNumber: "204",
      floor: 2,
      roomType: suite._id,
      property: property._id,
      status: "clean",
    },
    {
      roomNumber: "301",
      floor: 3,
      roomType: suite._id,
      property: property._id,
      status: "dirty",
    },
  ]);
  console.log("✅ Rooms created");

  // create rate plans
  const inkpcm = await RatePlan.create({
    code: "INKPCM",
    name: "IHG King Corporate",
    description: "Corporate rate for IHG members",
    property: property._id,
    roomTypes: [
      { roomType: kngn._id, pricePerNight: 5000 },
      { roomType: suite._id, pricePerNight: 8000 },
      { roomType: dblq._id, pricePerNight: 6000 },
    ],
    startDate: new Date("2024-01-01"),
    endDate: new Date("2026-12-31"),
  });

  const barcorp = await RatePlan.create({
    code: "BARCORP",
    name: "BAR Corporate",
    description: "Best available rate corporate",
    property: property._id,
    roomTypes: [
      { roomType: kngn._id, pricePerNight: 6500 },
      { roomType: suite._id, pricePerNight: 10000 },
      { roomType: dblq._id, pricePerNight: 7500 },
    ],
    startDate: new Date("2024-01-01"),
    endDate: new Date("2026-12-31"),
  });
  console.log("✅ Rate plans created");

  // create guests
  const guests = await Guest.insertMany([
    {
      firstName: "Rahul",
      lastName: "Sharma",
      email: "rahul@guest.com",
      phone: "9876543210",
      nationality: "Indian",
      idType: "passport",
      idNumber: "P1234567",
      dateOfBirth: new Date("1990-05-15"),
      membershipType: "gold",
      property: property._id,
    },
    {
      firstName: "Priya",
      lastName: "Singh",
      email: "priya@guest.com",
      phone: "9876543211",
      nationality: "Indian",
      idType: "national_id",
      idNumber: "N7654321",
      dateOfBirth: new Date("1992-08-20"),
      membershipType: "silver",
      property: property._id,
    },
    {
      firstName: "John",
      lastName: "Smith",
      email: "john@guest.com",
      phone: "9876543212",
      nationality: "British",
      idType: "passport",
      idNumber: "P9876543",
      dateOfBirth: new Date("1985-03-10"),
      membershipType: "platinum",
      property: property._id,
    },
    {
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah@guest.com",
      phone: "9876543213",
      nationality: "American",
      idType: "passport",
      idNumber: "P1111111",
      dateOfBirth: new Date("1988-11-25"),
      membershipType: "none",
      property: property._id,
    },
    {
      firstName: "Amit",
      lastName: "Patel",
      email: "amit@guest.com",
      phone: "9876543214",
      nationality: "Indian",
      idType: "driving_license",
      idNumber: "D9999999",
      dateOfBirth: new Date("1995-07-04"),
      membershipType: "none",
      property: property._id,
    },
  ]);
  console.log("✅ Guests created");

  // create reservations with different statuses
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const twoDaysLater = new Date(today);
  twoDaysLater.setDate(today.getDate() + 2);
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);
  const fiveDaysLater = new Date(today);
  fiveDaysLater.setDate(today.getDate() + 5);
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(today.getDate() - 3);

  await Reservation.insertMany([
    // arrival today
    {
      guest: guests[0]._id,
      property: property._id,
      roomType: kngn._id,
      room: null,
      ratePlan: inkpcm._id,
      checkIn: today,
      checkOut: threeDaysLater,
      nights: 3,
      adults: 2,
      children: 0,
      status: "arrival",
      source: "phone",
      pricePerNight: 5000,
      totalAmount: 15000,
      confirmationNo: "HMS-2024-00001",
      createdBy: frontdesk._id,
    },
    // arrival today
    {
      guest: guests[1]._id,
      property: property._id,
      roomType: suite._id,
      room: null,
      ratePlan: barcorp._id,
      checkIn: today,
      checkOut: twoDaysLater,
      nights: 2,
      adults: 2,
      children: 1,
      status: "arrival",
      source: "website",
      pricePerNight: 10000,
      totalAmount: 20000,
      confirmationNo: "HMS-2024-00002",
      createdBy: frontdesk._id,
    },
    // inhouse
    {
      guest: guests[2]._id,
      property: property._id,
      roomType: kngn._id,
      room: rooms[6]._id, // room 202
      ratePlan: inkpcm._id,
      checkIn: yesterday,
      checkOut: tomorrow,
      nights: 2,
      adults: 1,
      children: 0,
      status: "inhouse",
      source: "ota",
      pricePerNight: 5000,
      totalAmount: 10000,
      confirmationNo: "HMS-2024-00003",
      createdBy: frontdesk._id,
    },
    // inhouse
    {
      guest: guests[3]._id,
      property: property._id,
      roomType: dblq._id,
      room: rooms[4]._id, // room 105
      ratePlan: barcorp._id,
      checkIn: yesterday,
      checkOut: threeDaysLater,
      nights: 4,
      adults: 2,
      children: 2,
      status: "inhouse",
      source: "phone",
      pricePerNight: 7500,
      totalAmount: 30000,
      confirmationNo: "HMS-2024-00004",
      createdBy: frontdesk._id,
    },
    // reserved future
    {
      guest: guests[4]._id,
      property: property._id,
      roomType: kngn._id,
      room: null,
      ratePlan: inkpcm._id,
      checkIn: fiveDaysLater,
      checkOut: new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000),
      nights: 3,
      adults: 2,
      children: 0,
      status: "reserved",
      source: "email",
      pricePerNight: 5000,
      totalAmount: 15000,
      confirmationNo: "HMS-2024-00005",
      createdBy: frontdesk._id,
    },
    // departed
    {
      guest: guests[0]._id,
      property: property._id,
      roomType: suite._id,
      room: rooms[7]._id,
      ratePlan: barcorp._id,
      checkIn: lastWeek,
      checkOut: threeDaysAgo,
      nights: 4,
      adults: 2,
      children: 0,
      status: "departed",
      source: "phone",
      pricePerNight: 10000,
      totalAmount: 40000,
      confirmationNo: "HMS-2024-00006",
      createdBy: frontdesk._id,
    },
    // cancelled
    {
      guest: guests[1]._id,
      property: property._id,
      roomType: kngn._id,
      room: null,
      ratePlan: inkpcm._id,
      checkIn: tomorrow,
      checkOut: threeDaysLater,
      nights: 2,
      adults: 1,
      children: 0,
      status: "cancelled",
      source: "website",
      pricePerNight: 5000,
      totalAmount: 10000,
      confirmationNo: "HMS-2024-00007",
      createdBy: frontdesk._id,
    },
  ]);
  console.log("✅ Reservations created");

  console.log("\n🎉 Seed completed successfully!");
  console.log("\nLogin credentials:");
  console.log("Superadmin: superadmin@hms.com / password123");
  console.log("Admin:      admin@hms.com / password123");
  console.log("Frontdesk:  frontdesk@hms.com / password123");

  await mongoose.disconnect();
};

seed().catch(console.error);
