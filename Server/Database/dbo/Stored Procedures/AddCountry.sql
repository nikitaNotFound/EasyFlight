﻿CREATE PROCEDURE AddCountry
@name AS NVARCHAR(50)
AS
	INSERT INTO countries (name)
	VALUES (@name)