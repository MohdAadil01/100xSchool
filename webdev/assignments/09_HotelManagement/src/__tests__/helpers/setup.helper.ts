import request from "supertest";
import { app } from "../../app";

export const registerAndLogin = async (role: string, propertyId?: string) => {
  const userData = {
    firstName: "Test",
    lastName: "User",
    email: `${role}@test.com`,
    password: "pass1234",
    phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    role,
    ...(propertyId && { property: propertyId }),
  };

  await request(app).post("/api/v1/auth/register").send(userData);

  const loginResponse = await request(app)
    .post("/api/v1/auth/login")
    .send({ email: userData.email, password: userData.password });

  return loginResponse.body.data.token;
};

export const createProperty = async (token: string) => {
  const response = await request(app)
    .post("/api/v1/properties")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "TEST HOTEL",
      address: "123 Test Street",
      city: "Delhi",
      country: "India",
      phone: "01123456789",
      email: "test@hotel.com",
      currency: "INR",
      timezone: "Asia/Kolkata",
    });

  return response.body.data._id;
};

export const createRoomType = async (token: string, propertyId: string) => {
  const response = await request(app)
    .post("/api/v1/room-types")
    .set("Authorization", `Bearer ${token}`)
    .send({
      code: "KNGN",
      name: "King Non Smoking",
      description: "King bed non smoking room",
      bedType: "king",
      maxOccupancy: 2,
      features: ["wifi", "ac"],
      property: propertyId,
    });

  return response.body.data._id;
};

export const createRoom = async (
  token: string,
  propertyId: string,
  roomTypeId: string,
  roomNumber: string = "101",
) => {
  const response = await request(app)
    .post("/api/v1/rooms")
    .set("Authorization", `Bearer ${token}`)
    .send({
      roomNumber,
      floor: 1,
      roomType: roomTypeId,
      property: propertyId,
    });

  return response.body.data._id;
};

export const createRatePlan = async (
  token: string,
  propertyId: string,
  roomTypeId: string,
) => {
  const response = await request(app)
    .post("/api/v1/rate-plans")
    .set("Authorization", `Bearer ${token}`)
    .send({
      code: "TESTRATE",
      name: "Test Rate Plan",
      description: "Rate plan for testing",
      property: propertyId,
      roomTypes: [{ roomType: roomTypeId, pricePerNight: 5000 }],
      startDate: "2020-01-01",
      endDate: "2030-12-31",
    });

  return response.body.data._id;
};

export const createGuest = async (token: string, propertyId: string) => {
  const response = await request(app)
    .post("/api/v1/guests")
    .set("Authorization", `Bearer ${token}`)
    .send({
      firstName: "Test",
      lastName: "Guest",
      email: "guest@test.com",
      phone: "9876543210",
      nationality: "Indian",
      idType: "passport",
      idNumber: "P1234567",
      dateOfBirth: "1990-01-01",
      membershipType: "none",
      property: propertyId,
    });

  return response.body.data._id;
};

export const setupReservationPrerequisites = async () => {
  const superadminToken = await registerAndLogin("superadmin");

  const propertyId = await createProperty(superadminToken);

  const frontdeskToken = await registerAndLogin("frontdesk", propertyId);

  const roomTypeId = await createRoomType(superadminToken, propertyId);

  const roomId = await createRoom(superadminToken, propertyId, roomTypeId);

  const ratePlanId = await createRatePlan(
    superadminToken,
    propertyId,
    roomTypeId,
  );

  const guestId = await createGuest(frontdeskToken, propertyId);

  return {
    superadminToken,
    frontdeskToken,
    propertyId,
    roomTypeId,
    roomId,
    ratePlanId,
    guestId,
  };
};
