-- CreateTable
CREATE TABLE `Encargado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_completo` VARCHAR(191) NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` ENUM('Presidente', 'Vicepresidente', 'Admin') NOT NULL,
    `estado_cuenta` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Encargado_usuario_key`(`usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estudiante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ci` VARCHAR(191) NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `fecha_nacimiento` DATETIME(3) NULL,
    `cuidad` VARCHAR(191) NOT NULL,
    `direcion` VARCHAR(191) NOT NULL,
    `celular` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `facultad` VARCHAR(191) NOT NULL,
    `carrera` VARCHAR(191) NOT NULL,
    `nombre_soce` VARCHAR(191) NOT NULL,
    `semestre` VARCHAR(191) NOT NULL,
    `matricula_univ` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `estado_inscripcion` ENUM('Pendiente', 'Activo', 'Observado', 'Inactivo') NOT NULL DEFAULT 'Pendiente',
    `fecha_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Estudiante_ci_key`(`ci`),
    UNIQUE INDEX `Estudiante_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Documento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_estudiante` INTEGER NOT NULL,
    `foto_ci` VARCHAR(191) NOT NULL,
    `matricula` VARCHAR(191) NOT NULL,
    `registro_materia` VARCHAR(191) NOT NULL,
    `verfiicado` BOOLEAN NOT NULL DEFAULT false,
    `recibido_fisico` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Membresia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_estudiante` INTEGER NOT NULL,
    `gestion` VARCHAR(191) NOT NULL,
    `tipo_miembto` ENUM('Nuevo', 'Antiguo') NOT NULL,
    `pagado` BOOLEAN NOT NULL DEFAULT false,
    `monto` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `id_encargado` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `tipo` ENUM('Curso', 'Taller', 'Charla', 'Asamblea') NOT NULL,
    `fecha` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asistencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_estudiante` INTEGER NOT NULL,
    `id_evento` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
