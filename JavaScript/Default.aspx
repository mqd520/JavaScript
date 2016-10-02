<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="JavaScript.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <script src="Scripts/jquery-1.8.2.min.js"></script>
    <script src="Scripts/jquery-1.8.2.intellisense.js"></script>
    <link href="Scripts/cnblog/validator.css" rel="stylesheet" />
    <script src="Scripts/cnblog/jQuery.validator.js"></script>
    <script type="text/javascript">
        $('#form1').formValidator();
        $('#ctl00_holderLeft_txt_userName').initValidator({
            readyMsg: '',
            focusMsg: '至少4个字符，最多30个字符',
            validMsg: '输入符合规则',
            msgTarget: 'tip_userName'
        }).addValidator('required', {
            errorMsg: '不可为空'
        }).addValidator('length', {
            min: 4,
            max: 30,
            errorMsg: '不合要求，至少4个字符，最多30个字符'
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <table id="tab1">
            <tr>
                <td>邮箱：</td>
                <td>
                    <input name="ctl00$holderLeft$txt_email" id="ctl00_holderLeft_txt_email" class="input_default" onblur="EmailExist()" type="text" />
                </td>
                <td>
                    <div id="tip_email" class="validation-error">不可为空</div>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>

