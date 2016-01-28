using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Consumer()
        {
            ViewBag.Message = "Your application description page.";
            ViewData["Login"] = Request.Params["login"];
            return View();
        }

        public ActionResult Admin()
        {
            ViewBag.Message = "Your contact page.";
            ViewData["Login"] = Request.Params["login"];
            return View();
        }
        
    }
}