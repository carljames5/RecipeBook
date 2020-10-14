using Application.DataAccessLayer.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Application.DataAccessLayer.Context
{
    public class RecipeBookDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        public RecipeBookDbContext(DbContextOptions options) : base(options)
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

            modelBuilder.Entity<ShoppingList>()
                .HasKey(sl => new { sl.UserId, sl.IngredientId });

            modelBuilder.Entity<ShoppingList>()
                .HasOne(sl => sl.User)
                .WithMany(u => u.ShoppingList)
                .HasForeignKey(sl => sl.UserId);

            modelBuilder.Entity<ShoppingList>()
                .HasOne(sl => sl.Ingredient)
                .WithMany(i => i.ShoppingList)
                .HasForeignKey(sl => sl.IngredientId);

            modelBuilder.Entity<Recipe>()
                .HasIndex(x => x.Name).IsUnique();

            modelBuilder.Entity<Ingredient>()
                .HasIndex(x => x.Name).IsUnique();

            base.OnModelCreating(modelBuilder);
        }

        #region DbSets

        public DbSet<Recipe> Recipe { get; set; }

        public DbSet<Ingredient> Ingredient { get; set; }

        public DbSet<RecipeIngredient> RecipeIngredient { get; set; }

        public DbSet<ShoppingList> ShoppingList { get; set; }

        #endregion
    }
}
