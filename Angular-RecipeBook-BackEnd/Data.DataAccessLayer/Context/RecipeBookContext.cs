using Data.DataAccessLayer.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Data.DataAccessLayer.Context
{
    public class RecipeBookContext : IdentityDbContext<RecipeBookAppUser, RecipeBookAppRole, string>
    {
        public RecipeBookContext(DbContextOptions options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RecipeIngredient>()
                .HasKey(ri => new { ri.RecipeId, ri.IngredientId });

            modelBuilder.Entity<RecipeIngredient>()
                .HasOne(ri => ri.Recipe)
                .WithMany(r => r.RecipeIngredients)
                .HasForeignKey(ri => ri.RecipeId);

            modelBuilder.Entity<RecipeIngredient>()
                .HasOne(ri => ri.Ingredient)
                .WithMany(i => i.RecipeIngredients)
                .HasForeignKey(ri => ri.IngredientId);

            base.OnModelCreating(modelBuilder);
        }

        #region DbSets

        public DbSet<Recipe> Recipe { get; set; }

        public DbSet<Ingredient> Ingredient { get; set; }

        public DbSet<RecipeIngredient> RecipeIngredient { get; set; }

        #endregion
    }
}
