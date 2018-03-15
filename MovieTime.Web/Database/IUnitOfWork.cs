using System;
using System.Threading.Tasks;

namespace MovieTime.Web.Database
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