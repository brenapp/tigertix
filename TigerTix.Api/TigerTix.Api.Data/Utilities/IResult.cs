namespace TigerTix.Api.Data.Utilities; 

public interface IResult<T, U> {
    
    T Status { get; }
    
    U? Value { get; }
    
}