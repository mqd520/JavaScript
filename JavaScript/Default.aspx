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
                    el: $("#txt1"),
                    tip: "提示信息1",
                    rules: [
                        {
                            type: mqd.validate.type.required,
                            error: "必填1"
                        },
                        {
                            type: mqd.validate.type.phone,
                            error: "电话格式不正确！"
                        }
                    ]
                },
                {
                    el: $("#txt2"),
                    tip: "提示信息2",
                    rules: [
                        {
                            type: mqd.validate.type.required,
                            error: "必填1"
                        },
                        {
                            type: mqd.validate.type.remote,
                            error: "用户名或密码不正确！",
                            arg: {
                                url: "Handler1.ashx",
                                data: { username: "admin", pwd: "admin" },
                                dataType: "json"
                            }
                        }
                    ]
                },
                {
                    el: $("#txt3"),
                    tip: "提示信息3",
                    rules: [
                        {
                            type: mqd.validate.type.email,
                            error: "邮箱格式不正确！"
                        }
                    ]
                }
            ]);
            $("#btn1").click(function () {
                validator.doValid();
            });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <table>
            <tr>
                <td>字段1:</td>
                <td>
                    <input type="text" id="txt1" /></td>
            </tr>
            <tr>
                <td>字段2:</td>
                <td>
                    <input type="text" id="txt2" /></td>
            </tr>
            <tr>
                <td>字段3:</td>
                <td>
                    <input type="text" id="txt3" /></td>
            </tr>
            <tr>
                <td>字段4:</td>
                <td>
                    <input type="text" id="txt4" /></td>
            </tr>
            <tr>
                <td colspan="2">
                    <input type="button" id="btn1" value="提  交" />
                    <input type="submit" id="sub1" value="提  交" />
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
