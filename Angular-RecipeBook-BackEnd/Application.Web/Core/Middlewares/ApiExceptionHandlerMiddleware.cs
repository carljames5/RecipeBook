using System;
using System.Net;
using System.Threading.Tasks;
using Application.Core.Constants;
using Application.Core.Exceptions;
using Application.Core.Exceptions.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;

namespace Application.Web.Core.Middlewares
{
    public class ApiExceptionHandlerMiddleware
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        private readonly RequestDelegate _next;

        public ApiExceptionHandlerMiddleware(IWebHostEnvironment webHostEnvironment, RequestDelegate next)
        {
            _webHostEnvironment = webHostEnvironment ?? throw new ArgumentNullException(nameof(webHostEnvironment));
            _next = next ?? throw new ArgumentNullException(nameof(next));
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (RecipeBookException ex)
            {
                RecipeBookExceptionModel payload = new RecipeBookExceptionModel(ex, _webHostEnvironment.IsDevelopment());

                await WriteAsJsonAsync(httpContext, HttpStatusCode.BadRequest, payload);
            }
            catch (Exception ex)
            {
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
