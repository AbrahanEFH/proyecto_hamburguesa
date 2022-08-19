-- Creamos la tabla hamburguesa
CREATE TABLE hamburguesa(
    id SERIAL,
    nombre_hamburguesa VARCHAR(25),
    tipo VARCHAR(25),
    precio VARCHAR(8),
    puntuacion VARCHAR(5),
    descripcion VARCHAR(25),
    PRIMARY KEY (nombre_hamburguesa),
    FOREIGN KEY (id) REFERENCES usuarios (id)
);

SELECT * FROM hamburguesa;