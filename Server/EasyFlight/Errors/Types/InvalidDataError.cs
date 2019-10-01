using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyFlight.Errors.Types
{
    public class InvalidDataError : IErrorType
    {
        public string Message { get; }

        public InvalidDataError()
        {
            Message = "Looks like you did't set required fields.";
        }
    }
}