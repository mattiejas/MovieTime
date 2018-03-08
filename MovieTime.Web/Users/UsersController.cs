using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace MovieTime.Web.Users
{
    public class UsersController : Controller
    {
        private readonly IUsersService _usersService;
        
        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [Route("api/[controller]")]
        public ICollection<UserViewModel> GetAllUsers() => _usersService.GetAllUsers();

        [Route("api/[controller]/{id}")]
        public UserViewModel GetUser(int id) => _usersService.GetUser(id);

        [HttpPost]
        [Route("api/[controller]")]
        public void CreateUser(UserCreateDto user) => _usersService.CreateUser(user);

        [HttpPut]
        [Route("api/[controller]")]
        public void UpdateUser(UserUpdateDto user) => _usersService.UpdateUser(user);
    }
}
