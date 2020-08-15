using MediatR;

namespace Core.ApplicationCore.Interfaces
{
    public interface IQuery<out TResult> : IRequest<TResult>
    { }
}
