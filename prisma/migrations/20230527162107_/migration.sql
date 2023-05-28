/*
  Warnings:

  - You are about to alter the column `permissions` on the `teamuser` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `inviteAccepted` on the `teamuser` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `teamuser` MODIFY `permissions` ENUM('ADMIN', 'EDIT', 'VIEW') NOT NULL,
    MODIFY `inviteAccepted` ENUM('UNDECIDED', 'ACCEPTED', 'DENIED') NOT NULL;
