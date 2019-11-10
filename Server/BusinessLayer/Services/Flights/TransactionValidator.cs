namespace BusinessLayer.Services.Flights
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