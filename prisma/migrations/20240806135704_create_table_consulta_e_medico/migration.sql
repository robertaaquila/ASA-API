-- CreateTable
CREATE TABLE `medico` (
    `id_medico` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_medico` VARCHAR(191) NOT NULL,
    `matricula` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `medico_matricula_key`(`matricula`),
    PRIMARY KEY (`id_medico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consulta` (
    `id_consulta` INTEGER NOT NULL AUTO_INCREMENT,
    `data_consulta` DATETIME(3) NOT NULL,
    `tipo_consulta` VARCHAR(191) NOT NULL,
    `checkin` VARCHAR(191) NOT NULL,
    `criado_em` DATETIME(3) NOT NULL,
    `atualizado_em` DATETIME(3) NOT NULL,
    `medico_id` INTEGER NOT NULL,
    `paciente_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_consulta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Consulta` ADD CONSTRAINT `Consulta_medico_id_fkey` FOREIGN KEY (`medico_id`) REFERENCES `medico`(`id_medico`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consulta` ADD CONSTRAINT `Consulta_paciente_id_fkey` FOREIGN KEY (`paciente_id`) REFERENCES `paciente`(`id_paciente`) ON DELETE RESTRICT ON UPDATE CASCADE;
