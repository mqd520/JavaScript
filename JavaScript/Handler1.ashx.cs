using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Mqd.SqlHelper;
using Newtonsoft;
using Newtonsoft.Json;

namespace JavaScript
{
    /// <summary>
    /// Handler1 的摘要说明
    /// </summary>
    public class Handler1 : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string action = context.Request["action"];
            if (!string.IsNullOrEmpty(action))
            {
                switch (action)
                {
                    case "IsExistUsername":
                        IsExistUsername(context);
                        break;
                    default:
                        break;
                }
            }
        }

        private void IsExistUsername(HttpContext context)
        {
            bool result = Tool.IsExistUsername(context.Request["username"]);
            string json = JsonConvert.SerializeObject(new { exist = result });
            context.Response.Write(json);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}