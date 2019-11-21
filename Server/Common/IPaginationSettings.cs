namespace Common
{
    public interface IPaginationSettings
    {
        int MaxPageLimit { get; }
        int DefaultPage { get; }
        int DefaultPageSize { get; }
    }
}