using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC5.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Content()
        {

            ViewBag.Message = "Content Page";
            
            return View();
        }
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


        public ActionResult GetS1()
        {
            var json1 = "{ ";
            json1 += "   \"dataset\" : {";
            json1 += " \"label\" : \"Population in Tuvalu in 2002. By sex\",";
            json1 += " \"value\" : [4729, 4832, 9561],";
            json1 += "\"dimension\" : {";
            json1 += "\"id\" : [\"metric\", \"time\", \"geo\", \"sex\"],";
            json1 += "\"size\" : [1, 1, 1, 3],";
            json1 += "\"sex\" : {";
            json1 += "\"label\" : \"Sex\",";
            json1 += "\"category\" : {";
            json1 += "   \"index\" : {";
            json1 += "     \"M\" : 0,";
            json1 += "     \"F\" : 1,";
            json1 += "     \"T\" : 2";
            json1 += "   },";
            json1 += "   \"label\" : {";
            json1 += "     \"M\" : \"Men\",";
            json1 += "     \"F\" : \"Women\",";
            json1 += "     \"T\" : \"Total\"";
            json1 += "   }";
            json1 += "}";
            json1 += "}";
            json1 += "}";
            json1 += " }";
            json1 += "}";
            return this.Content(json1, "application/json");
        }
    }
}