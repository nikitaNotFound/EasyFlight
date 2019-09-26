using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using EasyFlight.Exceptions;
using Dapper;

namespace EasyFlight.Models.Countries
{
    public class CountryRepository : IRepository<Country, CountrySearchOptions>
    {
        SqlConnection db = null;
        public CountryRepository(string conn)
        {
            db = new SqlConnection(conn);
        }

        public async Task AddAsync(Country item)
        {
            const string EXISTING_CHECK_QUERY = @"
                SELECT *
                FROM countries
                WHERE name=@name";

            if (!await db.ExecuteScalarAsync<bool>(EXISTING_CHECK_QUERY, item))
            {
                const string INSERT_ITEM_QUERY = @"
                    INSERT INTO countries(name)
                    VALUES(@name)";

                await db.ExecuteAsync(INSERT_ITEM_QUERY, item);
            }
            else
            {
                throw new AttemptToAddExistingObjectException(item.Name);
            }
        }

        public async Task<Country> GetAsync(int id)
        {
            const string GET_QUERY = @"
                SELECT TOP 1 *
                FROM countries
                WHERE id=@id";

            var countryQueryResult = (await db.QueryAsync<Country>(GET_QUERY, new { id = id })).ToList();

            if (countryQueryResult.Count() == 1)
            {
                return countryQueryResult.First();
            }
            else
            {
                throw new ObjectNotFoundException(id);
            }
        }

        public async Task<IEnumerable<Country>> SearchAsync(CountrySearchOptions searchOptions)
        {
            const string SEARCH_QUERY = @"
                SELECT *
                FROM countries
                WHERE name LIKE '{0}%'";

            return (await db.QueryAsync<Country>(String.Format(SEARCH_QUERY, searchOptions.Name)));
        }

        public async Task UpdateAsync(Country item)
        {
            const string UPDATE_QUERY = @"
                UPDATE countries
                SET name=@name
                WHERE id=@id";

            await db.ExecuteAsync(UPDATE_QUERY, item);
        }
    }
}
