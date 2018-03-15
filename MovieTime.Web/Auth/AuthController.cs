using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis;
using MovieTime.Web.Auth;
using MovieTime.Web.Users;
using MovieTime.Web.Users.Models;
using Serilog;

namespace MovieTime.Web.Controllers
{
    [Authorize]
    [Route("/Auth")]
    public class AuthController : Controller
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService) => _userService = userService;

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserCreateDto userModel)
        {
            if(userModel == null) 
                return BadRequest("User data is missing from body");
            
            Log.Information($"Trying to register the user in the backend.");
            var userIdFromToken = this.User.GetUserId();
            
            if (userIdFromToken == null)
                return BadRequest("User is not authenticated");

            userModel.Id = userIdFromToken;

            if (await _userService.AddUser(userModel))
            {
                Log.Information($"Succesfully registered the user.");
                return Ok(new {message = "Succesfully registered the user."});
            }
            else
            {
                Log.Information($"Failed to register the user.");
                return BadRequest(new {message = "Failed to register the user."});
            }
        }

        [HttpPost("unregister")]
        public async Task<IActionResult> Unregister()
        {
            Log.Information($"Trying to unregister the user in the backend.");
            var userIdFromToken = this.User.GetUserId();
            
            if (userIdFromToken == null)
                return BadRequest("User is unknown");

            if (await _userService.RemoveUser(userIdFromToken) > 0)
            {
                Log.Information($"Succesfully unregistered the user.");
                return Ok(new {message = "Succesfully registered the user."});
            }
            else
            {
                Log.Information($"Failed to unregister the user.");
                return BadRequest(new {message = "Failed to register the user."});
            }
        }
    }
}