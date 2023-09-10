/*
  Warnings:

  - The primary key for the `Cafe_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `user_id` on the `Cafe_user` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `cafe_id` on the `Cafe_user` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `Cafes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Cafes` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `Daily_codes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Daily_codes` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `cafe_id` on the `Daily_codes` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `Prizes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Prizes` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `cafe_id` on the `Prizes` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `User_prize` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `prize_id` on the `User_prize` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `user_id` on the `User_prize` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.

*/
-- DropForeignKey
ALTER TABLE `Cafe_user` DROP FOREIGN KEY `Cafe_user_cafe_id_fkey`;

-- DropForeignKey
ALTER TABLE `Cafe_user` DROP FOREIGN KEY `Cafe_user_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Daily_codes` DROP FOREIGN KEY `Daily_codes_cafe_id_fkey`;

-- DropForeignKey
ALTER TABLE `Prizes` DROP FOREIGN KEY `Prizes_cafe_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_prize` DROP FOREIGN KEY `User_prize_prize_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_prize` DROP FOREIGN KEY `User_prize_user_id_fkey`;

-- AlterTable
ALTER TABLE `Cafe_user` DROP PRIMARY KEY,
    MODIFY `user_id` INTEGER UNSIGNED NOT NULL,
    MODIFY `cafe_id` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`user_id`, `cafe_id`);

-- AlterTable
ALTER TABLE `Cafes` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Daily_codes` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `cafe_id` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Prizes` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `cafe_id` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User_prize` DROP PRIMARY KEY,
    MODIFY `prize_id` INTEGER UNSIGNED NOT NULL,
    MODIFY `user_id` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`prize_id`, `user_id`);

-- AlterTable
ALTER TABLE `Users` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Daily_codes` ADD CONSTRAINT `Daily_codes_cafe_id_fkey` FOREIGN KEY (`cafe_id`) REFERENCES `Cafes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cafe_user` ADD CONSTRAINT `Cafe_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cafe_user` ADD CONSTRAINT `Cafe_user_cafe_id_fkey` FOREIGN KEY (`cafe_id`) REFERENCES `Cafes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_prize` ADD CONSTRAINT `User_prize_prize_id_fkey` FOREIGN KEY (`prize_id`) REFERENCES `Prizes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_prize` ADD CONSTRAINT `User_prize_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prizes` ADD CONSTRAINT `Prizes_cafe_id_fkey` FOREIGN KEY (`cafe_id`) REFERENCES `Cafes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
