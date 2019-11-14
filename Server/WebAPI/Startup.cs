using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using DataAccessLayer;
using BusinessLayer;
using AutoMapper;
using Serilog;
using Microsoft.Extensions.Logging;
using WebAPI.Services;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;

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

            CorsSettings settings = new CorsSettings(Configuration);

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder =>
                    {
                        builder.WithOrigins(settings.AllowedOrigins)
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            MapperConfiguration mappingConfig = new MapperConfiguration(config =>
            {
                WebAPIMapping.Initialize(config);
                BlMapping.Initialize(config);
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
                    ValidAudiences = settings.AllowedOrigins
                };
            });

            services.AddHttpContextAccessor();
        }

        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            app.UseExceptionLogger();

            app.UseRouting();
            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseHttpsRedirection();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}