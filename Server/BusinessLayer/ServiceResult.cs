namespace BusinessLayer
{
    public class ServiceResult
    {
        public ResultTypes ResultType { get; }
        public int? ItemId { get; }

        public ServiceResult(ResultTypes resultType, int? itemId)
        {
            ResultType = resultType;
            ItemId = itemId;
        }
    }
}