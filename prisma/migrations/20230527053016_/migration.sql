/*
  Warnings:

  - You are about to drop the column `team` on the `task` table. All the data in the column will be lost.
  - Added the required column `teamId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `taskassigned` DROP FOREIGN KEY `TaskAssigned_taskId_fkey`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `team`,
    ADD COLUMN `teamId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
