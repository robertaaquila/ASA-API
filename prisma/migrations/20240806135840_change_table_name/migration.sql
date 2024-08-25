-- DropForeignKey
ALTER TABLE `consulta` DROP FOREIGN KEY `Consulta_medico_id_fkey`;

-- DropForeignKey
ALTER TABLE `consulta` DROP FOREIGN KEY `Consulta_paciente_id_fkey`;

-- AddForeignKey
ALTER TABLE `consulta` ADD CONSTRAINT `consulta_medico_id_fkey` FOREIGN KEY (`medico_id`) REFERENCES `medico`(`id_medico`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consulta` ADD CONSTRAINT `consulta_paciente_id_fkey` FOREIGN KEY (`paciente_id`) REFERENCES `paciente`(`id_paciente`) ON DELETE RESTRICT ON UPDATE CASCADE;
