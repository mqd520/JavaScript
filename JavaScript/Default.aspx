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
                    defRuleError: "必须填写电话!",
                    rules: [{
                        type: mqd.validate.type.mobile,
                        error: "电话格式不正确!"
                    }]
                },
                {
                    el: $("#txt_phone"),
                    tip: "提示信息2",
                    defRuleError: "必须填写手机!",
                    rules: [{
                        type: mqd.validate.type.phone,
                        error: "手机格式不正确!"
                    }]
                },
                {
                    el: $("#txt_website"),
                    tip: "提示信息3",
                    defRuleError: "必须填写网址!",
                    rules: [{
                        type: mqd.validate.type.website,
                        error: "网址格式不正确！"
                    }]
                },
                {
                    el: $("#txt_email"),
                    tip: "提示信息4",
                    defRuleError: "必须填写邮箱!",
                    rules: [{
                        type: mqd.validate.type.email,
                        error: "邮箱格式不正确!"
                    }]
                },
                {
                    el: $("#txt_required"),
                    tip: "提示信息5",
                    defRuleError: "必须填写!"
                },
                {
                    el: $("#txt_range"),
                    defRuleError: "必须填写!",
                    tip: "提示信息6",
                    rules: [{
                        type: mqd.validate.type.range,
                        error: "字符范围在3到10之间",
                        arg: "3,10"
                    }]
                },
                {
                    el: $("#txt_equal1"),
                    defRuleError: "必须填写!",
                    tip: "提示信息7",
                    rules: [{
                        type: mqd.validate.type.equal,
                        error: "两次输入不一致!",
                        arg: $("#txt_equal2")
                    }]
                },
                {
                    el: $("#txt_equal2"),
                    defRuleError: "必须填写!",
                    tip: "提示信息8",
                    rules: [{
                        type: mqd.validate.type.equal,
                        error: "两次输入不一致!",
                        arg: $("#txt_equal1")
                    }]
                },
                {
                    el: $("#txt_custom"),
                    defRuleError: "必须填写!",
                    tip: "custom",
                    rules: [{
                        type: mqd.validate.type.custom,
                        error: "自定义规则输入不正确!",
                        arg: new RegExp("^custom$", "gi")
                    }]
                },
                {
                    el: $("#select1"),
                    rules: [{
                        type: mqd.validate.type.select,
                        error: "请选择下拉框!",
                        arg: "0"
                    }]
                },
                {
                    el: $("#txt_postcode"),
                    defRuleError: "必须填写邮编!",
                    tip: "邮编格式",
                    rules: [{
                        type: mqd.validate.type.postcode,
                        error: "邮编格式不正确!"
                    }]
                },
                {
                    el: $("#txt_empty"),
                    tip: "邮编,可不填",
                    rules: [{
                        type: mqd.validate.type.postcode,
                        error: "邮编格式不正确!"
                    }]
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
                <td align="right">网址:</td>
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
                <td align="right">字符范围:</td>
                <td>
                    <input type="text" id="txt_range" /></td>
            </tr>
            <tr>
                <td align="right">相等1:</td>
                <td>
                    <input type="text" id="txt_equal1" /></td>
            </tr>
            <tr>
                <td align="right">相等2:</td>
                <td>
                    <input type="text" id="txt_equal2" /></td>
            </tr>
            <tr>
                <td align="right">自定义:</td>
                <td>
                    <input type="text" id="txt_custom" /></td>
            </tr>
            <tr>
                <td align="right">下拉框:</td>
                <td>
                    <select id="select1">
                        <option value="0">请选择</option>
                        <option value="1">选项一</option>
                        <option value="2">选项二</option>
                    </select></td>
            </tr>
            <tr>
                <td align="right">邮编:</td>
                <td>
                    <input type="text" id="txt_postcode" /></td>
            </tr>
            <tr>
                <td align="right">可为空:</td>
                <td>
                    <input type="text" id="txt_empty" /></td>
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
