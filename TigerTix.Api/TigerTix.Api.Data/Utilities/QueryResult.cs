using TigerTix.Api.Data.Enums;

namespace TigerTix.Api.Data.Utilities; 

public class QueryResult<T> : IQueryResult<T> {
    
    public QueryStatus Status { get; }
    
    public T? Value { get; }

    public QueryResult(QueryStatus status) {
        Status = status;
    }

    public QueryResult(QueryStatus status, T? value) {
        Status = status;
        Value = value;
    }

    public static IQueryResult<T> Success(T? value) => new QueryResult<T>(QueryStatus.Success, value);

    public static IQueryResult<T> Invalid(T? value) => new QueryResult<T>(QueryStatus.Invalid, value);

    public static IQueryResult<T> NotFound(T? value) => new QueryResult<T>(QueryStatus.NotFound, value);

    public static IQueryResult<T> Conflict(T value) => new QueryResult<T>(QueryStatus.Conflict, value);

    public static IQueryResult<T> Forbidden(T value) => new QueryResult<T>(QueryStatus.Forbidden, value);
    
}