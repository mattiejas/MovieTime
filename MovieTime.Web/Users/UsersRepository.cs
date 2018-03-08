using System;
using System.Collections.Generic;
using System.Linq;
using MovieTime.Web.Movie.Persistance;

namespace MovieTime.Web.Users
{
    public interface IUsersRepository
    {
        ICollection<UserModel> GetAllUsers();
        UserModel GetUser(int id);
        bool UpdateUser(UserModel user);
        bool CreateUser(UserModel user);
    }

    public class UsersRepository : IUsersRepository
    {
        private readonly MovieContext _context;

        public UsersRepository(MovieContext context)
        {
            _context = context;
        }

        public ICollection<UserModel> GetAllUsers() => _context.Users.ToList();
        public UserModel GetUser(int id) => _context.Users.FirstOrDefault(user => user.Id == id);

        public bool UpdateUser(UserModel user)
        {
            _context.Update(user);
            return _context.SaveChanges() > 0;
        }

        public bool CreateUser(UserModel user)
        {
            _context.Add(user);
            return _context.SaveChanges() > 0;
        }
    }
}