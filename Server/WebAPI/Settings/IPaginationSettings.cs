namespace WebAPI.Settings
{
    public interface IPaginationSettings
    {
        int MaxPageLimit { get; }
        int DefaultPage { get; }
    }
}