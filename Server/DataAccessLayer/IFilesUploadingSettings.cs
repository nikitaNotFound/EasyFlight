namespace DataAccessLayer
{
    public interface IFilesUploadingSettings
    {
        string StoragePath { get; }
        string[] AllowedExtensions { get; }
    }
}