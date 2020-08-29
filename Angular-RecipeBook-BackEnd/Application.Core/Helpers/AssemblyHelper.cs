namespace Application.Core.Helpers
{
    public static class AssemblyHelper<T>
    {
        public static string AssemblyName => typeof(T).Assembly.GetName().Name;
    }
}
