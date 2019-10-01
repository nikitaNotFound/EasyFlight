using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyFlight.Errors.Types
{
    public class DublicateItemError : IErrorType
    {
        public string Message { get; }

        public DublicateItemError(string itemName)
        {
            Message = $"{itemName} already exists!";
        }
    }
}