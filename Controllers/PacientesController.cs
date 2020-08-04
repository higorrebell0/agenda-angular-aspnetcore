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
    public class PacientesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IPacienteRepository _repo;

        public PacientesController(DataContext context, IPacienteRepository repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Pacientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Paciente>>> GetPacientes()
        {
            return await _context.Pacientes.ToListAsync();
        }

        // GET: api/Pacientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Paciente>> GetPaciente(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var paciente = await _context.Pacientes.FindAsync(id);

            if (paciente == null)
            {
                return NotFound();
            }

            return Ok(paciente);
        }

        // PUT: api/Pacientes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaciente(int id, Paciente paciente)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dadoPaciente = _repo.Get(id);
            if (dadoPaciente != null)
            {
                dadoPaciente.Nome = paciente.Nome;
                dadoPaciente.DataNascimento = paciente.DataNascimento;
                dadoPaciente.Email = paciente.Email;
                dadoPaciente.Telefone = paciente.Telefone;
            }

            try
            {
                _repo.Update(dadoPaciente);
                var save = await _repo.SaveAsync(dadoPaciente);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PacienteExists(id))
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

        // POST: api/Pacientes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Paciente>> PostPaciente([FromBody] Paciente paciente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(paciente);
            var save = await _repo.SaveAsync(paciente);

            return CreatedAtAction("GetPaciente", new { id = paciente.PacienteID }, paciente);
        }

        // DELETE: api/Pacientes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Paciente>> DeletePaciente(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var paciente = await _context.Pacientes.FindAsync(id);
            if (paciente == null)
            {
                return NotFound();
            }

            _repo.Delete(paciente);
            var save = await _repo.SaveAsync(paciente);

            return Ok(paciente);
        }

        private bool PacienteExists(int id)
        {
            return _context.Pacientes.Any(e => e.PacienteID == id);
        }
    }
}
