/*
  Warnings:

  - A unique constraint covering the columns `[subjectId,day,startTime,group]` on the table `ScheduleEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ScheduleEntry_subjectId_day_startTime_key";

-- AlterTable
ALTER TABLE "ScheduleEntry" ADD COLUMN     "group" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleEntry_subjectId_day_startTime_group_key" ON "ScheduleEntry"("subjectId", "day", "startTime", "group");
