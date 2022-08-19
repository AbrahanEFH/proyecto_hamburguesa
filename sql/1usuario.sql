-- Creamos la tabla usuarios
CREATE TABLE usuarios (
    id SERIAL,
    nombre VARCHAR(25),
    apellido VARCHAR(25),
    correo VARCHAR (35),
    PRIMARY KEY (id)
);

SELECT * FROM usuarios;