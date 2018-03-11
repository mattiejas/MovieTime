using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieTime.Web.Auth;
using Serilog;

namespace MovieTime.Web.Controllers
{

    [Authorize]
    [Route("/Auth")]
    public class AuthController : Controller
    {
        [HttpPost("register")]
        public ActionResult Register( [FromBody] AuthUser userModel){
            var userIdFromToken = this.User.GetUserId();
            if (userIdFromToken == null)
                return BadRequest("User is not authenticated");           
                
            Log.Information($"This user is registered with our DB: {userModel.Email}");
            //userRepository.Add(userModel);
            return Ok();
        }

        [HttpPost("unregister")]
        public ActionResult Unregister([FromBody] AuthUser userModel)
        {
            var userIdFromToken = this.User.GetUserId();
            if (userIdFromToken == null)
                return BadRequest("User is unknown");

            Log.Information($"User removed from our DB: {userModel.Email}" );
            //userRepository.Remove(userModel);
            return Ok();
        }
    }
}
