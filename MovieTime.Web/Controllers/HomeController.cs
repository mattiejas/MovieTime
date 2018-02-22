using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Serilog;

//test

namespace MovieTime.Web.Controllers
{   
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            Log.Information("This is how you call the Serilog Logger");
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
