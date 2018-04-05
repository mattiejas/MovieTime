using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Users.Models;

namespace MovieTime.Web.Users
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        
        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        
        public async Task<ICollection<UserGetDto>> GetAllUsers()
        {
            ICollection<User> user = await _userRepository.GetAll();
            var userDto = _mapper.Map<ICollection<User>, List<UserGetDto>>(user);
            return userDto;
        }

        public async Task<User> GetUser(string id)
        {
            var user = await _userRepository.Find(x => x.Id == id);
            return user;
        }

        public async Task<bool> UpdateUser(User user)
        {
            var storedUser = await _userRepository.Update(user, user.Id);

            return storedUser != null;
        }

        public async Task<bool> AddUser(User user)
        {
            var userIsCreated = await _userRepository.Add(user);
            return userIsCreated;
        }

        public async Task<bool> UserExist(string id)
        {
            var countMatches = await _userRepository.CountMatch(x => x.Id == id);
            return countMatches > 0;
        }

        public async Task<int> RemoveUser(string id)
        {
            var user = await _userRepository.Find(x => x.Id == id);
            var result = await _userRepository.Delete(user);

            return result;
        }
    }
}
