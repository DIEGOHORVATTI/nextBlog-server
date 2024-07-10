/*
  Warnings:

  - You are about to drop the column `namme` on the `tags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "tags_namme_key";

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "namme",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");
