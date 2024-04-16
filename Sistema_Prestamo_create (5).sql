-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-04-16 18:50:47.286

-- tables
-- Table: Administrador
CREATE TABLE Administrador (
    ca int  NOT NULL,
    password varchar(250)  NOT NULL,
    nombre varchar(20)  NOT NULL,
    apellido varchar(20)  NOT NULL,
    carnet int  NOT NULL,
    rol varchar(250)  NOT NULL,
    CONSTRAINT Administrador_pk PRIMARY KEY (ca)
);

-- Table: Equipo
CREATE TABLE Equipo (
    ce int  NOT NULL,
    nombre varchar(20)  NOT NULL,
    tipo varchar(20)  NOT NULL,
    CONSTRAINT Equipo_pk PRIMARY KEY (ce)
);

-- Table: Info_Equipo
CREATE TABLE Info_Equipo (
    cie int  NOT NULL,
    estado varchar(20)  NOT NULL,
    descripcion varchar(20)  NOT NULL,
    Equipo_ce int  NOT NULL,
    CONSTRAINT Info_Equipo_pk PRIMARY KEY (cie)
);

-- Table: Inventario
CREATE TABLE Inventario (
    id_inventario int  NOT NULL,
    cantidad int  NOT NULL,
    Equipo_ce int  NOT NULL,
    CONSTRAINT Inventario_pk PRIMARY KEY (id_inventario)
);

-- Table: Mantenimiento
CREATE TABLE Mantenimiento (
    id_matenimiento int  NOT NULL,
    fecha_mantenimiento date  NOT NULL,
    descripcion varchar(250)  NOT NULL,
    Equipo_ce int  NOT NULL,
    CONSTRAINT Mantenimiento_pk PRIMARY KEY (id_matenimiento)
);

-- Table: extension_prestamo
CREATE TABLE extension_prestamo (
    id_extensio int  NOT NULL,
    nueva_fecha_decolucion date  NOT NULL,
    motivo_extension varchar(250)  NOT NULL,
    prestamo_id_prestamo int  NOT NULL,
    estado int  NOT NULL,
    Administrador_ca int  NOT NULL,
    CONSTRAINT extension_prestamo_pk PRIMARY KEY (id_extensio)
);

-- Table: historial_prestamo
CREATE TABLE historial_prestamo (
    id_historial int  NOT NULL,
    fecha_prestamo int  NOT NULL,
    comentarios int  NOT NULL,
    prestamo_id_prestamo int  NOT NULL,
    Info_Equipo_cie int  NOT NULL,
    prestatario_cp int  NOT NULL,
    CONSTRAINT historial_prestamo_pk PRIMARY KEY (id_historial)
);

-- Table: incidencia
CREATE TABLE incidencia (
    id_incidencia int  NOT NULL,
    fecha_incidencia date  NOT NULL,
    descripcion varchar(250)  NOT NULL,
    Equipo_ce int  NOT NULL,
    CONSTRAINT incidencia_pk PRIMARY KEY (id_incidencia)
);

-- Table: prestamo
CREATE TABLE prestamo (
    id_prestamo int  NOT NULL,
    fecha_prestamo date  NOT NULL,
    hora_prestamo time  NOT NULL,
    Equipo_ce int  NOT NULL,
    prestatario_cp int  NOT NULL,
    Administrador_ca int  NOT NULL,
    CONSTRAINT prestamo_pk PRIMARY KEY (id_prestamo)
);

-- Table: prestatario
CREATE TABLE prestatario (
    cp int  NOT NULL,
    nombre varchar(20)  NOT NULL,
    apellido varchar(20)  NOT NULL,
    carnet int  NOT NULL,
    carrera varchar(20)  NOT NULL,
    CONSTRAINT prestatario_pk PRIMARY KEY (cp)
);

-- foreign keys
-- Reference: Info_Equipo_Equipo (table: Info_Equipo)
ALTER TABLE Info_Equipo ADD CONSTRAINT Info_Equipo_Equipo
    FOREIGN KEY (Equipo_ce)
    REFERENCES Equipo (ce)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Inventario_Equipo (table: Inventario)
ALTER TABLE Inventario ADD CONSTRAINT Inventario_Equipo
    FOREIGN KEY (Equipo_ce)
    REFERENCES Equipo (ce)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Mantenimiento_Equipo (table: Mantenimiento)
ALTER TABLE Mantenimiento ADD CONSTRAINT Mantenimiento_Equipo
    FOREIGN KEY (Equipo_ce)
    REFERENCES Equipo (ce)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: extension_prestamo_Administrador (table: extension_prestamo)
ALTER TABLE extension_prestamo ADD CONSTRAINT extension_prestamo_Administrador
    FOREIGN KEY (Administrador_ca)
    REFERENCES Administrador (ca)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: extension_prestamo_prestamo (table: extension_prestamo)
ALTER TABLE extension_prestamo ADD CONSTRAINT extension_prestamo_prestamo
    FOREIGN KEY (prestamo_id_prestamo)
    REFERENCES prestamo (id_prestamo)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: historial_prestamo_Info_Equipo (table: historial_prestamo)
ALTER TABLE historial_prestamo ADD CONSTRAINT historial_prestamo_Info_Equipo
    FOREIGN KEY (Info_Equipo_cie)
    REFERENCES Info_Equipo (cie)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: historial_prestamo_prestamo (table: historial_prestamo)
ALTER TABLE historial_prestamo ADD CONSTRAINT historial_prestamo_prestamo
    FOREIGN KEY (prestamo_id_prestamo)
    REFERENCES prestamo (id_prestamo)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: historial_prestamo_prestatario (table: historial_prestamo)
ALTER TABLE historial_prestamo ADD CONSTRAINT historial_prestamo_prestatario
    FOREIGN KEY (prestatario_cp)
    REFERENCES prestatario (cp)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: incidencia_Equipo (table: incidencia)
ALTER TABLE incidencia ADD CONSTRAINT incidencia_Equipo
    FOREIGN KEY (Equipo_ce)
    REFERENCES Equipo (ce)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: prestamo_Administrador (table: prestamo)
ALTER TABLE prestamo ADD CONSTRAINT prestamo_Administrador
    FOREIGN KEY (Administrador_ca)
    REFERENCES Administrador (ca)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: prestamo_prestatario (table: prestamo)
ALTER TABLE prestamo ADD CONSTRAINT prestamo_prestatario
    FOREIGN KEY (prestatario_cp)
    REFERENCES prestatario (cp)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: reserva_Equipo (table: prestamo)
ALTER TABLE prestamo ADD CONSTRAINT reserva_Equipo
    FOREIGN KEY (Equipo_ce)
    REFERENCES Equipo (ce)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

