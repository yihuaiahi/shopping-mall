const Hogan=require("hogan.js");

const conf = {
    serverHost: ""
};

const _mm = {
    //网络请求
    request: function (param) {
        const _this = this;
        $.ajax({
            url: param.url || "",
            type: param.method || "get",
            data: param.data || "",
            dataType: param.type || "json",
            success: function (res) {
                //请求成功
                if (0 === res.status) {
                    typeof param.success === "function" && param.success(res.data, res.msg);
                    //没有登录状态，需要强制登录
                } else if (10 === res.status) {
                    _this.doLogin();
                    //请求数据错误
                } else if (1 === res.status) {
                    typeof param.error === "function" && param.success(res.msg);
                }
            },
            error: function (err) {
                typeof param.error === "function" && param.error(err.statusText);
            }
        });
    },
    //获取服务器地址
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam: function (name) {
        //happymmall.com/product/list?keyword=xxx&page=1
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染HTML模板
    renderHtml: function (htmlTemplate,data) {
        let template = Hogan.compile(htmlTemplate);
        let result = template.render(data);
        return result;
    },
    //成功提示
    successTips:function (msg) {
        alert(msg || "操作成功!");
    },
    //错误提示
    errorTips:function (msg) {
        alert(msg || "哪里不对了~");
    },
    //字段的验证，支持非空格、手机、邮箱的判断
    validate:function (value,type) {
        let val=$.trim(value);
        //非空验证
        if ("require"===type){
            return !!val;
        }
        //手机号验证
        if ("phone"===type){
            return /^1\d{10}$/.test(val);
        }
        //邮箱验证
        if ("email"===type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(val);
        }
    },
    //统一登录处理
    doLogin: function () {
        window.location.href = "./login.html?redirect=" + encodeURIComponent(window.location.href);
    },
    goHome:function () {
        window.location.href="./index.html";
    }
};
module.exports = _mm;