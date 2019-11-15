create procedure GetBookStatus
    @bookId as int
as
    select BookType
    from FlightBooksInfo
    where Id = @bookId