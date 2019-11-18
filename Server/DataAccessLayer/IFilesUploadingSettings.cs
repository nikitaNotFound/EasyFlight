using System.Collections.Generic;

namespace DataAccessLayer
{
    public interface IFilesUploadingSettings
    {
        string StoragePath { get; }
        IReadOnlyCollection<string> AllowedExtensions { get; }
        int MaxMbSize { get; }
    }
}