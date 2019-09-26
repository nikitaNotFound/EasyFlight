using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using EasyFlight.Exceptions;
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

            if (!await db.ExecuteScalarAsync<bool>(EXISTING_CHECK_QUERY, item))
            {
                const string INSERT_QUERY = @"
                    INSERT INTO cities(countryId, name)
                    VALUES(@countryId, @name)";

                await db.ExecuteAsync(INSERT_QUERY, item);
            }
            else
            {
                throw new DuplicatedItemException(item.Name);
            }
        }

        public async Task<City> GetAsync(int id)
        {
            string GET_QUERY = @"
                SELECT TOP 1 *
                FROM cities
                WHERE id=@id";

            var cityQueryResult = (await db.QueryAsync<City>(GET_QUERY, new { id = id })).ToList();

            if (cityQueryResult.Count() == 1)
            {
                return cityQueryResult.First();
            }
            else
            {
                throw new Exception();
            }
        }

        public async Task<IEnumerable<City>> SearchAsync(CitySearchOptions searchOptions)
        {
            const string SEARCH_QUERY = @"
                SELECT *
                FROM cities
                WHERE countryId=@countryId
                and name LIKE '@Name%";

            return await db.QueryAsync<City>(SEARCH_QUERY, searchOptions);
        }

        public async Task UpdateAsync(City item)
        {
            const string UPDATE_QUERY = @"
                UPDATE cities
                SET name=@name, countryId=@countryId
                WHERE id=@id";

            await db.ExecuteAsync(UPDATE_QUERY, item);
        }
    }
}