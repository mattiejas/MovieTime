using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Movie.Persistance;

namespace MovieTime.Web.Users
{
    public interface IUsersService
    {
        ICollection<UserViewModel> GetAllUsers();
        UserViewModel GetUser(int id);
        bool UpdateUser(UserUpdateDto user);
        bool CreateUser(UserCreateDto user);
    }

    public class UsersService : IUsersService
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IMapper _mapper;
        
        public UsersService(IUsersRepository usersRepository, IMapper mapper)
        {
            _usersRepository = usersRepository;
            _mapper = mapper;
        }
        
        public ICollection<UserViewModel> GetAllUsers()
        {
            var userModels = _usersRepository.GetAllUsers().ToList();
            var userViewModels = _mapper.Map<List<UserModel>, List<UserViewModel>>(userModels);
            return userViewModels;
        }

        public UserViewModel GetUser(int id)
        {
            var userModel = _usersRepository.GetUser(id);
            var userViewModel = _mapper.Map<UserModel, UserViewModel>(userModel);
            return userViewModel;
        }

        public bool UpdateUser(UserUpdateDto user)
        {
            var userModel = _mapper.Map<UserUpdateDto, UserModel>(user); 
            return _usersRepository.UpdateUser(userModel);
        }

        public bool CreateUser(UserCreateDto user)
        {
            var userModel = _mapper.Map<UserCreateDto, UserModel>(user); 
            return _usersRepository.CreateUser(userModel);
        }
    }
}
