using System;

namespace DataAccessLayer
{
    public interface IAccountUpdatingSettings
    {
        TimeSpan NameUpdatingInterval { get; }
        TimeSpan AvatarUpdatingInterval { get; }
    }
}