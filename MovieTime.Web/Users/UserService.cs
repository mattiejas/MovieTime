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

        public async Task<UserGetDto> GetUser(Guid id)
        {
            var user = await _userRepository.Find(x => x.Id == id);
            var userDto = _mapper.Map<User, UserGetDto>(user);
            return userDto;
        }

        public async Task<bool> UpdateUser(UserUpdateDto userDto)
        {
            var user = _mapper.Map<UserUpdateDto, User>(userDto);
            var storedUser = await _userRepository.Update(user, user.Id);

            return storedUser != null;
        }

        public async Task<bool> AddUser(UserCreateDto userDto)
        {
            var user = _mapper.Map<UserCreateDto, User>(userDto);
            var createdUser = await _userRepository.Add(user);
            return createdUser != null;
        }

        public async Task<bool> UserExist(Guid id)
        {
            var countMatches = await _userRepository.CountMatch(x => x.Id == id);
            return countMatches > 0;
        }

        public async Task<int> RemoveUser(Guid id)
        {
            var user = await _userRepository.Find(x => x.Id == id);
            var result = await _userRepository.Delete(user);

            return result;
        }
    }
}
