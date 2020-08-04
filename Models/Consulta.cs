using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AgendaConsultas.API.Models
{
    public class Consulta
    {
        [Key]
        public int ConsultaID { get; set; }

        [Required]
        [Column(TypeName = "datetime")]
        public DateTime DataInicio { get; set; }

        [Required]
        [Column(TypeName = "datetime")]
        public DateTime DataTermino { get; set; }

        [Column(TypeName = "nvarchar(500)")]
        public string Observacoes { get; set; }

        [Required]
        public int PacienteID { get; set; }

        public virtual Paciente Paciente { get; set; }
    }
}
