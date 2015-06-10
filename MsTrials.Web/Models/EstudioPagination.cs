using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MsTrials.Web.Models
{
    public class EstudioPagination
    {
        public IEnumerable<EstudioApiModel> estudios { get; set; }

        public int totalRecords { get; set; }
    }
}