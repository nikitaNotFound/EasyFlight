using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyFlight.Exceptions
{
    public class DuplicatedItemException : Exception
    {
        public DuplicatedItemException(string objectName)
            : base(String.Format("{0} already exists!", objectName))
        {
        }
    }
}
