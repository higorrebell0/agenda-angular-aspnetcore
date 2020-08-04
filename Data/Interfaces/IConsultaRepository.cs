using AgendaConsultas.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgendaConsultas.API.Data.Interfaces
{
    public interface IConsultaRepository : IDataRepository<Consulta>
    {
    }
}
