using System;
using System.Linq;
using Application.DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.DataAccessLayer.Context
{
    public class RecipeBookReadOnlyDbContext
    {
        private readonly RecipeBookDbContext _context;

        public RecipeBookReadOnlyDbContext(RecipeBookDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public IQueryable<ApplicationUser> Users => _context.Users.AsNoTracking();

        public IQueryable<ApplicationRole> Roles => _context.Roles.AsNoTracking();

        public IQueryable<Ingredient> Ingredients => _context.Ingredient.AsNoTracking();

        public IQueryable<Recipe> Recipes => _context.Recipe.AsNoTracking();

        public IQueryable<ShoppingList> ShoppingLists => _context.ShoppingList.AsNoTracking();
    }
}
