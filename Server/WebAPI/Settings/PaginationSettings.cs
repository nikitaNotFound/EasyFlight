using Microsoft.Extensions.Configuration;

namespace WebAPI.Settings
{
    public class PaginationSettings : IPaginationSettings
    {
        private readonly IConfiguration _configuration;

        public int MaxPageLimit => int.Parse(_configuration[nameof(MaxPageLimit)]);
        public int DefaultPage => int.Parse(_configuration[nameof(DefaultPage)]);


        public PaginationSettings(IConfiguration configuration)
        {
            _configuration = configuration.GetSection(nameof(PaginationSettings));
        }
    }
}