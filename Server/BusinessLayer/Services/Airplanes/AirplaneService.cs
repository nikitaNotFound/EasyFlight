using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Models;

namespace BusinessLayer.Services.Airplanes
{
    class AirplaneService : IAirplaneService
    {
        public Task<ResultTypes> AddAirplaneSeatSchemeAsync(Array[] seatScheme)
        {
            throw new NotImplementedException();
        }

        public Task<ResultTypes> AddAirplaneSeatTypeAsync(AirplaneSeatType seatType)
        {
            throw new NotImplementedException();
        }

        public Task<ResultTypes> AddAsync(Airplane airplane)
        {
            throw new NotImplementedException();
        }

        public Task<Array[]> GetAirplaneSeatSchemeAsync(int airplaneId)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyCollection<AirplaneSeatType>> GetAirplaneSeatTypesAsync(int airplaneId)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyCollection<Airplane>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Airplane> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyCollection<Airplane>> SearchAirplanesAsync(AirplaneFilter filter)
        {
            throw new NotImplementedException();
        }
    }
}
