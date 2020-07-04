using System;
using System.Threading.Tasks;
using Core.ApplicationCore.Repository;
using Data.DataAccessLayer.Entities.Core;
using Microsoft.EntityFrameworkCore;

namespace Core.ApplicationCore.UnitOfWork
{
    public interface IUnitOfWork<TContext> : IDisposable where TContext : DbContext
    {
        IRepository<TEntity> GetRepository<TEntity>() where TEntity : class, IEntity;

        Task<int> Commit();

        void Rollback();
    }
}
