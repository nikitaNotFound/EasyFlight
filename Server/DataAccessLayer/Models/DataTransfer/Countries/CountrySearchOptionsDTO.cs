namespace DataAccessLayer.Models.DataTransfer.Countries
{
    public class CountrySearchOptionsDTO
    {
        public string Name { get; }


        public CountrySearchOptionsDTO(string name)
        {
            Name = name;
        }
    }
}