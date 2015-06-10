using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MsTrials.Web.Models
{
    public class EstudioApiModel
    {
        public int id { get; set; }
        public string titulo { get; set; }
        public string nombre { get; set; }
        public string imageUrl { get; set; }
        public short? anio { get; set; }
        public string revision { get; set; }
        public string volumen { get; set; }
        public string metodo { get; set; }
        public string resultados { get; set; }
        public string objetivos { get; set; }
        public string nombreComercial { get; set; }
        public string conclusion { get; set; }
        public string primerAutor { get; set; }
        public string[] autores { get; set; }
        public long cantidadDeVisitas { get; set; }
        public string medicamento { get; set; }
        public string comparador { get; set; }
        public string indicacion { get; set; }
        public string sponsor { get; set; }
        public string link { get; set; }
        public int? medicamentoId { get; set; }
        public int? indicacionId { get; set; }
        public int? comparadorId { get; set; }
        public int? sponsorId { get; set; }
        public int? primerAutorId { get; set; }

        

    }
}