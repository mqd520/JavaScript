﻿(function ($) {

    if (window.mqd === undefined) {
        /// <field name="mqd" type="Object">mqd命名空间</field>
        window.mqd = {};
    }

    /// <field name="validate" type="Object">validate命名空间</field>
    mqd.validate = {};

    // 规则类型
    var _ruleType = {
        /// <field name="required" type="Number">必填</field>
        required: 1,

        /// <field name="email" type="Number">邮箱</field>
        email: 2,

        /// <field name="phone" type="Number">电话</field>
        phone: 3,

        /// <field name="phone" type="Number">手机</field>
        mobile: 4,

        /// <field name="remote" type="Number">远程数据</field>
        remote: 5,

        /// <field name="website" type="Number">网站</field>
        website: 6,

        /// <field name="postcode" type="Number">邮编</field>
        postcode: 7,

        /// <field name="custom" type="Number">自定义</field>
        custom: 100
    };

    // 消息类型
    var _mesType = {
        /// <field name="None" type="Number">无</field>
        none: 1,

        /// <field name="tip" type="Number">提示信息</field>
        tip: 2,

        /// <field name="error" type="Number">错误信息</field>
        error: 3,

        /// <field name="ok" type="Number">完成</field>
        ok: 4,

        /// <field name="loading" type="Number">正在加载</field>
        loading: 5
    };


    function isStringNull(str) {
        /// <summary>判断字符串是否为空</summary>
        /// <param name="str" type="String">字符串</param>
        /// <returns type="Bool" />
        if (str == "" || str == null || str == undefined) {
            return true;
        }
        return false;
    }

    function MessageBox(el) {
        /// <summary>消息框对象</summary>
        /// <param name="el" type="Object">需要验证的$对象</param>

        var that = this;
        // 消息框jQuery对象
        that.box = null;

        function getIcon(type) {
            /// <summary>显示信息</summary>
            /// <param name="type" type="Number">信息类型,_mesType</param>
            /// <returns type="String" />
            var icon = "";
            switch (type) {
                case _mesType.tip:
                    icon = "tip.gif";
                    break;
                case _mesType.error:
                    icon = "error.gif";
                    break;
                case _mesType.ok:
                    icon = "ok.gif";
                    break;
                case _mesType.loading:
                    icon = "loading.gif";
                    break;
                default:
            }
            return icon;
        }

        function getVirtualPath() {
            /// <summary>获取当前插件的虚拟路径</summary>
            /// <returns type="String" />
            var scripts = document.getElementsByTagName("script");
            var path = "";
            for (var i = 0; i < scripts.length; i++) {
                var src = $(scripts[i]).attr("src");
                if (src != undefined) {
                    var index = src.indexOf("Mqd.Validate.js");
                    //alert(index);
                    if (index > -1) {
                        path = src.substring(0, index);
                        break;
                    }
                }
            }
            //alert(path);
            return path;
        }

        function setMesBoxStyle() {
            /// <summary>设置消息框样式</summary>
            that.box.css({
                margin: "0px",
                padding: "0px",
                position: "absolute",
                zIndex: "9901",
                display: "none",
                border: "0px solid red",
                width: "300px",
                height: "22px"
            });
            that.box.find("div.Mqd_Validate_InfoIcon").eq(0).css({
                "margin": "0px",
                "padding": "0px",
                "display": "block",
                "float": "left",
                "border": "0px solid red",
                "width": "22px",
                "height": "22px",
                "background-repeat": "no-repeat",
                "background-position": "center"
            });
            that.box.find("div.Mqd_Validate_InfoHtml").eq(0).css({
                "margin": "0px",
                "padding": "0px",
                "display": "block",
                "float": "left",
                "border": "0px solid red",
                "width": "265px",
                "height": "22px",
                "line-height": "22px",
                "font-size": "12px",
                "over-flow": "hidden",
                "padding-left": "2px",
                "font-family": "微软雅黑"
            });
        }

        function setMesBoxPos() {
            /// <summary>设置消息框位置</summary>
            var left = el.offset().left + el.width() + 10;
            var top = el.offset().top;
            that.box.css({
                "left": "" + left + "px",
                "top": "" + top + "px"
            });
        }

        function init(el) {
            /// <summary>初始化</summary>
            /// <param name="el" type="Object">需要验证的$对象</param>
            var html = "";
            html += '<div class="Mqd_Validate_InfoBox">';
            html += "   <div class='Mqd_Validate_InfoIcon'></div>";
            html += "   <div class='Mqd_Validate_InfoHtml'></div>";
            html += "</div>";
            that.box = $(html);
            setMesBoxStyle();
            setMesBoxPos();
            $("body").eq(0).append(that.box);
        }
        init(el);

        that.show = function (mes, type) {
            /// <summary>显示信息窗口</summary>
            /// <param name="mes" type="String">要显示的消息</param>
            /// <param name="type" type="Number">信息类型,_mesType</param>
            var icon = getIcon(type);
            if (!isStringNull(icon)) {
                var url = getVirtualPath() + icon;
                that.box.find("div.Mqd_Validate_InfoIcon").eq(0).css({
                    "background-image": "url(" + url + ")",
                    "display": "block"
                });
            } else {
                that.box.find("div.Mqd_Validate_InfoIcon").eq(0).css({
                    "display": "none"
                });
            }
            if (type == _mesType.ok) {
                that.box.find("div.Mqd_Validate_InfoHtml").eq(0).hide();
            } else {
                that.box.find("div.Mqd_Validate_InfoHtml").eq(0).html(mes).show();
            }
            that.box.show();
        };

        that.hide = function () {
            /// <summary>隐藏消息框</summary>
            /// <returns type="MessageBox" />
            that.box.hide();
            return that;
        }
    }

    function Validator(list) {
        /// <summary>验证器对象</summary>
        /// <param name="list" type="Object">验证元素集合</param>

        var that = this;

        function isInput(el) {
            /// <summary>判断是否是文本框</summary>
            /// <param name="el" type="Object">需要验证的$对象</param>
            /// <returns type="Bool" />
            if (el.attr("type").toLowerCase() == "text") {
                return true;
            }
            return false;
        }

        function validRule(rule, el, box) {
            /// <summary>验证规则</summary>
            /// <param name="rule" type="Number">规则数据</param>
            /// <param name="el" type="Number">验证元素对象</param>
            /// <param name="box" type="Number">消息框对象</param>
            var result = false;
            var val = el.val().trim();
            var exp;
            switch (rule.type) {
                case _ruleType.required:
                    if (!isStringNull(val)) {
                        result = true;
                    } else {
                        result = false;
                    }
                    break;
                case _ruleType.mobile:
                    exp = /^1[3|4|5|8][0-9]\d{8}$/gi;
                    result = exp.test(val);
                    break;
                case _ruleType.phone:
                    exp = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/gi;
                    result = exp.test(val);
                    break;
                case _ruleType.email:
                    exp = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/gi;
                    result = exp.test(val);
                    break;
                case _ruleType.website:
                    var pattern = "^((https|http|ftp|rtsp|mms)?://)"
                                    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@  
                                    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184  
                                    + "|" // 允许IP和DOMAIN（域名） 
                                    + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.  
                                    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名  
                                    + "[a-z]{2,6})" // first level domain- .com or .museum  
                                    + "(:[0-9]{1,4})?" // 端口- :80  
                                    + "((/?)|" // a slash isn't required if there is no file name  
                                    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
                    exp = new RegExp(pattern);
                    result = reg.test(val);
                    break;
                case _ruleType.remote:
                    rule.arg.data[rule.arg.para] = val;
                    rule.arg.async = false;
                    if (rule.arg.fn != null) {
                        rule.arg.success = function (e) {
                            result = rule.arg.fn.call(this, e);
                        };
                    }
                    box.show("", _mesType.loading);
                    $.ajax(rule.arg);
                    box.hide();
                    break;
            }
            if (rule.fn != null) {
                result = rule.fn.call(this);
            }
            //alert(result);
            return result;
        }

        function doValidateItem(item) {
            /// <summary>验证一条验证元素</summary>
            /// <param name="item" type="Object">验证数据</param>
            var result = false;
            for (var i = 0; i < item.rules.length; i++) {
                result = validRule(item.rules[i], item.el, item.box);
                //alert(item.el.attr("id") + ".rule." + (i + 1) + ".result = " + result);
                if (!result) {
                    break;
                }
            }
            //alert(item.el.attr("id") + ".result = " + result);
            item.result = result;
            if (result) {
                item.box.show("", _mesType.ok);
            } else {
                item.box.show(item.rules[i].error, _mesType.error);
            }
        }

        function init(list) {
            /// <summary>初始化</summary>
            /// <param name="list" type="Array">验证数据</param>
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                item.box = new MessageBox(item.el);
                item.result = false;
                if (isInput(item.el)) {
                    item.el.bind("focus", i, function (e) {
                        if (!isStringNull(list[e.data].tip)) {
                            list[e.data].box.show(list[e.data].tip, _mesType.tip);
                        }
                    });
                    item.el.bind("blur", i, function (e) {
                        doValidateItem(list[e.data]);
                    });
                }
            }
        }
        init(list);

        that.doValid = function (force) {
            /// <summary>开始验证</summary>
            /// <param name="force" type="Bool">是否全部验证,false只验证已经验证失败的元素</param>
            /// <returns type="Validator" />
            for (var i = 0; i < list.length; i++) {
                if (force || (force == false &&
                    (list[i].result == undefined || (list[i].result != undefined && list[i].result == false)))) {
                    doValidateItem(list[i]);
                }
            }
            return that;
        };

        that.getValidResult = function () {
            /// <summary>获取验证结果</summary>
            /// <returns type="Bool" />
            var result = false;
            for (var i = 0; i < list.length; i++) {
                result = list[i].result;
                if (!result) {
                    break;
                }
            }
            return result;
        };
    }

    mqd.validate = {
        /// <field name="type" type="Number">验证类型</field>
        type: _ruleType,

        create: function (list) {
            /// <summary>创建一个验证器对象</summary>
            /// <param name="list" type="list">验证对象数据集合</param>
            /// <returns type="Validator" />
            return new Validator($.extend([], list));
        }
    };

})(jQuery);