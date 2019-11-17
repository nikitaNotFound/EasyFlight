using System.Collections.Generic;

namespace BusinessLayer.Models
{
    public class ItemsPage<T>
    {
        public IReadOnlyCollection<T> Content { get; set; }
        public int TotalItemsCount { get; set; }
    }
}