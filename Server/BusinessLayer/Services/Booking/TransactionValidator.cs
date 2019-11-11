namespace BusinessLayer.Services.Booking
{
    public static class TransactionValidator
    {
        public static bool CheckTransaction(string transaction)
        {
            if (transaction == "transaction")
            {
                return true;
            }

            return false;
        }
    }
}