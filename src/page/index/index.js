require("page/common/nav/index.js");
require("page/common/nav-simple/index.js");
require("page/common/header/index.js");
const navSide = require("page/common/nav-side/index.js");
const _mm=require("util/mm.js");

navSide.init({
    name:"user-center"
});
/*
_mm.request({
    url:"http://happymmall.com/product/list.do?keyword=1",
    success:function (res) {
        console.log(res)
    },
    error:function (res) {
        console.log(res);
    }
});
*/

/*console.log(_mm.getUrlParam("test"));

let html ="<div>{{data}}</div>";
let data={
    data:123
};
console.log(_mm.renderHtml(html,data));*/
