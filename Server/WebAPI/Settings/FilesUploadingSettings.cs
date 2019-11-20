using System;
using System.Collections.Generic;
using Common;
using DataAccessLayer;
using Microsoft.Extensions.Configuration;

namespace WebAPI.Settings
{
    public class FilesUploadingSettings : IFilesUploadingSettings
    {
        private readonly IConfiguration _configuration;

        public string StoragePath => _configuration[nameof(StoragePath)];
        public IReadOnlyCollection<string> AllowedExtensions =>
            new HashSet<string>(
                _configuration.GetSection(nameof(AllowedExtensions)).Get<string[]>(),
                StringComparer.OrdinalIgnoreCase
            );
        public int MaxMbSize => int.Parse(_configuration[nameof(MaxMbSize)]);
        public string StaticFilesCatalogName => _configuration[nameof(StaticFilesCatalogName)];
        public string StaticFilesHost => _configuration[nameof(StaticFilesHost)];


        public FilesUploadingSettings(IConfiguration configuration)
        {
            _configuration = configuration.GetSection(nameof(FilesUploadingSettings));
        }
    }
}