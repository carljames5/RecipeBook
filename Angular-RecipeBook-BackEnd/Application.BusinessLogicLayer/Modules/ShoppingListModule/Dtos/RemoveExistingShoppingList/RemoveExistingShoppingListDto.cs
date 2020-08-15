using System.Threading;
using Application.DataAccessLayer.Entities;

namespace Application.BusinessLogicLayer.Modules.ShoppingListModule.Dtos.RemoveExistingShoppingList
{
    public class RemoveExistingShoppingListDto
    {
        public ApplicationUser ApplicationUser { get; }

        public CancellationToken CancellationToken { get; }

        public RemoveExistingShoppingListDto(ApplicationUser applicationUser, CancellationToken cancellationToken)
        {
            ApplicationUser = applicationUser;
            CancellationToken = cancellationToken;
        }
    }
}
