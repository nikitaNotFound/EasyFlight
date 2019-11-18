using DataAccessLayer;
using Microsoft.Extensions.Configuration;

namespace WebAPI
{
    public class FilesUploadingSettings : IFilesUploadingSettings
    {
        private readonly IConfiguration _configuration;

        public string StoragePath => _configuration[nameof(StoragePath)];
        public string[] AllowedExtensions => _configuration.GetSection(nameof(AllowedExtensions)).Get<string[]>();


        public FilesUploadingSettings(IConfiguration configuration)
        {
            _configuration = configuration.GetSection(nameof(FilesUploadingSettings));
        }
    }
}