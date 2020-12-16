using System;
using System.Net;
using System.Threading.Tasks;
using Application.Core.Exceptions;
using Application.Core.Exceptions.Models;
using Application.Core.Utilities.ContentTypes;
using Application.Core.Utilities.ContentTypes.Enum;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Application.Web.Core.Middlewares
{
    public class ApiExceptionHandlerMiddleware
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        private readonly RequestDelegate _next;

        private readonly ILogger<ApiExceptionHandlerMiddleware> _logger;

        public ApiExceptionHandlerMiddleware(IWebHostEnvironment webHostEnvironment, RequestDelegate next, ILogger<ApiExceptionHandlerMiddleware> logger)
        {
            _webHostEnvironment = webHostEnvironment;
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (RecipeBookException ex)
            {
                _logger.LogWarning(ex, $"Exception Code: {(int)ex.RecipeBookExceptionCode}");

                RecipeBookExceptionModel payload = new RecipeBookExceptionModel(ex, _webHostEnvironment.IsDevelopment());

                await WriteAsJsonAsync(httpContext, HttpStatusCode.BadRequest, payload);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                InternalServerErrorExceptionModel payload = new InternalServerErrorExceptionModel(ex, _webHostEnvironment.IsDevelopment());

                await WriteAsJsonAsync(httpContext, HttpStatusCode.InternalServerError, payload);
            }
        }

        private async Task WriteAsJsonAsync(HttpContext context, HttpStatusCode httpStatusCode, object payload, bool clearResponseBeforeWrite = true)
        {
            if (clearResponseBeforeWrite)
            {
                context.Response.Clear();
            }

            context.Response.StatusCode = (int)httpStatusCode;
            context.Response.ContentType = ContentTypes.GetContentType(ContentType.Json);

            string jsonText = JsonConvert.SerializeObject(payload);

            await context.Response.WriteAsync(jsonText);
        }
    }
}
