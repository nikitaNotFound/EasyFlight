create procedure AddAccountFlightInfo
    @flightId as int,
    @suitcaseOverloadCost as int,
    @handLuggageOverloadCost as int,
    @bookType as int,
    @bookTime as datetimeoffset(7),
    @accountId as int
as
    insert into FlightBooksInfo
    (
        FlightId,
        SuitcaseOverloadCost,
        HandLuggageOverloadCost,
        BookType,
        BookTime,
        AccountId
    )
    values
    (
        @flightId,
        @suitcaseOverloadCost,
        @handLuggageOverloadCost,
        @bookType,
        @bookTime,
        @accountId
    )

    select SCOPE_IDENTITY()