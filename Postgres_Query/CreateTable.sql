CREATE TABLE Usuario
(
	id_usuario	NUMERIC(10)	NOT NULL	PRIMARY KEY		,
	Cedula	NUMERIC(10)	NOT NULL		UNIQUE	,
	nombres	CHARACTER VARYING(50)	NOT NULL			,
	apellidos	CHARACTER VARYING(50)	NOT NULL			,
	genero	CHARACTER VARYING(1)	NOT NULL			,
	telefono_celular	NUMERIC(10)	NOT NULL			,
	correo_electronico	CHARACTER VARYING(80)	NOT NULL		UNIQUE	,
	nombre_usuario	CHARACTER VARYING(50)	NOT NULL		UNIQUE	,
	clave	CHARACTER VARYING(200)	NOT NULL			,
	estado	CHAR(1)	NOT NULL			,
	id_rol	NUMERIC(10)	NOT NULL			,
	id_empresa	NUMERIC(10)	NOT NULL			,
	fecha_creacion	DATE	NOT NULL			,
	activo	CHAR(1)	NOT NULL			
)