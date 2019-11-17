using System.Collections.Generic;

namespace DataAccessLayer.Models
{
    public class ItemsPageEntity<T>
    {
        public IReadOnlyCollection<T> Content { get; set; }
        public int TotalItemsCount { get; set; }

        public ItemsPageEntity(IReadOnlyCollection<T> content, int totalItemsCount)
        {
            Content = content;
            TotalItemsCount = totalItemsCount;
        }
    }
}