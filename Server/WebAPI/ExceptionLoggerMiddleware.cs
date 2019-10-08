using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Serilog;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;

namespace WebAPI
{
    public static class ExceptionLoggerExtensions
    {
        public static IApplicationBuilder UseExceptionLogger(this IApplicationBuilder builder, IConfiguration config)
        {
            return builder.UseMiddleware<ExceptionLoggerMiddleware>(config);
        }
    }

    public class ExceptionLoggerMiddleware
    {
        private readonly IConfiguration _configuration;
        private readonly RequestDelegate _next;


        public ExceptionLoggerMiddleware(RequestDelegate next, IConfiguration config)
        {
            _next = next;
            _configuration = config;
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(_configuration)
                .CreateLogger();
        }


        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
        }
    }
}
