namespace WebAPI
{
    internal class ErrorInfo
    {
        public string Message { get; set; }

        public ErrorInfo(string message)
        {
            Message = message;
        }
    }
}