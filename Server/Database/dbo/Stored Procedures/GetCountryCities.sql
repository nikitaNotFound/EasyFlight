CREATE PROCEDURE GetCountryCities
@id as INT
AS
	SELECT *
	FROM cities
	WHERE countryId=@id;
