using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MovieTime.Web.Database
{
    public abstract class GenericRepository<T> : IGenericRepository<T> where T : class
    {

        protected MovieContext _context;
        private bool disposed;

        public GenericRepository(MovieContext context)
        {
            _context = context;
            disposed = false;
        }

        public virtual async Task<T> Add(T t)
        {
            _context.Set<T>().Add(t);
            await _context.SaveChangesAsync();
            return t;
        }

        public virtual async Task<int> CountAll()
        {
            return await _context.Set<T>().CountAsync();
        }
        
        public virtual async Task<int> Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
            return await _context.SaveChangesAsync();
        }
        
        public virtual async Task<T> Find(Expression<Func<T, bool>> match)
        {
            return await _context.Set<T>().SingleOrDefaultAsync(match);
        }

        public virtual async Task<ICollection<T>> FindAll(Expression<Func<T, bool>> match)
        {
            return await _context.Set<T>().Where(match).ToListAsync();
        }

        public virtual async Task<ICollection<T>> FindBy(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().Where(predicate).ToListAsync();
        }
        
        public virtual async Task<T> Get(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public virtual IQueryable<T> GetDbSet()
        {
            return _context.Set<T>();
        }

        public virtual async Task<ICollection<T>> GetAll()
        {
            return await _context.Set<T>().ToListAsync();
        }
        
        public virtual IQueryable<T> GetAllIncluding(params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> queryable = GetDbSet();
            foreach (Expression<Func<T, object>> includeProperty in includeProperties)
            {
                queryable = queryable.Include<T, object>(includeProperty);
            }

            return queryable;
        }

        public virtual async Task<int> Save()
        {
            return await _context.SaveChangesAsync();
        }

        public virtual async Task<T> Update(T t, object key)
        {
            if (t == null) return null;
            T exist = await _context.Set<T>().FindAsync(key);
            if (exist != null)
            {
                _context.Entry(exist).CurrentValues.SetValues(t);
                await _context.SaveChangesAsync();
            }

            return exist;
        }
        
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }

                this.disposed = true;
            }
        }
    }
}