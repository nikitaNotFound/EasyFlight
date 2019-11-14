create table AccountUpdates
(
    AccountId int not null,
    LastNameUpdateTime datetimeoffset(7) not null,
    LastAvatarUpdateTime datetimeoffset(7) not null
)