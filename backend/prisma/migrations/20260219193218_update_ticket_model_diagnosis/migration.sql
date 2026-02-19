/*
  Warnings:

  - Added the required column `diagnosis` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "diagnosis" TEXT NOT NULL;
