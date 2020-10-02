using System.Collections.ObjectModel;

namespace Application.Core.Constants
{
    public static class CorsConstants
    {
        public static ReadOnlyCollection<string> SPECIFIED_ORIGINS { get; } =
            new ReadOnlyCollection<string>(new[] { "http://localhost:4200" }
        );
    }
}
