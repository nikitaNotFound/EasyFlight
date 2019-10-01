using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyFlight.Errors.Types
{
    public interface IErrorType
    {
        string Message { get; }
    }
}