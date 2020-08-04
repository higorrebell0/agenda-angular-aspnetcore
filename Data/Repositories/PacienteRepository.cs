using AgendaConsultas.API.Data.Interfaces;
using AgendaConsultas.API.Models;

namespace AgendaConsultas.API.Data.Repositories
{
    public class PacienteRepository : DataRepository<Paciente>, IPacienteRepository
    {
        public PacienteRepository(DataContext context) : base(context)
        {
        }
    }
}
