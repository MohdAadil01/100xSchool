import prisma from "../lib/prisma";
import { AppError } from "../utils/AppError";
import { CreateLessionInputType } from "../validation/lession.validation";

export const createLessonService = async (
  data: CreateLessionInputType,
  role: string,
  instructorId: string,
) => {
  if (role.toLowerCase() != "instructor")
    throw new AppError("Unauthorized", 403);
  const { title, content, courseId } = data;

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      instructorId,
    },
  });
  if (!course) throw new AppError("Course not found.", 404);

  const lession = await prisma.lession.create({
    data: {
      title,
      content,
      courseId,
    },
  });

  return lession;
};

export const getCourseLessonsService = async (courseId: string) => {
  if (!courseId) throw new AppError("CourseId not given", 404);

  const lessions = await prisma.lession.findMany({
    where: {
      courseId,
    },
  });

  return lessions;
};
