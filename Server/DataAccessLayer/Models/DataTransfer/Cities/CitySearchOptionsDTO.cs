namespace DataAccessLayer.Models.DataTransfer.Cities
{
    public class CitySearchOptionsDTO
    {
        public string Name { get; }
        public int CountryId { get; }


        public CitySearchOptionsDTO(string name, int countryId)
        {
            Name = name;
            CountryId = countryId;
        }
    }
}