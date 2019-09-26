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

        public async Task AddAsync(City item)
        {
            const string EXISTING_CHECK_QUERY = @"
                SELECT *
                FROM cities
                WHERE name=@Name
                    and countryId=CountryId";

            if (!db.ExecuteScalar<bool>(EXISTING_CHECK_QUERY, item))
            {
                const string INSERT_QUERY = @"
                    INSERT INTO cities(countryId, name)
                    VALUES(@countryId, @name)";

                db.Execute(INSERT_QUERY, item);
            }
            else
            {
                throw new Exception($"'{item.Name}' already exists!");
            }
        }

        public City GetAsync(int id)
        {
            string GET_QUERY = @"
                SELECT *
                FROM cities
                WHERE id={id}";

            City foundCity = db.Query<City>(GET_QUERY).ToList().First();

            return foundCity;
        }

        public IEnumerable<City> SearchAsync(CitySearchOptions searchOptions)
        {
            const string SEARCH_QUERY = @"
                SELECT *
                FROM cities
                WHERE countryId=@countryId
                and name LIKE '@Name%";

            IEnumerable<City> foundCities = db.Query<City>(SEARCH_QUERY, searchOptions);

            return foundCities;
        }

        public void UpdateAsync(City item)
        {
            const string UPDATE_QUERY = @"
                UPDATE cities
                SET name=@name, countryId=@countryId
                WHERE id=@id";

            db.Execute(UPDATE_QUERY, item);
        }
    }
}