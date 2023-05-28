/*
  Warnings:

  - You are about to drop the column `inviteAccepted` on the `userteam` table. All the data in the column will be lost.
  - You are about to drop the column `permissions` on the `userteam` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `userteam` DROP COLUMN `inviteAccepted`,
    DROP COLUMN `permissions`;
