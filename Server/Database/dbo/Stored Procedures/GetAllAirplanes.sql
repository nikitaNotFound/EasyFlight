create procedure GetAllAirplanes
    @currentPage as int,
    @pageLimit as int
as
    select
        a.*,
        count(*) over () as TotalCount
    from Airplanes a
    order by Id
        offset (@currentPage - 1) * @pageLimit rows
    fetch next @pageLimit rows only

