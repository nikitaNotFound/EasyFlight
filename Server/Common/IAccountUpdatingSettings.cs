using System;

namespace Common
{
    public interface IAccountUpdatingSettings
    {
        TimeSpan NameUpdatingInterval { get; }
        TimeSpan AvatarUpdatingInterval { get; }
    }
}