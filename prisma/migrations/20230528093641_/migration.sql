-- DropForeignKey
ALTER TABLE `team` DROP FOREIGN KEY `Team_creatorId_fkey`;

-- DropForeignKey
ALTER TABLE `userteam` DROP FOREIGN KEY `UserTeam_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `userteam` DROP FOREIGN KEY `UserTeam_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTeam` ADD CONSTRAINT `UserTeam_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTeam` ADD CONSTRAINT `UserTeam_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
