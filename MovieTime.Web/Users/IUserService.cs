using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieTime.Web.Users
{
    public interface IUserService
    {
        Task<ICollection<UserDto>> GetAllUsers();
        Task<UserDto> GetUser(int id);
        Task<bool> UpdateUser(UserUpdateDto user);
        Task<bool> CreateUser(UserCreateDto user);
        Task<bool> UserExist(int id);
    }
}