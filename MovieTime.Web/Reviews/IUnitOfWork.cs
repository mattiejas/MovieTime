using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;

namespace MovieTime.Web.Reviews
{
    public interface IUnitOfWork : IDisposable
    {
        // Gets the database context.
        MovieContext MovieContext { get; }
        
        // Commits the changes to the database.
        void Commit();
        
        // Asynchronously commits changes to database.
        Task CommitAsync();
    }
}