/*
  Warnings:

  - A unique constraint covering the columns `[instructorId,title]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Course_instructorId_title_key" ON "Course"("instructorId", "title");
