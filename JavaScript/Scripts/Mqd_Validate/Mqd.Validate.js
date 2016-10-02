(function ($) {

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

        /// <field name="custom" type="Number">自定义</field>
        custom: 100
    };


    var _options = {
        /// <field name="tipMsg" type="String">提示信息</field>
        tipMsg: "",

        /// <field name="tipMsg" type="String">错误信息</field>
        errMsg: ""
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
        ok: 4
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
        /// <field name="box" type="Object">消息框$对象</field>
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
                margin: "0px",
                padding: "0px",
                display: "block",
                float: "left",
                border: "0px solid red",
                width: "22px",
                height: "22px"
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
                "font-size": "13px",
                "over-flow": "hidden",
                "padding-left": "5px"
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

        function vailRule(rule, el) {
            /// <summary>验证规则</summary>
            /// <param name="type" type="Number">规则类型</param>
            var val = el.val().trim();
            var exp;
            switch (rule.type) {
                case _ruleType.required:
                    if (!isStringNull(val)) {
                        return true;
                    }
                    return false;
                    break;
                case _ruleType.email:
                    exp = /^\w{1,8}$/gi;
                    return exp.test(val);
                    break;
                case _ruleType.remote:
                    var result = false;
                    $.ajax({
                        async: false,
                        url: rule.arg.url,
                        data: rule.arg.data,
                        dataType: rule.arg.dataType,
                        success: function (e) {
                            alert(e.success);
                            if (e.success) {
                                result = true;
                            }
                        }
                    });
                    return result;
                    break;
                default:
                    return false;
            }
        }

        function doValidateItem(item) {
            var result = false;
            for (var i = 0; i < item.rules.length; i++) {
                result = vailRule(item.rules[i], item.el);
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
                var box = new MessageBox(item.el);
                item.box = box;
                if (isInput(item.el)) {
                    //item.el.bind("focus", i, function (e) {
                    //    if (!isStringNull(list[e.data].tip)) {
                    //        list[e.data].box.show(list[e.data].tip, _mesType.tip);
                    //    }
                    //});
                    //item.el.bind("blur", i, function (e) {
                    //    doValidateItem(list[e.data]);
                    //});
                }
            }
        }
        init(list);

        that.doValid = function () {
            /// <signature>
            /// <param name="el" type="Object">$对象</param>
            /// <returns type="validator" />
            /// </signature>
            /// <signature>
            /// <returns type="validator" />
            /// </signature>
            if (arguments.length == 0) {
                for (var i = 0; i < list.length; i++) {
                    doValidateItem(list[i]);
                }
            } else {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].el.attr("id") == arguments[0].attr("id")) {
                        doValidateItem(list[i]);
                        break;
                    }
                }
            }
            return that;
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