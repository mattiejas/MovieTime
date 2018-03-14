using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Movie.Persistance;

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
        
        public async Task<ICollection<UserDto>> GetAllUsers()
        {
            ICollection<User> user = await _userRepository.GetAll();
            var userDto = _mapper.Map<ICollection<User>, List<UserDto>>(user);
            return userDto;
        }

        public async Task<UserDto> GetUser(int id)
        {
            var user = await _userRepository.Get(id);
            var userDto = _mapper.Map<User, UserDto>(user);
            return userDto;
        }

        public async Task<bool> UpdateUser(UserUpdateDto userDto)
        {
            var user = _mapper.Map<UserUpdateDto, User>(userDto);
            var storedUser = await _userRepository.Update(user, user.Id);

            return storedUser != null;
        }

        public async Task<bool> CreateUser(UserCreateDto userDto)
        {
            var user = _mapper.Map<UserCreateDto, User>(userDto);
            var createdUser = await _userRepository.Add(user);
            return createdUser != null;
        }

        public async Task<bool> UserExist(int id)
        {
            var countMatches = await _userRepository.CountMatches(id);
            return countMatches == 1;
        }
    }
}
