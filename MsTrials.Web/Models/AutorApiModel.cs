using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MsTrials.Web.Models
{
    public class AutorApiModel
    {
        public string nombre { get; set; }
        public string apellido { get; set; }
        public string reseña { get; set; }
        public string email { get; set; }
        public string imageUrl { get; set; }
    }
}