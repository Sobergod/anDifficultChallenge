//在页面加载完之后加载jquery
$().ready(function (e) {
    //拖拽复制体
    $('div[id^="draggable"]').draggable({
        helper: "clone",
        cursor: "move"
    });
    //释放后
    $('td[id^="target"]').droppable({
        drop: function (event, ui) {
            $(this).children().remove();
            $(this).find('div[id^="draggable"]').css("width", "100px");
            var source = ui.draggable.clone();
            $(this).on("dblclick", '.all-c', function () {
                source.remove();
                // console.log($(this).parent().next().html());
                $(this).parent().next().html("");
                // for (var k = 0; k < $("table tr").length; k++) {
                //     if ($("tr").eq(k).find("td").eq(3).html()) {
                //         $("tr").eq(k).find("td").eq(3).html('');
                //     }
                // }
            })
            source.mouseenter(function () {
                // $(this).find(".de").show();
            });
            source.mouseleave(function () {
                // $(this).find(".de").hide();
            });
            $(this).append(source);
            if ($(this).next("td").html() != '') {
                $(this).next("td").html('')
            }
        }
    });
});
// 计算开料长度方法
$("#m_calculate").click(function () {
    var mTr = $("table tr");
    var val = [];
    for (var i = 1; i < mTr.length; i++) {
        val.push($("tr").eq(i).find("td").eq(2).find("input").length)
        // console.log(val[i - 1]);
        var sum = 0;
        for (var j = 0; j < val[i - 1]; j++) {
            sum += parseFloat($("tr").eq(i).find("td").eq(2).find("input").eq(j).val());
            // 解决浮点数问题
            var a1 = $("tr").eq(i).find("td").eq(3).html(Math.round(sum * 100) / 100);
        }
    }

})
//打印方法
$("#m_print").click(function () {
    $(".print-hid").hide();
    $("tr input").css("border", "none");
    window.print();
})
// 显示添加图片弹层
$("#showPic").click(function () {
    var choosePic = $(".choosePic");
    if (choosePic.is(':hidden')) {
        choosePic.fadeIn();
    } else {
        choosePic.fadeOut();
    }
})
$("#showAll").mouseenter(function () {
    if ($(".print-hid").is(":hidden")) {
        $(".print-hid").fadeIn();
    }
    $("tr td:nth-child(3) input").css("border-bottom", "1px solid red");
})
// input放大方法
$("input[class^='c']").focus(function () {
    // console.log($(this).parent().html());
    // $(this).parent("all-c").css({"width":"100px","height":"50px","background-color":"#FFFFFF","font-size":"12px"}).removeClass(".all-c input")
    $(this).addClass("long");
})
$("input[class^='c']").blur(function () {
    $(this).removeClass("long");
    // $(this).css({"width":"40px","height":"7px","background-color":"transparent"})
});
// 表格排序方法
$("#paixu").click(function () {
    // 排表1
    var sortArr = [];
    var domArr = [];
    for (var i = 1; i <= 20; i++) {
        var a1 = $("#tbList tr").eq(i).children("td").eq(1).find("input").val();
        var aDom = $("#tbList tr").eq(i);
        if (a1) {
            var sortDom = {};
            sortDom.domId = a1;
            sortDom.tDom = aDom;
            domArr.push(sortDom);
        }
    }
    domArr.sort(compare('domId')).reverse();
    // 创建节点插入dom完成排序
    for (var j = 0; j < domArr.length; j++) {
        $("#tbList tbody").prepend(domArr[j].tDom);
    }
    // 排表2
    var sortArr1 = [];
    var domArr1 = [];
    for (var i1 = 1; i1 <= 20; i1++) {
        var a11 = $("#tbListt tr").eq(i1).children("td").eq(1).find("input").val();
        var aDom1 = $("#tbListt tr").eq(i1);
        if (a11) {
            var sortDom1 = {};
            sortDom1.domId1 = a11;
            sortDom1.tDom1 = aDom1;
            domArr1.push(sortDom1);
        }
    }
    domArr1.sort(compare('domId1')).reverse();
    // 创建节点插入dom完成排序
    for (var j1 = 0; j1 < domArr1.length; j1++) {
        $("#tbListt tbody").prepend(domArr1[j1].tDom1);
    }
})
// 等值合并方法 先排序再合并
$("#hebing").click(function () {
    // 排表1
    var sortArr = [];
    var domArr = [];
    var resArr = [];
    for (var i = 1; i <= 20; i++) {
        var a1 = $("#tbList tr").eq(i).children("td").eq(1).find("input").val();
        var aDom = $("#tbList tr").eq(i);
        if (a1) {
            var sortDom = {};
            sortDom.domId = a1;
            sortDom.tDom = aDom;
            sortDom.allSum = parseInt($("#tbList tr").eq(i).children("td").eq(4).find("input").val()); 
            if (sortDom.domId == 25) {
                sortDom.weight = 3.86;
            } else if (sortDom.domId == 22) {
                sortDom.weight = 2.99;
            } else if (sortDom.domId == 20) {
                sortDom.weight = 2.47;
            } else if (sortDom.domId == 18) {
                sortDom.weight = 2;
            } else if (sortDom.domId == 16) {
                sortDom.weight = 1.58;
            } else if (sortDom.domId == 14) {
                sortDom.weight = 1.21;
            } else if (sortDom.domId == 12) {
                sortDom.weight = 0.888;
            } else if (sortDom.domId == 10) {
                // alert(1);
                // 特殊处理
            } else if (sortDom.domId == 8) {
                // 特殊处理
            } else if (sortDom.domId == 6) {
                sortDom.weight = 0.4;
            }
            domArr.push(sortDom);
        }
    }
    domArr.sort(compare('domId'));
    var sum = 0;
    for (var i = 0; i < domArr.length; i++) {
        var isFind = false;
        for (var j = 0; j < resArr.length; j++) {
            // 比较方法先比较直径和图片相同的话继续下一步
            var domURL = domArr[i].tDom.find("img").attr("src");
            var resURL = resArr[j].tDom.find("img").attr("src");
            if (domArr[i].domId === resArr[j].domId && domURL!==undefined && resURL!==undefined && domURL === resURL) {
                // 比较所有的input值
                var inpLen = domArr[i].tDom.children("td").eq(2).find("input").length;
                var temp = 0;
                if(inpLen) {
                    for(var k = 0; k < inpLen;k++) {
                        if(domArr[i].tDom.children("td").eq(2).find("input").eq(k).val() === 
                           resArr[j].tDom.children("td").eq(2).find("input").eq(k).val()) {
                               temp++;
                           }
                    }
                }
                if(temp === inpLen) {
                    resArr[j].allSum += parseInt(domArr[i].tDom.children("td").eq(4).find("input").val());
                    console.log(domArr[i].tDom.children("td").eq(4).find("input").val());
                    isFind = true;
                    break;
                }
            }
        }
        if (!isFind){
            resArr.push(domArr[i]);
        }
    }
    console.log(resArr);

})
// 对象排序规则
function compare(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
    }
}


