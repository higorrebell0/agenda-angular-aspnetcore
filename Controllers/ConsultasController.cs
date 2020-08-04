using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AgendaConsultas.API.Data;
using AgendaConsultas.API.Models;
using AgendaConsultas.API.Data.Interfaces;

namespace AgendaConsultas.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConsultaRepository _repo;

        public ConsultasController(DataContext context, IConsultaRepository repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Consultas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Consulta>>> GetConsultas()
        {
            var consultas = await _context.Consultas.Include(x => x.Paciente).ToListAsync();
            return Ok(consultas);
        }

        // GET: api/Consultas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Consulta>> GetConsulta(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var consulta = await _context.Consultas.FindAsync(id);

            if (consulta == null)
            {
                return NotFound();
            }

            return Ok(consulta);
        }

        // PUT: api/Consultas/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConsulta(int id, Consulta consulta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dadoConsulta = _repo.Get(id);
            if (dadoConsulta != null)
            {
                dadoConsulta.PacienteID = consulta.PacienteID;
                dadoConsulta.DataInicio = consulta.DataInicio;
                dadoConsulta.DataTermino = consulta.DataTermino;
                dadoConsulta.Observacoes = consulta.Observacoes;
            }

            try
            {
                _repo.Update(dadoConsulta);
                var save = await _repo.SaveAsync(dadoConsulta);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConsultaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Consultas
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Consulta>> PostConsulta(Consulta consulta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(consulta);
            var save = await _repo.SaveAsync(consulta);

            return CreatedAtAction("GetConsulta", new { id = consulta.ConsultaID }, consulta);
        }

        // DELETE: api/Consultas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Consulta>> DeleteConsulta(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var consulta = await _context.Consultas.FindAsync(id);
            if (consulta == null)
            {
                return NotFound();
            }

            _repo.Delete(consulta);
            var save = await _repo.SaveAsync(consulta);

            return Ok(consulta);
        }

        private bool ConsultaExists(int id)
        {
            return _context.Consultas.Any(e => e.ConsultaID == id);
        }
    }
}
