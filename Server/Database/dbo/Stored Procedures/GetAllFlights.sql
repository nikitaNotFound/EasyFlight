create procedure GetAllFlights
    @currentPage as int,
    @pageLimit as int
as
    select *
    from (
        select row_number() over (order by f.Id) as row, f.*
        from Flights f
    ) t1
    where t1.row between (@currentPage - 1) * @pageLimit + 1 and (@currentPage - 1) * @pageLimit + @pageLimit

    select @@rowcount

