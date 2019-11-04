namespace BusinessLayer
{
    public class ServiceAddResult
    {
        public ResultTypes ResultType { get; }
        public int? ItemId { get; }

        public ServiceAddResult(ResultTypes resultType, int? itemId)
        {
            ResultType = resultType;
            ItemId = itemId;
        }
    }
}