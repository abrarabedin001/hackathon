-- DropForeignKey
ALTER TABLE `teamuser` DROP FOREIGN KEY `TeamUser_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `teamuser` DROP FOREIGN KEY `TeamUser_userId_fkey`;

-- AddForeignKey
ALTER TABLE `TeamUser` ADD CONSTRAINT `TeamUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamUser` ADD CONSTRAINT `TeamUser_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
