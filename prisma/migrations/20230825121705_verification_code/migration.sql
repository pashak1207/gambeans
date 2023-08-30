/*
  Warnings:

  - You are about to alter the column `verification_code` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Users` MODIFY `verification_code` VARCHAR(191) NOT NULL;
