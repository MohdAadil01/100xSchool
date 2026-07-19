import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import { reportService } from "../services/reports.service";
import { ApiResponse } from "../utils/ApiResponse";

const getMonthlyRevenue = AsyncHandler(async (req: Request, res: Response) => {
  const { propertyId } = req.params;
  const response = await reportService.getMonthlyRevenue(String(propertyId));

  return res
    .status(200)
    .json(ApiResponse.ok(200, response, "Revenue Report Generated"));
});

const getOccupancyRate = AsyncHandler(async (req: Request, res: Response) => {
  const { propertyId } = req.params;

  const response = await reportService.getOccupancyRate(String(propertyId));

  return res
    .status(200)
    .json(ApiResponse.ok(200, response, "Generated Occupancy report"));
});

const getTodayArrivals = AsyncHandler(async (req: Request, res: Response) => {
  const { propertyId } = req.params;

  const response = await reportService.getTodayArrivals(String(propertyId));

  return res
    .status(200)
    .json(ApiResponse.ok(200, response, "Generated Arrivals report"));
});

export const reportController = {
  getOccupancyRate,
  getTodayArrivals,
  getMonthlyRevenue,
};
