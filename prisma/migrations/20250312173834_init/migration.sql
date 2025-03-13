/*
  Warnings:

  - A unique constraint covering the columns `[session_id]` on the table `otp` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[otp_id]` on the table `session` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `session_otp_id_fkey`;

-- AlterTable
ALTER TABLE `otp` ADD COLUMN `session_id` INTEGER NULL,
    ADD COLUMN `used` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `session` MODIFY `otp_id` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `otp_session_id_key` ON `otp`(`session_id`);

-- CreateIndex
CREATE UNIQUE INDEX `session_otp_id_key` ON `session`(`otp_id`);

-- AddForeignKey
ALTER TABLE `otp` ADD CONSTRAINT `otp_session_id_fkey` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
