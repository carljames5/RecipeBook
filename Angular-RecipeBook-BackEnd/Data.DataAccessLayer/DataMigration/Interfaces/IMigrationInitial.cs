using Data.DataAccessLayer.Context;

namespace Data.DataAccessLayer.DataMigration.Interfaces
{
    public interface IMigrationInitial
    {
        void Seed(RecipeBookContext context);
    }
}
