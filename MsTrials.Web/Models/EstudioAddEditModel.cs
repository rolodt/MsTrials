using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MsTrials.Web.Models
{
    public class EstudioAddEditModel
    {
        public Estudio estudio { get; set; }

        public IEnumerable<SelectListItem> comparadores { get; set; }
        public String selectedComparadorId { get; set; }

        public IEnumerable<SelectListItem> indicaciones { get; set; }
        public String selectedIndicacionId { get; set; }

        public IEnumerable<SelectListItem> medicamentos { get; set; }
        public String selectedMedicamentoId { get; set; }

        public IEnumerable<SelectListItem> sponsors { get; set; }
        public String selectedSponsorId { get; set; }

        public IEnumerable<SelectListItem> autores { get; set; }
        public String[] selectedAutorIds { get; set; }

        public int primerAutorId { get; set; }
    }
}