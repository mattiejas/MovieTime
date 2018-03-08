using Microsoft.AspNetCore.Mvc;

namespace MovieTime.Web.Users
{
    public class UsersController : Controller
    {
        [Route("api/[controller]")]
        public string Get()
        {
            return "All users and do some pagination";
        }

        [Route("api/[controller]/{id}")]
        public UserViewModel GetUser(int id)
        {
            if (id == 1)
            {
                return new UserViewModel
                {
                    Email = "peterp@outlook.com",
                    FirstName = "Peter",
                    LastName = "Parker"
                };
            }

            return new UserViewModel
            {
                Email = "eddieb@outlook.com",
                FirstName = "Eddie",
                LastName = "Brock"
            };
        }
    }
}