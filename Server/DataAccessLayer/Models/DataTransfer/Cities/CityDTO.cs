namespace DataAccessLayer.Models.DataTransfer.Cities
{
    public class CityDTO
    {
        public int? Id { get; }
        public string Name { get; }
        public int CountryId { get; }


        public CityDTO(int id, string name, int countryId)
        {
            Id = id;
            Name = name;
            CountryId = countryId;
        }
    }
}