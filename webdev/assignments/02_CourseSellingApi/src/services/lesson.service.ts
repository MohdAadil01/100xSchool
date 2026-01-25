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

  const existingLesson = await prisma.lesson.findUnique({
    where: {
      courseId_title: {
        courseId,
        title,
      },
    },
  });

  if (existingLesson)
    throw new AppError("Lession already there in this course", 400);

  const lesson = await prisma.lesson.create({
    data: {
      title,
      content,
      courseId,
    },
  });

  return lesson;
};

export const getCourseLessonsService = async (courseId: string) => {
  if (!courseId) throw new AppError("CourseId not given", 404);

  const lessons = await prisma.lesson.findMany({
    where: {
      courseId,
    },
  });

  return lessons;
};
