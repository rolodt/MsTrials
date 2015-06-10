using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MsTrials.Web.Models
{
    public class SearchEstudioFilter
    {
        public int estudioId { get; set; }
        public int? medicamentoId { get; set; }
        public int? indicacionId { get; set; }
        public int? comparadorId { get; set; }
        public int? sponsorId { get; set; }
        public int? primerAutorId { get; set; }
        public int maxRecords { get; set; }
        public int pageNumber { get; set; }
        public string callback { get; set; }
        //public int? lastEstudioId { get; set; }
    }
}