/*
  Warnings:

  - A unique constraint covering the columns `[courseId,title]` on the table `Lession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Lession_courseId_title_key" ON "Lession"("courseId", "title");
