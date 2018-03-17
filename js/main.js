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
            $(this).on("click", ".de", function () {
                source.remove();
                for (var k = 0; k < $("table tr").length; k++) {
                    if ($("tr").eq(k).find("td").eq(3).html()) {
                        $("tr").eq(k).find("td").eq(3).html('');
                    }
                }
            })
            source.mouseenter(function () {
                $(this).find(".de").show();
            });
            source.mouseleave(function () {
                $(this).find(".de").hide();
            });
            $(this).append(source);
            if ($(this).next("td").html() != '') {
                $(this).next("td").html('')
            }
        }
    });
});
// 计算方法
$("#m_calculate").click(function () {
    var mTr = $("table tr");
    var val = [];
    for (var i = 1; i < mTr.length; i++) {
        val.push($("tr").eq(i).find("td input").length)
        // console.log(val[i - 1]);
        var sum = 0;
        for (var j = 0; j < val[i - 1]; j++) {
            sum += parseFloat($("tr").eq(i).find("td input").eq(j).val());
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
$("input").fa