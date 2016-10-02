<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="JavaScript.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="Scripts/jquery-1.8.2.intellisense.js"></script>
    <script src="Scripts/jquery-1.8.2.min.js"></script>
    <script src="Scripts/Mqd_Validate/Mqd.Validate.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var validator = mqd.validate.create([
                {
                    el: $("#txt_mobile"),
                    tip: "提示信息1",
                    rules: [
                        {
                            type: mqd.validate.type.phone,
                            error: "电话格式不正确!"
                        }
                    ]
                },
                {
                    el: $("#txt_phone"),
                    tip: "提示信息2",
                    rules: [
                        {
                            type: mqd.validate.type.required,
                            error: "手机格式不正确!"
                        }
                    ]
                },
                {
                    el: $("#txt_website"),
                    tip: "提示信息3",
                    rules: [
                        {
                            type: mqd.validate.type.email,
                            error: "网址格式不正确！"
                        }
                    ]
                },
                {
                    el: $("#txt_email"),
                    tip: "提示信息4",
                    rules: [
                        {
                            type: mqd.validate.type.email,
                            error: "邮箱格式不正确!"
                        }
                    ]
                },
                {
                    el: $("#txt_required"),
                    tip: "提示信息5",
                    rules: [
                        {
                            type: mqd.validate.type.email,
                            error: "必须输入!"
                        }
                    ]
                }
            ]);
            $("#btn1").click(function () {
                validator.doValid(false);
                if (validator.getValidResult()) {
                    alert("验证通过");
                }
            });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <table>
            <tr>
                <td align="right">电话号码:</td>
                <td>
                    <input type="text" id="txt_mobile" /></td>
            </tr>
            <tr>
                <td align="right">手机:</td>
                <td>
                    <input type="text" id="txt_phone" /></td>
            </tr>
            <tr>
                <td align="right">网站:</td>
                <td>
                    <input type="text" id="txt_website" /></td>
            </tr>
            <tr>
                <td align="right">邮箱:</td>
                <td>
                    <input type="text" id="txt_email" /></td>
            </tr>
            <tr>
                <td align="right">必选:</td>
                <td>
                    <input type="text" id="txt_required" /></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>
                    <input type="button" id="btn1" value="提  交" />
                    <input type="submit" id="sub1" value="提  交" />
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
