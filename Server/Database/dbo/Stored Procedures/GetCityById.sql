﻿CREATE PROCEDURE GetCityById
@id AS INT
AS
	SELECT TOP 1 *
	FROM cities
	WHERE id=@id
