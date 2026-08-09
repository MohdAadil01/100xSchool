import request from "supertest";
import { app } from "../../app";
import { setupReservationPrerequisites } from "../helpers/setup.helper";

describe("Reservation Routes", () => {
  let superadminToken: string;
  let frontdeskToken: string;
  let propertyId: string;
  let roomTypeId: string;
  let ratePlanId: string;
  let guestId: string;
  let reservationId: string;

  beforeEach(async () => {
    const setup = await setupReservationPrerequisites();
    superadminToken = setup.superadminToken;
    frontdeskToken = setup.frontdeskToken;
    propertyId = setup.propertyId;
    roomTypeId = setup.roomTypeId;
    ratePlanId = setup.ratePlanId;
    guestId = setup.guestId;
  });

  test("should search availability", async () => {
    const response = await request(app)
      .post("/api/v1/reservations/availability")
      .set("Authorization", `Bearer ${frontdeskToken}`)
      .send({
        property: propertyId,
        checkIn: "2026-12-15",
        checkOut: "2026-12-18",
        adults: 2,
        children: 0,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("should create reservation", async () => {
    const response = await request(app)
      .post("/api/v1/reservations")
      .set("Authorization", `Bearer ${frontdeskToken}`)
      .send({
        guest: guestId,
        property: propertyId,
        ratePlan: ratePlanId,
        roomType: roomTypeId,
        checkIn: "2026-12-15",
        checkOut: "2026-12-18",
        adults: 2,
        children: 0,
        source: "phone",
      });

    expect(response.status).toBe(201);
    expect(response.body.data.confirmationNo).toBeDefined();
    expect(response.body.data.nights).toBe(3);
    expect(response.body.data.totalAmount).toBe(15000);

    reservationId = response.body.data._id;
  });

  test("should not create reservation with past date", async () => {
    const response = await request(app)
      .post("/api/v1/reservations")
      .set("Authorization", `Bearer ${frontdeskToken}`)
      .send({
        guest: guestId,
        property: propertyId,
        ratePlan: ratePlanId,
        roomType: roomTypeId,
        checkIn: "2020-01-01",
        checkOut: "2020-01-03",
        adults: 2,
        children: 0,
        source: "phone",
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
