using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyFlight.Models
{
    public interface IRepository <Item, SearchOptions>
    {
        Item Get(int id);
        IEnumerable<Item> Search(SearchOptions searchOptions);
        void Add(Item item);
        void Update(Item item);
        void Delete(int id);
    }
}
