/*
  Warnings:

  - You are about to drop the column `perfilUrl` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "perfilUrl",
ADD COLUMN     "profileUrl" TEXT;

-- CreateIndex
CREATE INDEX "Message_authorId_idx" ON "Message"("authorId");

-- CreateIndex
CREATE INDEX "Ticket_createdById_idx" ON "Ticket"("createdById");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");
