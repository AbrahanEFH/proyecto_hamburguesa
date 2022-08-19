-- Creamos la tabla hamburguesa
CREATE TABLE hamburguesa(
    id SERIAL,
    nombre_hamburguesa VARCHAR(25),
    tipo VARCHAR(25),
    precio VARCHAR(8),
    puntuacion VARCHAR(5),
    descripcion VARCHAR(25),
    FOREING KEY (id) REFERENCES usuarios (id)
    PRIMARY KEY (nombre_hamburguesa)
);

SELECT * FROM hamburguesa;