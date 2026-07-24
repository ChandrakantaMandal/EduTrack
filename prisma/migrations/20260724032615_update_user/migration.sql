/*
  Warnings:

  - You are about to drop the column `credits` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `room` on the `Subject` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "credits",
DROP COLUMN "room";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "practicalGroup" TEXT,
ADD COLUMN     "preferences" JSONB,
ADD COLUMN     "section" TEXT;
