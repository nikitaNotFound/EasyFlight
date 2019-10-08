using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NLog;
using Microsoft.AspNetCore.Builder;

namespace WebAPI
{
    public static class ExceptionLoggerExtensions
    {
        public static IApplicationBuilder UseExceptionLogger(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionLoggerMiddleware>();
        }
    }

    public class ExceptionLoggerMiddleware
    {
        private readonly static Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly RequestDelegate _next;


        public ExceptionLoggerMiddleware(RequestDelegate next)
        {
            _next = next;
        }


        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.Error(ex.Message);
            }
        }
    }
}
