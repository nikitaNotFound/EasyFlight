using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyFlight.Exceptions
{
    public class AttemptToAddExistingObjectException : Exception
    {
        public AttemptToAddExistingObjectException(string objectName)
            : base(String.Format("{0} already exists!", objectName))
        {
        }
    }
}
