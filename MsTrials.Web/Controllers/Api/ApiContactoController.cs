using MsTrials.Web.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Mail;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace MsTrials.Web.Controllers.Api
{
    public class ApiContactoController : ApiController
    {
        public string GetSendEmail(string searchParams)
        {
            try
            {
                JavaScriptSerializer js = new JavaScriptSerializer();
                var parameters = js.Deserialize<EmailModel>(searchParams);

                GMailer.GmailUsername = ConfigurationManager.AppSettings["GmailUser"];
                GMailer.GmailPassword = ConfigurationManager.AppSettings["GmailPass"];

                GMailer mailer = new GMailer();
                mailer.ToEmail = ConfigurationManager.AppSettings["EmailContactoTo"];
                mailer.FromEmail = parameters.email;
                mailer.Subject = "NUEVO CONTACTO – MS TRIALS";//data.name + " [" + data.email + "]";
                //mailer.Body = "Email: " + parameters.email + "<br /><br />" + "Nombre: " + parameters.name + "<br /><br />" + "Motivo: " + parameters.subject;//data.subject;
                mailer.Body = "Email: " + parameters.email + "<br /><br />";//data.subject;
                mailer.IsHtml = true;
                mailer.Send();
                return "0";
            }catch{
                throw new Exception();
            }
        }

        public string GetSubscribeToNewsletter(string searchParams)
        {
            try
            {
                /*using (MsTrialsEntities context = new MsTrialsEntities())
                {
                    Newsletter obj = new Newsletter();
                    obj.Email = email.email;

                    context.Newsletters.Add(obj);
                    context.SaveChanges();          

                    return null;
                }*/

                JavaScriptSerializer js = new JavaScriptSerializer();
                var parameters = js.Deserialize<EmailModel>(searchParams);

                GMailer.GmailUsername = ConfigurationManager.AppSettings["GmailUser"];
                GMailer.GmailPassword = ConfigurationManager.AppSettings["GmailPass"];

                GMailer mailer = new GMailer();
                mailer.ToEmail = ConfigurationManager.AppSettings["EmailNewsletterTo"];
                mailer.FromEmail = ConfigurationManager.AppSettings["EmailFrom"];
                mailer.Subject = "NUEVO MAIL – MS TRIALS";//data.name + " [" + data.email + "]";
                mailer.Body = parameters.email;
                mailer.IsHtml = true;
                mailer.Send();
                return "0";
            }
            catch
            {
                throw new Exception();
            }
        }
    }
}