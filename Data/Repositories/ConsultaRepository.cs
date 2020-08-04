using AgendaConsultas.API.Data;
using AgendaConsultas.API.Data.Interfaces;
using AgendaConsultas.API.Data.Repositories;
using AgendaConsultas.API.Models;

namespace AgendaConsultas.API.Data.Repositories
{
    public class ConsultaRepository : DataRepository<Consulta>, IConsultaRepository
    {
        public ConsultaRepository(DataContext context) : base(context)
        {
        }
    }
}
