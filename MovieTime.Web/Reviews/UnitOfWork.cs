using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;

namespace MovieTime.Web.Reviews
{
    // Resource: https://codereview.stackexchange.com/questions/175468/c-entity-framework-repository-pattern-unit-of-work-pattern
    public class UnitOfWork : IUnitOfWork
    {
        private bool _disposed;
        public MovieContext MovieContext { get; }


        public UnitOfWork(MovieContext movieContext)
        {
            MovieContext = movieContext;
            _disposed = false;
        }
        
        public void Commit()
        {
            MovieContext.SaveChanges();
        }

        public async Task CommitAsync()
        {
            await MovieContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (_disposed) return;

            if (disposing)
            {
                MovieContext.Dispose();
            }

            _disposed = true;
        }

        ~UnitOfWork()
        {
            Dispose(false);
        }
    }
}