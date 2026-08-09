import { calculateNights } from "../../utils/calculateNights";

describe("calculateNights", () => {
  test("should return 3 for 3 night stay", () => {
    const checkIn = new Date("2026-12-15");
    const checkOut = new Date("2026-12-18");

    const result = calculateNights(checkIn, checkOut);
    expect(result).toBe(3);
  });

  test("should return 1 for same day checkout", () => {
    const checkIn = new Date("2025-12-15");
    const checkOut = new Date("2025-12-16");

    const result = calculateNights(checkIn, checkOut);

    expect(result).toBe(1);
  });

  test("should return 7 for one week stay", () => {
    const checkIn = new Date("2025-12-15");
    const checkOut = new Date("2025-12-22");

    const result = calculateNights(checkIn, checkOut);

    expect(result).toBe(7);
  });
});
