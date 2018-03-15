using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MovieTime.Web.Users.Models;

namespace MovieTime.Web.Users
{
    public interface IUserService
    {
        Task<ICollection<UserGetDto>> GetAllUsers();
        Task<UserGetDto> GetUser(Guid id);
        Task<bool> UpdateUser(UserUpdateDto user);
        Task<bool> AddUser(UserCreateDto user);
        Task<bool> UserExist(Guid id);
        Task<int> RemoveUser(Guid id);
    }
}