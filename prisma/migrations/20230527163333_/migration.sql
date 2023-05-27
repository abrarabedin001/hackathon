/*
  Warnings:

  - Added the required column `teamId` to the `TeamUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `teamuser` ADD COLUMN `teamId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `TeamUser` ADD CONSTRAINT `TeamUser_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
