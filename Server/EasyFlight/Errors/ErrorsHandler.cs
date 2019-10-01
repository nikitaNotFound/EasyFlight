using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyFlight.Errors
{
    public class ErrorsHandler
    {
        public bool HasError = false;
        public int? StatusCode = null;
        public string ErrorInfo = null;

        public void ReqisterError(int statusCode, string errorInfo)
        {
            StatusCode = statusCode;
            ErrorInfo = errorInfo;
            HasError = true;
        }

        public void UnregisterError()
        {
            StatusCode = null;
            ErrorInfo = null;
            HasError = false;
        }
    }
}