/*
  Warnings:

  - You are about to drop the `teamuser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `teamuser` DROP FOREIGN KEY `TeamUser_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `teamuser` DROP FOREIGN KEY `TeamUser_userId_fkey`;

-- DropTable
DROP TABLE `teamuser`;

-- CreateTable
CREATE TABLE `UserTeam` (
    `userId` VARCHAR(191) NOT NULL,
    `teamId` VARCHAR(191) NOT NULL,
    `permissions` ENUM('ADMIN', 'EDIT', 'VIEW') NULL DEFAULT 'VIEW',
    `inviteAccepted` ENUM('UNDECIDED', 'ACCEPTED', 'DENIED') NULL DEFAULT 'UNDECIDED',

    PRIMARY KEY (`teamId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserTeam` ADD CONSTRAINT `UserTeam_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTeam` ADD CONSTRAINT `UserTeam_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
