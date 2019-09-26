using System.Collections.Generic;
using System.Threading.Tasks;

namespace EasyFlight.Models
{
    public interface IRepository <Item, SearchOptions>
    {
        Task<Item> GetAsync(int id);
        Task<IEnumerable<Item>> SearchAsync(SearchOptions searchOptions);
        Task AddAsync(Item item);
        Task UpdateAsync(Item item);
    }
}