using Microsoft.Extensions.Configuration;

namespace WebAPI.Settings
{
    public class FrontendFilesSettings : IFrontendFilesSettings
    {
        private readonly IConfiguration _configuration;

        public string StoragePath => _configuration[nameof(StoragePath)];


        public FrontendFilesSettings(IConfiguration configuration)
        {
            _configuration = configuration.GetSection(nameof(FrontendFilesSettings));
        }
    }
}