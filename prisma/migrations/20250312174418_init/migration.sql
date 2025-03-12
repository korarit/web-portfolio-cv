/*
  Warnings:

  - A unique constraint covering the columns `[otp_code]` on the table `otp` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `session_otp_id_fkey` ON `session`;

-- CreateIndex
CREATE UNIQUE INDEX `otp_otp_code_key` ON `otp`(`otp_code`);
