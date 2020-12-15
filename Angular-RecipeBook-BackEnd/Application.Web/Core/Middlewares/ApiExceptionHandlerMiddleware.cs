using System;
using System.Net;
using System.Threading.Tasks;
using Application.Core.Constants;
using Application.Core.Exceptions;
using Application.Core.Exceptions.Models;
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
            _webHostEnvironment = webHostEnvironment ?? throw new ArgumentNullException(nameof(webHostEnvironment));
            _next = next ?? throw new ArgumentNullException(nameof(next));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
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
            context.Response.ContentType = ContentTypeConstants.APPLICATION_JSON;

            string jsonText = JsonConvert.SerializeObject(payload);

            await context.Response.WriteAsync(jsonText);
        }
    }
}
