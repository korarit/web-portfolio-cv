/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `thrid_party_login` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_login` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `thrid_party_login` DROP FOREIGN KEY `thrid_party_login_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_login` DROP FOREIGN KEY `user_login_user_id_fkey`;

-- AlterTable
ALTER TABLE `blog` ADD COLUMN `sort_id` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `sort_id` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `project_topic` ADD COLUMN `sort_id` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `skill` ADD COLUMN `sort_id` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `skill_topic` ADD COLUMN `sort_id` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `thrid_party_login`;

-- DropTable
DROP TABLE `user_login`;

-- CreateTable
CREATE TABLE `otp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `otp` VARCHAR(191) NOT NULL,
    `otp_code` VARCHAR(191) NOT NULL,
    `expired_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `otp_id` INTEGER NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `login_ip` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_otp_id_fkey` FOREIGN KEY (`otp_id`) REFERENCES `otp`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
