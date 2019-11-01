namespace BusinessLayer
{
    public class ServiceResult<T>
    {
        public ResultTypes ResultType { get; }
        public T Payload { get; }

        public ServiceResult(ResultTypes resultType, T payload)
        {
            ResultType = resultType;
            Payload = payload;
        }
    }
}