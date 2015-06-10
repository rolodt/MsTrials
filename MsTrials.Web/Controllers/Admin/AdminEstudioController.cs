using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MsTrials.Web.Models;
using System.IO;

namespace MsTrials.Web.Controllers
{
    [Authorize]
    public class AdminEstudioController : CultureController
    {
        private string partialRoute = "~/Views/Admin/Estudio/";
        private string imagesPath = "/Images/";
        // GET: Admin5
        public ActionResult Index()
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var model = from e in context.Estudios
                            select e;
                return View(partialRoute + "List.cshtml", model.ToList());
            }
        }

        public ActionResult Add()
        {
            EstudioAddEditModel model = GetAddEditModel();
            model.selectedComparadorId = "0";
            model.selectedIndicacionId = "0";
            model.selectedMedicamentoId = "0";
            model.selectedSponsorId = "0";
            model.selectedAutorIds = new string[0];
            return View(partialRoute + "AddEdit.cshtml", model);
        }

        public EstudioAddEditModel GetAddEditModel()
        {
            EstudioAddEditModel model = new EstudioAddEditModel();

            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                IEnumerable<SelectListItem> comparadores =
                                                            from s in context.Comparadors
                                                            select new SelectListItem
                                                            {
                                                                Text = s.Descripcion,
                                                                Value = s.ComparadorId.ToString()
                                                            };
                model.comparadores = comparadores.ToList();

                IEnumerable<SelectListItem> indicaciones =
                                                            from s in context.Indicacions
                                                            select new SelectListItem
                                                            {
                                                                Text = s.Descripcion,
                                                                Value = s.IndicacionId.ToString()
                                                            };
                model.indicaciones = indicaciones.ToList();

                IEnumerable<SelectListItem> medicamentos =
                                                           from s in context.Medicamentoes
                                                           select new SelectListItem
                                                           {
                                                               Text = s.Descripcion,
                                                               Value = s.MedicamentoId.ToString()
                                                           };
                model.medicamentos = medicamentos.ToList();

                IEnumerable<SelectListItem> sponsors =
                                                            from s in context.Sponsors
                                                            select new SelectListItem
                                                            {
                                                                Text = s.Nombre,
                                                                Value = s.SponsorId.ToString()
                                                            };
                model.sponsors = sponsors.ToList();

                IEnumerable<SelectListItem> autores =
                                                            from s in context.Autors
                                                            select new SelectListItem
                                                            {
                                                                Text = s.Nombre + " " + s.Apellido,
                                                                Value = s.AutorId.ToString()
                                                            };
                model.autores = autores.ToList();
            }

            return model;
        }

        public ActionResult Edit(int id)
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var estudio = from e in context.Estudios
                            where e.EstudioId == id
                            select e;
                EstudioAddEditModel model = GetAddEditModel();
                model.estudio = estudio.FirstOrDefault();

                
                model.selectedComparadorId = model.estudio.ComparadorId.HasValue ? model.estudio.ComparadorId.Value.ToString() : "0";

                model.selectedIndicacionId = model.estudio.IndicacionId.HasValue ? model.estudio.IndicacionId.Value.ToString() : "0";

                model.selectedMedicamentoId = model.estudio.MedicamentoId.HasValue ? model.estudio.MedicamentoId.Value.ToString() : "0";

                model.selectedSponsorId = model.estudio.SponsorId.HasValue ? model.estudio.SponsorId.Value.ToString() : "0";

                var autorEstudios = from s in context.AutorEstudios
                                      where s.EstudioId == id
                                      select s.AutorId.ToString();
                model.selectedAutorIds = autorEstudios.ToArray();

                model.primerAutorId = model.estudio.PrimerAutorId;

                return View(partialRoute + "AddEdit.cshtml", model);
            }
        }

        [HttpPost]
        public ActionResult AddEdit(int? estudioId, string titulo, string nombre, short? año, string revision, string volumen, string link, string nombreComercial, string objetivos, string metodo, string resultados, string conclusion, int? selectedMedicamentoId, int? selectedIndicacionId, int? selectedComparadorId, int? selectedSponsorId, int primerAutorId, int[] autorIds, string active)
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                if (estudioId == null)
                {
                    Estudio estudio = new Estudio();
                    estudio.Titulo = titulo;
                    estudio.Nombre = nombre;
                    estudio.Link = link;
                    estudio.Año = año;
                    estudio.Revision = revision;
                    estudio.Volumen = volumen;
                    estudio.NombreComercial = nombreComercial;
                    estudio.Objetivos = objetivos;
                    estudio.Metodo = metodo;
                    estudio.Resultados = resultados;
                    estudio.Conclusion = conclusion;
                    estudio.ComparadorId = selectedComparadorId;
                    estudio.IndicacionId = selectedIndicacionId;
                    estudio.MedicamentoId = selectedMedicamentoId;
                    estudio.SponsorId = selectedSponsorId;
                    estudio.PrimerAutorId = primerAutorId;
                    estudio.Active = (active == "on" ? 1 : 0);
                    estudio.FechaCreacion = DateTime.Now;

                    context.Estudios.Add(estudio);
                    context.SaveChanges();

                    estudio.ImageURL = SaveImage(estudio, estudio.ImageURL);
                    context.SaveChanges();

                    if (autorIds != null)
                    {
                        for (int i = 0; i < autorIds.Count(); i++)
                        {
                            AutorEstudio se = new AutorEstudio();
                            se.EstudioId = estudio.EstudioId;
                            se.AutorId = autorIds[i];
                            estudio.AutorEstudios.Add(se);
                        }
                    }

                    context.SaveChanges();
                }
                else
                {
                    var estudios = from Estudio e in context.Estudios
                                 where e.EstudioId == estudioId
                                 select e;

                    if (estudios.Count() > 0)
                    {
                        Estudio estudio = estudios.First();
                        estudio.Titulo = titulo;
                        estudio.Nombre = nombre;
                        estudio.Link = link;
                        estudio.Año = año;
                        estudio.Revision = revision;
                        estudio.Volumen = volumen;
                        estudio.NombreComercial = nombreComercial;
                        estudio.Objetivos = objetivos;
                        estudio.Metodo = metodo;
                        estudio.Resultados = resultados;
                        estudio.Conclusion = conclusion;
                        estudio.ComparadorId = selectedComparadorId;
                        estudio.IndicacionId = selectedIndicacionId;
                        estudio.MedicamentoId = selectedMedicamentoId;
                        estudio.SponsorId = selectedSponsorId;
                        estudio.PrimerAutorId = primerAutorId;
                        estudio.Active = (active == "on" ? 1 : 0);
                        estudio.ImageURL = SaveImage(estudio, estudio.ImageURL);
                        context.SaveChanges();

                        while (estudio.AutorEstudios.Count() > 0)
                        {
                            context.AutorEstudios.Remove(estudio.AutorEstudios.ElementAt(0));
                        }
                        context.SaveChanges();

                        if (autorIds != null)
                        {
                            for (int i = 0; i < autorIds.Count(); i++)
                            {
                                AutorEstudio se = new AutorEstudio();
                                se.EstudioId = estudio.EstudioId;
                                se.AutorId = autorIds[i];
                                estudio.AutorEstudios.Add(se);
                            }
                        }

                        context.SaveChanges();
                    }
                }
                return RedirectToAction("Index", "admin/estudio");
            }
        }

        public ActionResult Delete(int id)
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var estudio = (from e in context.Estudios
                            where e.EstudioId == id
                            select e).FirstOrDefault();

                while (estudio.AutorEstudios.Count() > 0)
                {
                    context.AutorEstudios.Remove(estudio.AutorEstudios.ElementAt(0));
                }
                context.SaveChanges();

                context.Estudios.Remove(estudio);
                context.SaveChanges();
                return RedirectToAction("Index", "admin/estudio");
            }
        }

        public string SaveImage(Estudio estudio, string defaultUrl)
        {
            try
            {
                if (Request.Files.Count > 0)
                {
                    var file = Request.Files[0];

                    if (file != null && file.ContentLength > 0)
                    {
                        if (estudio.ImageURL != null && estudio.ImageURL != "")
                            RemovePreviousImage(estudio.ImageURL);
                        var fileName = estudio.EstudioId.ToString() + "__" + Path.GetFileName(file.FileName);
                        var path = Path.Combine(Server.MapPath(imagesPath), fileName);
                        file.SaveAs(path);
                        return imagesPath + fileName;
                    }
                }
                return defaultUrl;
            }
            catch
            {
                return defaultUrl;
            }
        }

        public void RemovePreviousImage(string imageUrl)
        {
            string fullPath = Server.MapPath(imageUrl);
            if (System.IO.File.Exists(fullPath))
                System.IO.File.Delete(fullPath);
        }
    }
}