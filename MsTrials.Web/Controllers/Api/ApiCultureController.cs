using MsTrials.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace MsTrials.Web.Controllers.Api
{
    public class ApiCultureController : ApiController
    {
        public Dictionary<string, Dictionary<string, string>> GetAll()
        {

            Dictionary<string, string> español = new Dictionary<string, string>()
            {
                {"emptyRecords"         , "No se encontraron resultados para su búsqueda."},
                {"studies"              , "Estudios"},
                {"authors"              , "Autores"},
                {"contact"              , "Contacto"},
                {"appOffline"           , "La aplicacion no posee conexion"},
                {"appOnline"            , "La app esta nuevamente online"},
                {"results"              , "Resultados"},
                {"recommendedStudies"   , "Estudios recomendados"},
                {"searchResults"   , "Resultados de la búsqueda"},
                {"searchTitle"   , "Búsqueda de Estudios"},
                {"medicament"   , "Droga"},
                {"indication"   , "Indicación"},
                {"firstAuthor"   , "Primer autor"},
                {"comparator"   , "Comparador"},
                {"searchButton"   , "Buscar"},
                {"year"   , "Año"},
                {"downloadAppText"   , "Descargate nuestra App y busca todas las reseñas en tu celular"},
                {"newsletterText"   , "Suscribite a nuestra aplicación y enterate de los últimos estudios."},
                {"followUs"   , "Contacto"},
                {"viewMode"   , "Modo de vista:"},
                {"pages"   , "Páginas:"},
                {"contactForm"   , "Formulario de contacto"},
                {"subject"   , "Motivo"},
                {"name"   , "Nombre"},
                {"mandatory"   , "(obligatorio)"},
                {"sendButton"   , "Enviar"},
                {"objectives"   , "Objetivos"},
                {"method"   , "Método"},
                {"comercialName"   , "Nombre comercial"},
                {"moreInformation"   , "Más información"},
                {"conclusion"   , "Conclusión"}, 
                {"home"   , "Inicio"},
                {"contactSucceed"   , "Se ha enviado exitosamente!"},
                {"errorOccured"   , "Ha ocurrido un error. Intente nuevamente."},
                {"subscribed"   , "Te has subscripto!"},
                {"wrongAddress", "Por favor ingrese una dirección válida."},
                {"refine", "Refinar"},
                {"refineSearch", "Refinar búsqueda"},
                {"study", "Estudio"},
                {"allFieldsRequired", "Por favor complete todos los campos."},
                {"reset", "Resetear"},
                {"apply", "Aplicar"},
                {"filterText", "Filtrar estudios ..."},
                {"choose", "Seleccionar..."}
            }; 

            Dictionary<string, string> ingles = new Dictionary<string, string>()
            {
                {"emptyRecords"         , "No items matched your search query!"},
                {"studies"              , "Studies"},
                {"authors"              , "Authors"},
                {"contact"              , "Contact"},
                {"appOffline"           , "The app is offline"},
                {"appOnline"            , "The app is back online"},
                {"results"              , "Results"},
                {"recommendedStudies"   , "Recommended studies"},
                {"searchResults"   , "Search results"},
                {"searchTitle"   , "Trails search"},
                {"medicament"   , "Medicament"},
                {"indication"   , "Indication"},
                {"firstAuthor"   , "First author"},
                {"comparator"   , "Comparator"},
                {"searchButton"   , "Search"},
                {"year"   , "Year"},
                {"downloadAppText"   , "Download our app and find all the reviews in your mobile"},
                {"newsletterText"   , "Subscribe and find out the latest studies."},
                {"followUs"   , "Contact"},
                {"viewMode"   , "View mode:"},
                {"pages"   , "Pages:"},
                {"contactForm"   , "Contact form"},
                {"subject"   , "Subject"},
                {"name"   , "Name"},
                {"mandatory"   , "(mandatory)"},
                {"sendButton"   , "Send"},
                {"objectives"   , "Objectives"},
                {"method"   , "Method"},
                {"comercialName"   , "Comercial name"},
                {"moreInformation"   , "More information"},
                {"conclusion"   , "Conclusion"}, 
                {"home"   , "Home"},
                {"contactSucceed"   , "Your message was sent successfully!"},
                {"errorOccured"   , "An error occured. Please try again."},
                {"subscribed"   , "You have subscribed!"},
                {"wrongAddress", "Please enter a valid address."},
                {"refine", "Refine"},
                {"refineSearch", "Refine search"},
                {"study", "Study"},
                {"allFieldsRequired", "Please complete all the fields."},
                {"reset", "Reset"},
                {"apply", "Apply"},
                {"filterText", "Filter studies ..."},
                {"choose", "Choose..."}
            };

            return new Dictionary<string, Dictionary<string, string>>()
            {
                {"es-ES", español}, {"en-US", ingles}
            };
        }
    }
}