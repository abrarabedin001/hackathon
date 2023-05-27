-- DropForeignKey
ALTER TABLE `taskassigned` DROP FOREIGN KEY `TaskAssigned_userId_fkey`;

-- AlterTable
ALTER TABLE `taskassigned` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `TaskAssigned` ADD CONSTRAINT `TaskAssigned_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
