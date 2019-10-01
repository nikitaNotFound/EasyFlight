using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Text;

namespace EasyFlight.Errors
{
    public class ErrorsHandlerMiddleware
    {
        RequestDelegate next;
        ErrorsHandler errorsHandler;
        public ErrorsHandlerMiddleware(RequestDelegate next, ErrorsHandler errorsHandler)
        {
            this.next = next;
            this.errorsHandler = errorsHandler;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            await next(context);

            if (errorsHandler.HasError)
            {
                context.Response.StatusCode = (int)errorsHandler.StatusCode;

                if (errorsHandler.ErrorInfo != null)
                {
                    string jsonBody = JsonConvert.SerializeObject(new { message = errorsHandler.ErrorInfo });
                    byte[] byteArray = Encoding.UTF8.GetBytes(jsonBody);

                    context.Response.ContentType = "application/json";
                    await context.Response.Body.WriteAsync(byteArray);
                }

                errorsHandler.UnregisterError();
            }
        }
    }
}