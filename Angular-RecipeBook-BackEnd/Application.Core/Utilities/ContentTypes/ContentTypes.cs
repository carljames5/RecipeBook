using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Application.Core.Utilities.ContentTypes
{
    public static class ContentTypes
    {
        private static readonly ReadOnlyDictionary<Enum.ContentType, string> ContentTypesDictionary;

        static ContentTypes()
        {
            ContentTypesDictionary = new ReadOnlyDictionary<Enum.ContentType, string>(new Dictionary<Enum.ContentType, string>
            {
                {
                    Enum.ContentType.Json, "application/json"
                }
            });
        }

        public static string GetContentType(Enum.ContentType key)
        {
            ContentTypesDictionary.TryGetValue(key, out string result);

            if (result == null)
            {
                throw new ArgumentNullException(nameof(result), $"The following Content Type does not exist with this key. {nameof(key).ToUpper()}: {key}");
            }

            return result;
        }
    }
}
