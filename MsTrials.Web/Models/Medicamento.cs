//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MsTrials.Web.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Medicamento
    {
        public Medicamento()
        {
            this.Estudios = new HashSet<Estudio>();
        }
    
        public int MedicamentoId { get; set; }
        public string Descripcion { get; set; }
    
        public virtual ICollection<Estudio> Estudios { get; set; }
    }
}
