using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieTime.Web.Helpers;
using MovieTime.Web.Users;
using MovieTime.Web.Users.Models;
using Serilog;

namespace MovieTime.Web.Auth
{
    [Authorize]
    [Route("/Auth")]
    public class AuthController : Controller
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public AuthController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserCreateDto userDto)
        {
            if (userDto == null)
            {
                return BadRequest("User data is missing from body");
            }
            
            if (!ModelState.IsValid)
            {
                return new UnprocessableEntityObjectResult(ModelState);
            }

            Log.Information($"Trying to register the user in the backend.");
            var userIdFromToken = this.User.GetUserId();
            
            if (userIdFromToken == null)
                return BadRequest("User is not authenticated");

            var userModel = _mapper.Map<UserCreateDto, User>(userDto);
            userModel.Id = userIdFromToken;
            
            if (await _userService.AddUser(userModel))
            {
                Log.Information($"Succesfully registered the user.");
                return Ok(new {message = "Succesfully registered the user."});
            }

            Log.Information($"Failed to register the user.");
            return BadRequest(new {message = "Failed to register the user."});
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