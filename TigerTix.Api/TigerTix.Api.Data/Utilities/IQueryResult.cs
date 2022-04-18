using TigerTix.Api.Data.Enums;

namespace TigerTix.Api.Data.Utilities; 

public interface IQueryResult<T> : IResult<QueryStatus, T> {

    static abstract IQueryResult<T> Success(T? value);

    static abstract IQueryResult<T> Invalid(T? value);

    static abstract IQueryResult<T> NotFound(T? value);

    static abstract IQueryResult<T> Conflict(T value);

    static abstract IQueryResult<T> Forbidden(T value);
    
}