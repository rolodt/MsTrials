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
    public class AdminAutorController : CultureController
    {
        private string partialRoute = "~/Views/Admin/Autor/";
        private string imagesPath = "/Images/";
        // GET: Admin5
        public ActionResult Index()
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var model = from e in context.Autors
                            select e;
                return View(partialRoute + "List.cshtml", model.ToList());
            }
        }

        public ActionResult Add()
        {
            return View(partialRoute + "AddEdit.cshtml");
        }

        public ActionResult Edit(int id)
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var model = from e in context.Autors
                            where e.AutorId == id
                            select e;
                return View(partialRoute + "AddEdit.cshtml", model.FirstOrDefault());
            }
        }

        [HttpPost]
        public ActionResult AddEdit(int? autorId, string nombre, string apellido, string email, string reseña)
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                if (autorId == null)
                {
                    Autor autor = new Autor();
                    autor.Nombre = nombre;
                    autor.Apellido = apellido;
                    autor.Email = email;
                    autor.Reseña = reseña;

                    context.Autors.Add(autor);
                    context.SaveChanges();

                    autor.ImageURL = SaveImage(autor, autor.ImageURL);
                    context.SaveChanges();
                }
                else
                {
                    var autores = from Autor e in context.Autors
                                 where e.AutorId == autorId
                                 select e;

                    if (autores.Count() > 0)
                    {
                        Autor autor = autores.FirstOrDefault();
                        autor.Nombre = nombre;
                        autor.Apellido = apellido;
                        autor.Email = email;
                        autor.Reseña = reseña;
                        autor.ImageURL = SaveImage(autor, autor.ImageURL);
                        context.SaveChanges();
                    }
                }
                return RedirectToAction("Index", "admin/autor");
            }
        }

        public string SaveImage(Autor autor, string defaultUrl)
        {
            try
            {
                if (Request.Files.Count > 0)
                {
                    var file = Request.Files[0];

                    if (file != null && file.ContentLength > 0)
                    {
                        if(autor.ImageURL != null && autor.ImageURL != "")
                            RemovePreviousImage(autor.ImageURL);
                        var fileName = autor.AutorId.ToString() + "_" + Path.GetFileName(file.FileName);
                        var path = Path.Combine(Server.MapPath(imagesPath), fileName);
                        file.SaveAs(path);
                        return imagesPath + fileName;
                    }
                }
                return defaultUrl;
            }catch{
                return defaultUrl;
            }
        }

        public void RemovePreviousImage(string imageUrl)
        {
            //string[] files = Directory.GetFiles(Server.MapPath(imagesPath), autorId.ToString() + "_*", System.IO.SearchOption.TopDirectoryOnly);
            string fullPath = Server.MapPath(imageUrl);
            if (System.IO.File.Exists(fullPath))
                System.IO.File.Delete(fullPath);
        }

        public ActionResult Delete(int id)
        {
            using (MsTrialsEntities context = new MsTrialsEntities())
            {
                var autor = (from e in context.Autors
                            where e.AutorId == id
                            select e).FirstOrDefault();
                
                while (autor.AutorEstudios.Count() > 0)
                {
                    context.AutorEstudios.Remove(autor.AutorEstudios.ElementAt(0));
                }
                context.SaveChanges();

                context.Autors.Remove(autor);
                context.SaveChanges();
                return RedirectToAction("Index", "admin/autor");
            }
        }
    }
}