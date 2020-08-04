using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AgendaConsultas.API.Models
{
    public class Paciente
    {
        [Key]
        public int PacienteID { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Nome { get; set; }

        [Required]
        [Column(TypeName = "datetime")]
        public DateTime DataNascimento { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Email { get; set; }
        [Column(TypeName = "nvarchar(10)")]
        public string Telefone { get; set; }


        public virtual List<Consulta> Consultas { get; set; }
    }
}
