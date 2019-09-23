using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyFlight.Models;
using Dapper;
using System.Data.SqlClient;

namespace EasyFlight.Models.Countries
{
    public class CountryRepository : IRepository<Country, CountrySearchOptions>
    {
        SqlConnection db = null;
        public CountryRepository(string conn)
        {
            db = new SqlConnection(conn);
        }

        public void Add(Country item)
        {
            string query = $"SELECT * FROM countries WHERE name='{item.Name}'";

            IEnumerable<Country> foundedCountries = db.Query<Country>(query);

            if (foundedCountries.Count() == 0)
            {
                query = "INSERT INTO countries(name) VALUES(@name)";
                db.Execute(query, item);
            }
            else
            {
                throw new Exception("Such country exists!");
            }
        }

        public void Delete(int id)
        {
            string query = $"DELETE FROM countries WHERE id={id}";
            db.Query(query);
        }

        public Country Get(int id)
        {
            string query = $"SELECT * FROM countries WHERE id={id}";
            var countryQueryResult = db.Query<Country>(query).ToList();

            if (countryQueryResult.Count == 1)
            {
                return countryQueryResult.First();
            }

            return null;
        }

        public IEnumerable<Country> Search(CountrySearchOptions searchOptions)
        {
            string query = $"SELECT * FROM countries WHERE name LIKE '{searchOptions.Name}%'";

            return db.Query<Country>(query);
        }

        public void Update(Country item)
        {
            string query = "UPDATE countries SET name=@name WHERE id=@id";
            db.Execute(query, item);
        }
    }
}
