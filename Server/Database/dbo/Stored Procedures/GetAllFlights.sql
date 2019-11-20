create procedure GetAllFlights
    @currentPage as int,
    @pageLimit as int
as
    select
        f.*,
        count(*) over () as TotalCount
    from Flights f
    order by Id
    offset (@currentPage - 1) * @pageLimit rows
    fetch next @pageLimit rows only

