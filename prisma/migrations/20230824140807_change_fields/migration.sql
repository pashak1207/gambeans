/*
  Warnings:

  - You are about to drop the column `age` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `step` on the `Users` table. All the data in the column will be lost.
  - Added the required column `DOB` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cafe_user` ADD COLUMN `step` INTEGER UNSIGNED NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `age`,
    DROP COLUMN `step`,
    ADD COLUMN `DOB` DATETIME(3) NOT NULL;
