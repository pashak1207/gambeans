-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `phone` BIGINT UNSIGNED NOT NULL,
    `role` ENUM('ADMIN', 'LOCAL_ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `status` ENUM('ACTIVE', 'BLOCKED') NOT NULL DEFAULT 'ACTIVE',
    `DOB` DATETIME(3) NULL,
    `verification_code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Users_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Daily_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `cafe_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cafes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `ftw` INTEGER UNSIGNED NOT NULL,
    `link_eng` VARCHAR(191) NULL,
    `link_heb` VARCHAR(191) NULL,
    `contact_phone` INTEGER UNSIGNED NULL,
    `contact_name` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Cafes_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cafe_user` (
    `user_id` INTEGER NOT NULL,
    `cafe_id` INTEGER NOT NULL,
    `step` INTEGER UNSIGNED NOT NULL DEFAULT 1,
    `visit_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`, `cafe_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_prize` (
    `prize_id` INTEGER NOT NULL,
    `used` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expires_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`prize_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prizes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cafe_id` INTEGER NOT NULL,
    `max_amount` INTEGER UNSIGNED NOT NULL,
    `discount` DOUBLE NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `type` ENUM('SCRATCH', 'SLOT', 'FREE') NOT NULL,
    `revenue` DOUBLE NOT NULL,
    `probability` DOUBLE NOT NULL,
    `step` INTEGER UNSIGNED NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `expires_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
