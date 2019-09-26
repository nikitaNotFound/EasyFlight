using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyFlight.Exceptions
{
    public class ErrorMessage
    {
        public string message { get; }

        public ErrorMessage(string message)
        {
            this.message = message;
        }
    }
}
