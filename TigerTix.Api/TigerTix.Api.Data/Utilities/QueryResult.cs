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

    public static IQueryResult<T> NotFound() => new QueryResult<T>(QueryStatus.NotFound);

    public static IQueryResult<T> Conflict() => new QueryResult<T>(QueryStatus.Conflict);

    public static IQueryResult<T> Forbidden() => new QueryResult<T>(QueryStatus.Forbidden);
    
}