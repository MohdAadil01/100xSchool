import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/AsyncHandler";
import { Request, Response } from "express";
import {
  createCourseInputSchema,
  updateCourseInputSchema,
} from "../validation/course.validation";
import {
  createCourseService,
  deleteCourseService,
  getCourseByIdService,
  getCourseService,
  updateCourseService,
} from "../services/course.service";
import { getCourseLessonsService } from "../services/lesson.service";

export const createCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const parsedBody = createCourseInputSchema.parse(req.body);
    const data = await createCourseService(
      parsedBody,
      req.user?.role!,
      req.user?.id!,
    );
    return res.status(201).json(ApiResponse.success(data));
  },
);

export const getCourses = asyncHandler(async (req: Request, res: Response) => {
  const data = await getCourseService();
  return res.status(200).json(ApiResponse.success(data));
});

export const getCourseByid = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const data = await getCourseByIdService(String(courseId));

    return res.status(200).json(ApiResponse.success(data));
  },
);
export const updateCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const parsedBody = updateCourseInputSchema.parse(req.body);
    const data = await updateCourseService(
      String(courseId),
      parsedBody,
      req.user?.role!,
      req.user?.id!,
    );
    return res.status(200).json(ApiResponse.success(data));
  },
);
export const deleteCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const data = await deleteCourseService(
      String(courseId),
      req.user?.role!,
      req.user?.id!,
    );
    return res.status(200).json(ApiResponse.success(data));
  },
);

export const getCourseLessons = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const data = await getCourseLessonsService(String(courseId));

    return res.status(200).json(ApiResponse.success(data));
  },
);
