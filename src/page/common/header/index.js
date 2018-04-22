require("./index.css");
const _mm=require("util/mm.js");
// 通用页面头部
const header={
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        let keyword=_mm.getUrlParam("keyword");
        //keyword存在，则回填输入框
        if (keyword){
            $("#search-input").val(keyword);
        }
    },
    bindEvent: function () {
        let _this=this;
        //点击索搜按钮以后，做索搜提交
        $("#search-btn").click(function () {
            _this.searchSubmit();
        });
        //输入回车后，做搜素提交
        $("#search-input").keyup(function (e) {
            if (e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    //搜索的提交
    searchSubmit: function () {
        let keyword=$.trim($("#search-input").val());
        //如果提交的时候有keyword，正常跳转到list页
        if (keyword){
            window.location.href="./list.html?keyword=" + keyword;
            console.log(keyword);
        }else{ //如果keyword为空，直接返回首页
            _mm.goHome();
        }
    }
};

header.init();