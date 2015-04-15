using Abp.Domain.Entities;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;

namespace MsTrials.EntityFramework.Repositories
{
    public abstract class MsTrialsRepositoryBase<TEntity, TPrimaryKey> : EfRepositoryBase<MsTrialsDbContext, TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        protected MsTrialsRepositoryBase(IDbContextProvider<MsTrialsDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        //add common methods for all repositories
    }

    public abstract class MsTrialsRepositoryBase<TEntity> : MsTrialsRepositoryBase<TEntity, int>
        where TEntity : class, IEntity<int>
    {
        protected MsTrialsRepositoryBase(IDbContextProvider<MsTrialsDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        //do not add any method here, add to the class above (since this inherits it)
    }
}
