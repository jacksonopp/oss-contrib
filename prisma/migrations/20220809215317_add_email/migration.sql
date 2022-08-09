/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Contributor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Contributor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contributor" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contributor_email_key" ON "Contributor"("email");
