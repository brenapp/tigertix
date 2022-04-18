namespace TigerTix.Api.Data.Utilities; 

public class Result<T, U> : IResult<T, U> {
    
    public T Status { get; }
    
    public U? Value { get; }

    public Result(T status, U value) {
        Status = status;
        Value = value;
    }
}