using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;

namespace MovieTime.Web.Users
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(MovieContext context) : base(context)
        {
            
        }
        
//        public ICollection<User> GetAllUsers() => _context.Users.ToList();
//        
//        public User GetUser(int id) => _context.Users.FirstOrDefault(user => user.Id == id);
//
//        public bool UpdateUser(User user)
//        {
//            _context.Update(user);
//            return _context.SaveChanges() > 0;
//        }
//
//        public bool CreateUser(User user)
//        {
//            _context.Add(user);
//            return _context.SaveChanges() > 0;
//        }
    }
}