using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieTime.Web.Auth;

namespace MovieTime.Web.Controllers
{

    [Authorize]
    [Route("/Auth")]
    public class AuthController : Controller
    {


        [HttpPost("register")]
        public ActionResult Register(/* userModel*/){
            var userIdFromToken = this.User.GetUserId();
            if (userIdFromToken == null)
                return BadRequest("User is not authenticated");           
         //   if (/*userIdFromToken != userModel.Id*/) return BadRequest("The token claims do not match with the submitted userInfo");

            //userRepository.Add(userModel);
            return Ok();
        }

        [HttpGet("secretdata")]
        public Model SecretData()
        {
            return new Model();
        }
    }

    public class Model
    {
        public string Secret = "secretttt";
    }
}
