/*
  Warnings:

  - Made the column `created_at` on table `blog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `img_banner` on table `project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `blog` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `project` ADD COLUMN `github_link` VARCHAR(191) NULL,
    ADD COLUMN `preview_link` VARCHAR(191) NULL,
    MODIFY `img_banner` VARCHAR(191) NOT NULL,
    MODIFY `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
