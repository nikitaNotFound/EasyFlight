create procedure GetAllAirplanes
    @currentPage as int,
    @pageLimit as int
as
    select *
    from (
        select row_number() over (order by a.Id) as row, a.*
        from Airplanes a
    ) t1
    where t1.row between (@currentPage - 1) * @pageLimit + 1 and (@currentPage - 1) * @pageLimit + @pageLimit

    select @@rowcount

