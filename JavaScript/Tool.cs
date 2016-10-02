using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Mqd.SqlHelper;
using System.Configuration;
using System.Data;
using System.Data.Common;

namespace JavaScript
{
    public class Tool
    {
        private static readonly Db _db = new Db();

        /// <summary>
        /// 是否存在指定用户名
        /// </summary>
        /// <param name="username">用户名</param>
        /// <returns></returns>
        public static bool IsExistUsername(string username)
        {
            DataTable dt = _db.GetTable("select count(*) from [customers] where [customerID]=@customerID", new DbParameter[] { 
                _db.CreateParameter("@customerID",value:username)
            });
            if (dt.Rows[0][0].ToString() == "0")
            {
                return false;
            }
            return true;
        }
    }
}