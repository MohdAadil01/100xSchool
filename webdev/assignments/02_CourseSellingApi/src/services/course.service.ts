import prisma from "../lib/prisma";
import { AppError } from "../utils/AppError";
import {
  CourseIdInputType,
  CreateCourseInputType,
  UpdateCourseInputType,
} from "../validation/course.validation";

export const createCourseService = async (
  data: CreateCourseInputType,
  role: string,
  instructorId: string,
) => {
  if (role.toLowerCase() != "instructor")
    throw new AppError("UNAUTHORIZED", 403);
  const { title, description, price } = data;
  const existingCourse = await prisma.course.findFirst({
    where: {
      title,
      description,
      instructorId,
    },
  });
  if (existingCourse) throw new AppError("Course already exists", 400);

  const course = await prisma.course.create({
    data: {
      title,
      description,
      price,
      instructorId,
    },
  });

  return course;
};

export const getCourseService = async () => {
  const courses = await prisma.course.findMany({});
  if (courses.length === 0) throw new AppError("No Course found", 404);

  return courses;
};

export const getCourseByIdService = async (courseId: string) => {
  if (!courseId) throw new AppError("CourseID not given", 404);
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      lessions: true,
    },
  });
  if (!course) throw new AppError("Course not found", 404);
  return course;
};

export const updateCourseService = async (
  courseId: string,
  data: UpdateCourseInputType,
  role: string,
  instructorId: string,
) => {
  if (role.toLowerCase() != "instructor")
    throw new AppError("Unauthorized", 403);
  if (!courseId) throw new AppError("Course Id not given", 404);

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });
  if (!course) throw new AppError("Course not found.", 404);

  const isAuthorized = course.instructorId == instructorId;
  if (!isAuthorized) throw new AppError("Unauthorized", 404);

  const updatedCourse = await prisma.course.update({
    where: {
      id: courseId,
    },
    data,
  });

  return updatedCourse;
};

export const deleteCourseService = async (
  courseId: string,
  role: string,
  instructorId: string,
) => {
  if (role.toLowerCase() != "instructor")
    throw new AppError("Unauthorized", 403);
  if (!courseId) throw new AppError("Course Id not given", 404);

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });
  if (!course) throw new AppError("course not found", 404);
  const isAuthorized = course?.instructorId == instructorId;
  if (!isAuthorized) throw new AppError("Unauthorized", 403);

  const deletedCourse = await prisma.course.delete({
    where: {
      id: courseId,
    },
  });

  return deletedCourse;
};
