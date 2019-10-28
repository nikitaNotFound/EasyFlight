create procedure [dbo].[CheckAccountDuplicate]
    @email as nvarchar(50)
as
    select top 1 *
    from Accounts
    where Email = @email