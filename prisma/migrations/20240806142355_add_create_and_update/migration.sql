/*
  Warnings:

  - Added the required column `atualizado_em` to the `medico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atualizado_em` to the `paciente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `consulta` MODIFY `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `medico` ADD COLUMN `atualizado_em` DATETIME(3) NOT NULL,
    ADD COLUMN `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `paciente` ADD COLUMN `atualizado_em` DATETIME(3) NOT NULL,
    ADD COLUMN `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
