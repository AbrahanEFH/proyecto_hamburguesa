-- Creamos la tabla usuarios
--  incorporamos el auth
CREATE TABLE usuarios (
    id SERIAL,
    email varchar(50),
    nombre varchar(50),
    password varchar(50),
    auth BOOLEAN,
    PRIMARY KEY (id)
);

SELECT * FROM usuarios;

