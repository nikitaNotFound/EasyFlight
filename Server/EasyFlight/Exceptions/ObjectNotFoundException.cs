using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyFlight.Exceptions
{
    public class ObjectNotFoundException : Exception
    {
        public ObjectNotFoundException(int objectId) :
            base(String.Format("Object with id = {0} was not found!", objectId))
        {
        }
    }
}
