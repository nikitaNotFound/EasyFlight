create procedure [dbo].[AddCountry]
    @name as nvarchar(60)
as
    insert into Countries (Name)
    values (@name)
    select SCOPE_IDENTITY();