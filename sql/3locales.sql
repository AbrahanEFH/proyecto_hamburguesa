-- Creamos la tabla locales
CREATE TABLE locales(
    nombre_establecimiento VARCHAR(25),
    hamburguesa VARCHAR(25),
    nota VARCHAR(5),
    direccion VARCHAR(25),
    FOREIGN KEY (hamburguesa) REFERENCES hamburguesa (nombre_hamburguesa)
);

SELECT * FROM locales;