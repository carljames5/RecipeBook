using System.Collections.Generic;
using System.Collections.ObjectModel;
using Application.Core.AppSettingsConfiguration.Enums;

namespace Application.Core.AppSettingsConfiguration.Constants
{
    public static class ConfigurationConstants
    {
        public static ReadOnlyDictionary<ConfigurationType, string> CONFIGURATIONS { get; } =
            new ReadOnlyDictionary<ConfigurationType, string>(new Dictionary<ConfigurationType, string>
            {
                {
                    ConfigurationType.CorsConfiguration, "CorsConfiguration"
                },
            });
    }
}
