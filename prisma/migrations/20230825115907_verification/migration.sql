/*
  Warnings:

  - Added the required column `verification_code` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Users` ADD COLUMN `verification_code` INTEGER UNSIGNED NOT NULL;
