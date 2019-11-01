namespace BusinessLayer
{
    public class ServiceResult<T>
    {
        public T Payload { get; set; }
        public ResultTypes ResultType { get; set; }
    }
}