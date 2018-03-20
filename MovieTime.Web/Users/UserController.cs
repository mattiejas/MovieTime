using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.KeyVault.Models;
using MovieTime.Web.Auth;
using MovieTime.Web.Users.Models;
using Serilog;

namespace MovieTime.Web.Users
{
    [Route("api/users")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private const string GetUserRoute = "GetUser";

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ICollection<UserGetDto>> GetAllUsers() => await _userService.GetAllUsers();

        [HttpGet("{id}", Name = GetUserRoute)]
        public async Task<IActionResult> GetUser(string id)
        {
            if (string.IsNullOrWhiteSpace(id)) return NotFound(new {message = $"Invalid id: {id}"});
            var model = await _userService.GetUser(id);
            if (model == null) return NotFound(new {message = $"User {id} not found"});
            return Ok(model);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserCreateDto user)
        {
            if (user == null) return BadRequest();

            var userExist = await _userService.UserExist(user.Id);
            if (userExist) return new StatusCodeResult(StatusCodes.Status409Conflict);
            
            var success = await _userService.AddUser(user);
            if (!success)
            {
                // Throw code 500 instead of 4xx because a failure in saving data is a server side issue
                throw new Exception($"Failed to save the user to the database with the id {user.Id}");
            }

            // According to REST principle, it's a good practice to return the created object and
            // the route you have to call to get the same object.
            var userToReturn = _mapper.Map<UserCreateDto, UserGetDto>(user);
            var routeValue = new {id = user.Id};

            return CreatedAtRoute(GetUserRoute, routeValue, userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser([FromBody] UserUpdateDto user)
        {
            if (user == null) return BadRequest();

            var currentUserId = this.User.GetUserId();
            if(user.Id != currentUserId) 
                return NotFound(new {message = $"User {user.Id} not allowed to modify {currentUserId}."});
            
            var userExist = await _userService.UserExist(user.Id);
            if (!userExist) 
                return NotFound(new {message = $"User {user.Id} not found"});

            var success = await _userService.UpdateUser(user);
            if (!success) 
                throw new Exception("Failed to update the user");
            
            // In case no additional information is changed at serverside (like timestamp), don't return the updated object
            return NoContent();
        } 
    }
}