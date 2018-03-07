using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieTime.Web.Controllers
{
		//[Authorize]
		[Route("/auth")]
		public class AuthController : Controller
    {
				[HttpGet("/secretdata")]
				public ActionResult SecretData()
				{
						return Ok("Secret Data from Backend AuthController!");
				}
		}
}
