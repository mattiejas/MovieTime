using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MovieTime.Web.Movie.Repositories
{
    // Resource: https://www.c-sharpcorner.com/article/net-entity-framework-core-generic-async-operations-with-unit-of-work-generic-re/
    public interface IGenericRepository<T> where T : class
    {
        T Add(T t);
        Task<T> AddAsync(T t);
        
        int Count();
        Task<int> CountAsync();
        
        void Delete(T entity);
        Task<int> DeleteAsync(T entity);
        
        T Find(Expression<Func<T, bool>> match);
        Task<T> FindAsync(Expression<Func<T, bool>> match);
        
        ICollection<T> FindAll(Expression<Func<T, bool>> match); // delegates
        Task<ICollection<T>> FindAllAsync(Expression<Func<T, bool>> match);
        
        IQueryable<T> FindBy(Expression<Func<T, bool>> predicate);
        Task<ICollection<T>> FindByAsync(Expression<Func<T, bool>> predicate);
        
        T Get(int id);
        Task<T> GetAsync(int id);
        
        IQueryable<T> GetAll();
        Task<ICollection<T>> GetAllAsync();
        IQueryable<T> GetAllIncluding(params Expression<Func<T, object>>[] includeProperties);
        
        T Update(T t, object key);
        Task<T> UpdateAsync(T t, object key);
        
        void Save();
        Task<int> SaveAsync();
        
        void Dispose();
    }
}