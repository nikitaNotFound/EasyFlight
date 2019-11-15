using BusinessLayer;

namespace BusinessLogicTests
{
    public class UserInfoMock : IUserInfo
    {
        public int AccountId { get; }


        public UserInfoMock(int accountId)
        {
            AccountId = accountId;
        }
    }
}