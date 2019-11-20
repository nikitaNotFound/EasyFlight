create table AccountUpdates
(
    AccountId            int            not null
        constraint AccountUpdates_pk
            primary key nonclustered
        constraint AccountUpdates_Accounts_Id_fk
            references Accounts,
    LastNameUpdateTime   datetimeoffset(7) not null,
    LastAvatarUpdateTime datetimeoffset(7) not null
)