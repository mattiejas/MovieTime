using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MovieTime.Web.Users.Models;

namespace MovieTime.Web.Users
{
    public interface IUserService
    {
        Task<ICollection<UserGetDto>> GetAllUsers();
        Task<User> GetUser(string id);
        Task<bool> UpdateUser(User user);
        Task<bool> AddUser(User user);
        Task<bool> UserExist(string id);
        Task<int> RemoveUser(string id);
    }
}