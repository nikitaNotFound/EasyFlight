namespace BusinessLayer
{
    public class AddResult
    {
        public ResultTypes ResultType { get; }
        public int? ItemId { get; }

        public AddResult(ResultTypes resultType, int? itemId)
        {
            ResultType = resultType;
            ItemId = itemId;
        }
    }
}