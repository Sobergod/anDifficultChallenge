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
            $(this).on("dblclick",'.all-c', function () {
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
            var a1 = $("tr").eq(i).find("td").eq(3).html(sum);
        }
    }
})
// 整理方法
$("#zhengli").click(function () {
    var mTr = $("table tr");
    var val = [];
    for (var i = 1; i < mTr.length; i++) {
        val.push($("tr").eq(i));
    }
})
//打印方法
$("#m_print").click(function () {
    $(".print-hid").hide();
    $("input").addClass("noBorder");
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
    $("input").removeClass("noBorder");
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
})
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
    // console.log(sortArr.sort(NumAscSort));
    domArr.sort(compare('domId'));
    // console.log(domArr[0].tDom);
    // 创建节点插入dom完成排序
    for(var j = 0;j< domArr.length;j++) {
        $("#tbList tbody").before(domArr[j].tDom);
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
    // console.log(sortArr.sort(NumAscSort));
    domArr1.sort(compare('domId1'));
    // console.log(domArr[0].tDom);
    // 创建节点插入dom完成排序
    for(var j1 = 0;j1< domArr1.length;j1++) {
        $("#tbListt tbody").before(domArr1[j1].tDom1);
    }
})
// 对象排序规则
function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}

// 等值合并方法
$("#hebing").click(function() {

})
