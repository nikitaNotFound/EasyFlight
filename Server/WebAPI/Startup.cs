using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using DataAccessLayer;
using BusinessLayer;
using AutoMapper;
using Serilog;
using WebAPI.Services;
using System.Text;
using Common;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.FileProviders;
using WebAPI.Settings;

namespace WebAPI
{
    public class Startup
    {
        public IConfiguration Configuration { get; }


        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IDalSettings, DalSettings>();
            services.AddSingleton<IBookingSettings, BookingSettings>();
            services.AddTransient<IUserInfo, UserInfo>();
            services.AddSingleton<IAccountUpdatingSettings, AccountUpdatingSettings>();
            services.AddSingleton<IProfileCachingSettings, ProfileCachingSettings>();

            FrontendFilesSettings frontendFilesSettings = new FrontendFilesSettings(Configuration);
            services.AddSingleton<IFrontendFilesSettings>(frontendFilesSettings);

            FilesUploadingSettings filesUploadingSettings = new FilesUploadingSettings(Configuration);
            services.AddSingleton<IFilesUploadingSettings, FilesUploadingSettings>();
            services.AddSingleton<IPaginationSettings, PaginationSettings>();

            CorsSettings corsSettings = new CorsSettings(Configuration);

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder =>
                    {
                        builder.WithOrigins(corsSettings.AllowedOrigins)
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            MapperConfiguration mappingConfig = new MapperConfiguration(config =>
            {
                WebAPIMapping.Initialize(config);
                BlMapping.Initialize(config);
                DalMapping.Initialize(config);
            });
            mappingConfig.CompileMappings();

            services.AddSingleton<IMapper>(mappingConfig.CreateMapper());

            services.AddControllers();

            DalModule.Register(services);
            BlModule.Register(services);
            WebAPIModule.Register(services);

            Serilog.ILogger logger = new LoggerConfiguration()
               .ReadFrom.Configuration(Configuration)
               .CreateLogger();

            services.AddLogging((builder) =>
            {
                builder.AddSerilog(logger, dispose: true);
            });

            JwtSettings jwtSettings = new JwtSettings(Configuration);

            services.AddSingleton<IJwtSettings>(jwtSettings);

            byte[] key = Encoding.UTF8.GetBytes(jwtSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = false;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = jwtSettings.Issuer,
                    ValidateAudience = true,
                    ValidAudiences = corsSettings.AllowedOrigins
                };
            });

            services.AddHttpContextAccessor();

            services.Configure<FormOptions>(options =>
            {
                // converting to bytes
                options.MultipartBodyLengthLimit = filesUploadingSettings.MaxMbSize * 1024 * 1024;
            });

            services.AddMemoryCache();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = Path.Combine(frontendFilesSettings.StoragePath);
            });
        }

        public void Configure(
            IApplicationBuilder app,
            IFilesUploadingSettings filesUploadingSettings,
            IFrontendFilesSettings frontendFilesSettings
        )
        {
            app.UseExceptionLogger();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(filesUploadingSettings.StoragePath)),
                RequestPath = "/" + filesUploadingSettings.StaticFilesCatalogName
            });

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(frontendFilesSettings.StoragePath)),
                RequestPath = ""
            });

            app.UseRouting();
            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseHttpsRedirection();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = Path.Combine(frontendFilesSettings.StoragePath);
            });
        }
    }
}