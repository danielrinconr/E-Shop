
SET client_encoding TO 'UTF8';	
SET search_path = 'shop'; 	

CREATE OR REPLACE PROCEDURE Shop.SP_999_INSERT(
	p_id_usuario	NUMERIC,
	p_id_tabla		NUMERIC,
	p_opcion		TEXT,
	p_codigoerror	TEXT,
	p_descripcion	TEXT) AS $body$
DECLARE
	log_errores_row Shop.log_errores%ROWTYPE;
BEGIN
	--Asignacion a record
	log_errores_row.id_error	:=  nextval('shop.log_errores_id_error_seq');
	log_errores_row.fechayhora	:=	localtimestamp;
	log_errores_row.id_usuario	:=	p_id_usuario;
	log_errores_row.id_tabla	:=	p_id_tabla;
	log_errores_row.opcion 		:=  p_opcion;
	log_errores_row.codigoerror	:=	p_codigoerror;
	log_errores_row.descripcion	:=  p_descripcion;

	--Insercion en la tabla
	INSERT INTO Shop.log_errores VALUES (log_errores_row.*);
END
$body$
LANGUAGE PLPGSQL
SECURITY DEFINER;

--
CREATE OR REPLACE FUNCTION Shop.SP_209_INSERT(
	p_nit 			NUMERIC, 		
	p_nombre		TEXT,
	p_logo			TEXT,
	p_direccion		TEXT,
	p_pagina_web	TEXT,
	p_faceboock		TEXT,
	p_instagram		TEXT,
	p_twitter		TEXT,
	p_codigo_color1	TEXT,
	p_codigo_color2	TEXT,
	p_id_ciudad		NUMERIC,
	p_id_usuario    NUMERIC,
	empresas_row OUT shop.empresas,
	Resultado OUT NUMERIC)
AS $body$
DECLARE	
	text_var1 text;
	text_err text;
BEGIN
	--Asignacion a record
	empresas_row.id_empresa		:= nextval('shop.empresas_id_empresa_seq');
	empresas_row.nit			:= p_nit;
	empresas_row.nombre			:= p_nombre;
	empresas_row.logo			:= p_logo;
	empresas_row.direccion		:= p_direccion;
	empresas_row.pagina_web		:= p_pagina_web;
	empresas_row.faceboock		:= p_faceboock;
	empresas_row.instagram		:= p_instagram;
	empresas_row.twitter		:= p_twitter;
	empresas_row.codigo_color1	:= p_codigo_color1;
	empresas_row.codigo_color2	:= p_codigo_color2;
	empresas_row.id_ciudad		:= p_id_ciudad;
	empresas_row.estado			:= 'A';
	empresas_row.activo			:= TRUE;

	--Insercion en la tabla
	INSERT INTO Shop.empresas VALUES (empresas_row.*);
	Resultado := 1;
EXCEPTION
WHEN OTHERS THEN
	Resultado := 0;
	GET STACKED diagnostics text_var1 = RETURNED_SQLSTATE;
	text_err := text_var1;
	GET STACKED diagnostics text_var1 = MESSAGE_TEXT;
	text_err := text_err || ' - ' || text_var1;
	GET STACKED diagnostics text_var1 = PG_EXCEPTION_CONTEXT;
	text_err := text_err || ' - ' || substr(text_var1,1,position('(' in text_var1)-1);
	CALL Shop.SP_999_INSERT(p_id_usuario, 209, 'I', SQLSTATE, text_err);
END;
$body$
LANGUAGE PLPGSQL
SECURITY DEFINER;

--
CREATE OR REPLACE FUNCTION shop.SP_201_INSERT(
	p_nombre		TEXT,
	p_mensaje		TEXT,
	p_id_menu_papa	NUMERIC,
	p_id_usuario    NUMERIC,
	menus_row 		OUT shop.menus,
	Resultado 		OUT NUMERIC)
AS $body$
DECLARE	
	text_var1 text;
	text_err text;
BEGIN
	--Asignacion a record
	menus_row.id_menu		:= nextval('shop.menus_id_menu_seq');
	menus_row.nombre        := p_nombre;
	menus_row.mensaje       := p_mensaje;
    if p_id_menu_papa is null then
        menus_row.id_menu_papa  := menus_row.id_menu;
    else
        menus_row.id_menu_papa  := p_id_menu_papa;
    end if;
	menus_row.activo        := TRUE;
	--Insercion en la tabla
	INSERT INTO shop.menus VALUES (menus_row.*);
	Resultado := 1;
EXCEPTION
WHEN OTHERS THEN
	Resultado := 0;
	GET STACKED diagnostics text_var1 = RETURNED_SQLSTATE;
	text_err := text_var1;
	GET STACKED diagnostics text_var1 = MESSAGE_TEXT;
	text_err := text_err || ' - ' || text_var1;
	GET STACKED diagnostics text_var1 = PG_EXCEPTION_CONTEXT;
	text_err := text_err || ' - ' || substr(text_var1,1,position('(' in text_var1)-1);
	CALL Shop.SP_999_INSERT(p_id_usuario, 209, 'I', SQLSTATE, text_err);
END;
$body$
LANGUAGE PLPGSQL
SECURITY DEFINER;

--
CREATE OR REPLACE FUNCTION shop.SP_202_INSERT(
	p_nombre  		TEXT,
	p_id_usuario 	NUMERIC,
	roles_row 		OUT shop.roles,
	Resultado 		OUT NUMERIC)
AS $body$
DECLARE	
	text_var1 text;
	text_err text;
BEGIN
	--Asignacion a record
	roles_row.id_rol 	:= nextval('shop.roles_id_rol_seq');
	roles_row.nombre	:= p_nombre;
	roles_row.activo  	:= TRUE;
	--Insercion en la tabla
	INSERT INTO shop.roles VALUES (roles_row.*);
	Resultado := 1;
EXCEPTION
WHEN OTHERS THEN
	Resultado := 0;
	GET STACKED diagnostics text_var1 = RETURNED_SQLSTATE;
	text_err := text_var1;
	GET STACKED diagnostics text_var1 = MESSAGE_TEXT;
	text_err := text_err || ' - ' || text_var1;
	GET STACKED diagnostics text_var1 = PG_EXCEPTION_CONTEXT;
	text_err := text_err || ' - ' || substr(text_var1,1,position('(' in text_var1)-1);
	CALL Shop.SP_999_INSERT(p_id_usuario, 209, 'I', SQLSTATE, text_err);
END;
$body$
LANGUAGE PLPGSQL
SECURITY DEFINER;

--
CREATE OR REPLACE FUNCTION shop.SP_203_INSERT(
	p_id_rol  		NUMERIC,
	p_id_menu 		NUMERIC,
	p_id_usuario 	NUMERIC,
	permisos_row 	OUT shop.permisos,
	Resultado 		OUT NUMERIC)
AS $body$
DECLARE	
	text_var1 text;
	text_err text;
BEGIN
	--Asignacion a record
	permisos_row.id_rol 	:= p_id_rol;
	permisos_row.id_menu	:= p_id_menu;
	permisos_row.estado_rol	:= TRUE;
	permisos_row.activo  	:= TRUE;
	--Insercion en la tabla
	INSERT INTO shop.permisos VALUES (permisos_row.*);
	Resultado := 1;
EXCEPTION
WHEN OTHERS THEN
	Resultado := 0;
	GET STACKED diagnostics text_var1 = RETURNED_SQLSTATE;
	text_err := text_var1;
	GET STACKED diagnostics text_var1 = MESSAGE_TEXT;
	text_err := text_err || ' - ' || text_var1;
	GET STACKED diagnostics text_var1 = PG_EXCEPTION_CONTEXT;
	text_err := text_err || ' - ' || substr(text_var1,1,position('(' in text_var1)-1);
	CALL Shop.SP_999_INSERT(p_id_usuario, 209, 'I', SQLSTATE, text_err);
END;
$body$
LANGUAGE PLPGSQL
SECURITY DEFINER;

--
CREATE OR REPLACE FUNCTION SP_211_INSERT(
	p_Cedula				NUMERIC,
	p_nombres				TEXT,
	p_apellidos				TEXT,
	p_genero				TEXT,
	p_telefono_celular		NUMERIC,
	p_correo_electronico	TEXT,
	p_nombre_usuario		TEXT,
	p_clave					TEXT,
	p_id_rol				NUMERIC,
	p_id_usuario 			NUMERIC,
	usuarios_row 			OUT shop.usuarios,
	Resultado 				OUT NUMERIC)
AS $body$
DECLARE	
	text_var1 text;
	text_err text;	
BEGIN
	--Asignacion a record
	usuarios_row.id_usuario			:= nextval('shop.usuarios_id_usuario_seq');
	usuarios_row.Cedula             := p_Cedula;
	usuarios_row.nombres            := p_nombres;
	usuarios_row.apellidos          := p_apellidos;
	usuarios_row.genero             := p_genero;
	usuarios_row.telefono_celular   := p_telefono_celular;
	usuarios_row.correo_electronico := p_correo_electronico;
	usuarios_row.nombre_usuario     := p_nombre_usuario;
	usuarios_row.clave              := p_clave;
	usuarios_row.estado             := 'A';
	usuarios_row.id_rol             := p_id_rol;
	usuarios_row.activo             := TRUE;

	--Insercion en la tabla
	INSERT INTO shop.usuarios VALUES (usuarios_row.*);
	Resultado := 1;
EXCEPTION
WHEN OTHERS THEN
	Resultado := 0;
	GET STACKED diagnostics text_var1 = RETURNED_SQLSTATE;
	text_err := text_var1;
	GET STACKED diagnostics text_var1 = MESSAGE_TEXT;
	text_err := text_err || ' - ' || text_var1;
	GET STACKED diagnostics text_var1 = PG_EXCEPTION_CONTEXT;
	text_err := text_err || ' - ' || substr(text_var1,1,position('(' in text_var1)-1);
	CALL Shop.SP_999_INSERT(p_id_usuario, 209, 'I', SQLSTATE, text_err);
END;
$body$
LANGUAGE PLPGSQL
SECURITY DEFINER;


