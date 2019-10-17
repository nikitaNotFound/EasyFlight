using System.Linq;
using System.Text;
using System.Security.Cryptography;

namespace BusinessLayer.Services.Accounts
{
    internal static class HashService
    { 
        internal static byte[] GenerateSalt()
        {
            using RNGCryptoServiceProvider crypto = new RNGCryptoServiceProvider();

            byte[] salt = new byte[20];

            crypto.GetBytes(salt);

            return salt;
        }

        internal static byte[] GenerateHash(string strToHash, byte[] salt = null)
        {
            using SHA512 sha512 = new SHA512Managed();

            if (salt == null)
            {
                salt = GenerateSalt();
            }

            byte[] bytePassword = Encoding.UTF8.GetBytes(strToHash);

            byte[] bytePasswordAndSalt = bytePassword.Concat(salt).ToArray();
            byte[] hashedPasswordAndSalt = sha512.ComputeHash(bytePasswordAndSalt);

            return hashedPasswordAndSalt;
        }
    }
}