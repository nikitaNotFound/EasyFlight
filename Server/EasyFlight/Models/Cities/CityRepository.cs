using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace EasyFlight.Models.Cities
{
    public class CityRepository : IRepository<City, CitySearchOptions>
    {
        SqlConnection db = null;

        public CityRepository(string conn)
        {
            db = new SqlConnection(conn);
        }

        public void Add(City item)
        {
            string query = $"SELECT * FROM cities WHERE name='{item.Name}' and countryId={item.CountryId}";

            IEnumerable<City> foundCities = db.Query<City>(query);

            if (foundCities.Count() == 0)
            {
                query = $"INSERT INTO cities(countryId, name) VALUES(@countryId, @name)";
                db.Execute(query, item);
            }
            else
            {
                throw new Exception("Such city exists!");
            }
        }

        public void Delete(int id)
        {
            string query = $"DELETE FROM cities WHERE id={id}";
            db.Query(query);
        }

        public City Get(int id)
        {
            string query = $"SELECT * FROM cities WHERE id={id}";
            City foundCity = db.Query<City>(query).ToList().First();

            return foundCity;
        }

        public IEnumerable<City> Search(CitySearchOptions searchOptions)
        {
            string query = $"SELECT * FROM cities " +
                $"WHERE countryId={searchOptions.CountryId} " +
                $"and name LIKE '{searchOptions.Name}%'";

            IEnumerable<City> foundCities = db.Query<City>(query);

            return foundCities;
        }

        public void Update(City item)
        {
            string query = $"UPDATE cities SET name=@name, countryId=@countryId WHERE id=@id";
            db.Execute(query, item);
        }
    }
}