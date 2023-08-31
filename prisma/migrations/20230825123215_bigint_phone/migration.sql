/*
  Warnings:

  - You are about to alter the column `phone` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `UnsignedBigInt`.

*/
-- AlterTable
ALTER TABLE `Users` MODIFY `phone` BIGINT UNSIGNED NOT NULL;
