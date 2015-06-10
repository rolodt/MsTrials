using MsTrials.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace MsTrials.Web.Controllers.Api
{
    public class ApiAutorController : ApiController
    {
        public IEnumerable<AutorApiModel> GetAll()
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                IEnumerable<AutorApiModel> model = (from e in context.Autors
                                                     select new AutorApiModel
                                                     {
                                                         nombre = e.Nombre,
                                                         apellido = e.Apellido,
                                                         reseña = e.Reseña,
                                                         email = e.Email,
                                                         imageUrl = e.ImageURL
                                                     }).ToList();

                return model;
            }
        }
    }
}