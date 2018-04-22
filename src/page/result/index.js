require("./index.css");
require("page/common/nav-simple/index.js");
const _mm=require("util/mm.js");

$(function () {
    let type=_mm.getUrlParam("type") || "default";
    let $element=$("."+type+"-success");
    $element.show();
});
