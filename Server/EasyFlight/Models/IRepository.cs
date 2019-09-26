using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyFlight.Models
{
    public interface IRepository <Item, SearchOptions>
    {
        Item GetAsync(int id);
        IEnumerable<Item> SearchAsync(SearchOptions searchOptions);
        Task AddAsync(Item item);
        void UpdateAsync(Item item);
    }
}
