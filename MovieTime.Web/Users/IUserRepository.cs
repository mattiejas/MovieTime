﻿using System.Collections.Generic;
using System.Threading.Tasks;
using MovieTime.Web.Movie.Repositories;

namespace MovieTime.Web.Users
{
    public interface IUserRepository : IGenericRepository<User>
    {
//        ICollection<User> GetAllUsers();
//        User GetUser(int id);
//        bool UpdateUser(User user);
//        bool CreateUser(User user);
        Task<int> CountMatches(int id);

    }
}