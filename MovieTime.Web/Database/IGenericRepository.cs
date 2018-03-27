using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MovieTime.Web.Database
{
    // Resource: https://www.c-sharpcorner.com/article/net-entity-framework-core-generic-async-operations-with-unit-of-work-generic-re/
    public interface IGenericRepository<T> where T : class
    {
        Task<bool> AddIfNotExists(T entity, Expression<Func<T, bool>> match);
        Task<bool> Add(T t);
        Task<int> CountAll();
        Task<int> CountMatch(Expression<Func<T, bool>> match);
        Task<int> Delete(T entity);
        Task<T> Find(Expression<Func<T, bool>> match);
        Task<ICollection<T>> FindAll(Expression<Func<T, bool>> match);
        Task<ICollection<T>> FindBy(Expression<Func<T, bool>> predicate);
        Task<T> Get(int id);
        IQueryable<T> GetDbSet();
        Task<ICollection<T>> GetAll();
        IQueryable<T> GetAllIncluding(params Expression<Func<T, object>>[] includeProperties);
        Task<T> Update(T t, object key);
        Task<int> Save();
        void Dispose();
    }
}