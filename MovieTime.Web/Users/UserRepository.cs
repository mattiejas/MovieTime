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
    }
}