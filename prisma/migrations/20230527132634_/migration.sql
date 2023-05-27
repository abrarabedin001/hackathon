-- AddForeignKey
ALTER TABLE `TaskAssigned` ADD CONSTRAINT `TaskAssigned_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
