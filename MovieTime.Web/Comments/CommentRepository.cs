using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Comments.Models;
using MovieTime.Web.Database;

namespace MovieTime.Web.Comments {
    public interface ICommentRepository : IGenericRepository<Comment>
    {
    }

    public class CommentRepository : GenericRepository<Comment>, ICommentRepository
    {
        public CommentRepository(MovieContext context) : base(context)
        {
        }
                
        public override async Task<ICollection<Comment>> FindAll(Expression<Func<Comment, bool>> match)
        {
            return await _context.Comments.Include(x => x.Movie).Include(x => x.User).Where(match).ToListAsync();
        }
    }
}