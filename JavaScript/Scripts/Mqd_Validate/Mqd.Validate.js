(function ($) {

    if (window.mqd === undefined) {
        /// <field name="mqd" type="Object">mqd命名空间</field>
        window.mqd = {};
    }

    /// <field name="validate" type="Object">validate命名空间</field>
    // validate命名空间
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

        /// <field name="range" type="Number">字符数范围</field>
        range: 8,

        /// <field name="equal" type="Number">相等</field>
        equal: 9,

        /// <field name="select" type="Number">下拉框</field>
        select: 10,

        /// <field name="date" type="Number">日期</field>
        date: 11,

        /// <field name="time" type="Number">时间</field>
        time: 12,

        /// <field name="datetime" type="Number">日期和时间</field>
        datetime: 13,

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

    function isInput(el) {
        /// <summary>判断是否是文本框</summary>
        /// <param name="el" type="Object">需要验证的$对象</param>
        /// <returns type="Bool" />
        if (el.prop("tagName").toLowerCase() == "input" && el.prop("type").toLowerCase() == "text") {
            return true;
        }
        return false;
    }

    function isSelect(el) {
        /// <summary>判断是否是下拉框</summary>
        /// <param name="el" type="Object">需要验证的$对象</param>
        /// <returns type="Bool" />
        if (el.prop("tagName").toLowerCase() == "select") {
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

        function getItem(el) {
            /// <summary>获取指定验证元素关联的验证数据</summary>
            /// <param name="el" type="Object">验证元素</param>
            /// <returns type="Object" />
            var obj = null;
            for (var i = 0; i < list.length; i++) {
                if (list[i].el.is(el)) {
                    obj = list[i];
                    break;
                }
            }
            return obj;
        }

        function validRule(rule, el, box) {
            /// <summary>验证规则</summary>
            /// <param name="rule" type="Number">规则数据</param>
            /// <param name="el" type="Number">验证元素对象</param>
            /// <param name="box" type="Number">消息框对象</param>
            /// <returns type="Bool" />
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
                case _ruleType.phone:
                    exp = /^1[3|4|5|8][0-9]\d{8}$/gi;
                    result = exp.test(val);
                    break;
                case _ruleType.mobile:
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
                    result = exp.test(val);
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
                case _ruleType.range:
                    exp = new RegExp("^.{" + rule.arg + "}$", "gi");
                    result = (exp).test(val);
                    break;
                case _ruleType.equal:
                    result = val == rule.arg.val().trim();
                    break;
                case _ruleType.custom:
                    var flags = "";
                    if (rule.arg.global) {
                        flags += "g";
                    }
                    if (rule.arg.ignoreCase) {
                        flags += "i";
                    }
                    if (rule.arg.multiline) {
                        flags += "m";
                    }
                    exp = new RegExp(rule.arg.source, flags);
                    result = exp.test(val);
                    break;
                case _ruleType.select:
                    result = val != rule.arg;
                    break;
                case _ruleType.postcode:
                    exp = /^[0-9]{5,6}$/gi;
                    result = exp.test(val);
                    break;
                case _ruleType.date:
                    exp = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/gi;
                    result = exp.test(val);
                    break;
                case _ruleType.time:
                    exp = /^(0\d{1}|1\d{1}|2[0-3]):[0-5]\d{1}:([0-5]\d{1})$/gi;
                    result = exp.test(val);
                    break;
                case _ruleType.datetime:
                    exp = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))\s(0\d{1}|1\d{1}|2[0-3]):[0-5]\d{1}:([0-5]\d{1})$/gi;
                    result = exp.test(val);
                    break;
            }
            if (rule.fn != null) {
                result = rule.fn.call(this);
            }
            //alert(result);
            return result;
        }

        function isExistRuleType(rules, type) {
            /// <summary>是否存在指定规则类型</summary>
            /// <param name="item" type="Object">验证数据</param>
            /// <returns type="Bool" />
            var exist = false;
            for (var i = 0; i < rules.length; i++) {
                if (rules[i].type == type) {
                    exist = true;
                    break;
                }
            }
            return exist;
        }

        function doValidateItem(item) {
            /// <summary>验证一条验证元素</summary>
            /// <param name="item" type="Object">验证数据</param>
            var val = item.el.val().trim();
            var existType = isExistRuleType(item.rules, _ruleType.required);
            if (!existType && val == "") {
                item.result = true;
                item.box.hide();
                return;//如果不包括必选规则且元素值为空就跳过验证
            }
            var result = false;
            var equalIndex = -1;//是否包含相等规则
            for (var i = 0; i < item.rules.length; i++) {
                result = validRule(item.rules[i], item.el, item.box);
                //alert(item.el.attr("id") + ".rule." + (i + 1) + ".result = " + result);
                if (item.rules[i].type == _ruleType.equal) {
                    equalIndex = i;
                }
                if (!result) {
                    break;
                }
            }
            //alert(item.el.attr("id") + ".result = " + result);
            item.result = result;
            if (item.result && equalIndex > -1) {
                var obj = getItem(item.rules[equalIndex].arg);//获取关联数据
                //alert(obj);
                obj.result = true;
                obj.box.show("", _mesType.ok);
            }
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
                } else if (isSelect(item.el)) {
                    item.el.bind("change", i, function (e) {
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

        that.setValidResult = function (el, result, error) {
            /// <summary>设置验证结果</summary>
            /// <param name="el" type="Object">验证元素</param>
            /// <param name="result" type="Bool">是否验证通过</param>
            /// <param name="error" type="String">错误信息</param>
            /// <returns type="Validator" />
            var item = getItem(el);
            item.result = result;
            if (result) {
                item.box.show("", _mesType.ok);
            } else {
                item.box.show(error, _mesType.error);
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
            var li = $.extend([], list);
            for (var i = 0; i < li.length; i++) {
                if (li[i].rules == undefined) {
                    li[i].rules = [];
                }
                if (isInput(list[i].el) && li[i].defRuleError != undefined) {
                    li[i].rules.splice(0, 0, {
                        type: _ruleType.required,
                        error: li[i].defRuleError
                    });
                }
            }
            return new Validator(li);
        }
    };

})(jQuery);