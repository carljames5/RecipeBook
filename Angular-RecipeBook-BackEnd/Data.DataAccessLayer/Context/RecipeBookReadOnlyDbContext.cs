using System;
using System.Linq;
using Data.DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.DataAccessLayer.Context
{
    public class RecipeBookReadOnlyDbContext
    {
        private readonly RecipeBookContext _context;

        public RecipeBookReadOnlyDbContext(RecipeBookContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public IQueryable<ApplicationUser> Users => _context.Users.AsNoTracking();

        public IQueryable<ApplicationRole> Roles => _context.Roles.AsNoTracking();

        public IQueryable<Ingredient> Ingredients => _context.Ingredient.AsNoTracking();

        public IQueryable<Recipe> Recipes => _context.Recipe.AsNoTracking();
    }
}
