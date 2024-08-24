-- CreateTable
CREATE TABLE `paciente` (
    `id_paciente` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_paciente` VARCHAR(191) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `paciente_cpf_key`(`cpf`),
    PRIMARY KEY (`id_paciente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
