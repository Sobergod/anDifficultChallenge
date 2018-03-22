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
$(".queding").click(function () {
    if ($("#tSelect").val() != -1) {
        $("#bd").hide();
        $("#ten").text($("#tSelect").val());
    }
});
// 检测input数值方法
$("table tbody tr").find("td:eq(1)").on("blur", "input", function () {
    var dataArr = new Array(6, 8, 10, 12, 14, 16, 18, 20, 22, 25);
    var comVal = parseInt($(this).val());
    if (comVal == 10) {
        // $("#bd").show();
    }
    if (contains(dataArr, comVal)) {
    } else {
        $(this).val("");
    }
})
function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}
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
    domArr.sort(compare('domId'));
    // 创建节点插入dom完成排序
    for (var j = 0; j < domArr.length; j++) {
        $("#tbList tbody").prepend(domArr[j].tDom);
    }
    // 排表2
    var sortArr2 = [];
    var domArr2 = [];
    for (var i2 = 1; i2 <= 20; i2++) {
        var a12 = $("#tbListt tr").eq(i2).children("td").eq(1).find("input").val();
        var aDom2 = $("#tbListt tr").eq(i2);
        if (a12) {
            var sortDom2 = {};
            sortDom2.domId2 = a12;
            sortDom2.tDom2 = aDom2;
            domArr2.push(sortDom2);
        }
    }
    domArr2.sort(compare('domId2')).reverse();
    // 创建节点插入dom完成排序
    for (var j1 = 0; j1 < domArr2.length; j1++) {
        $("#tbListt tbody").prepend(domArr2[j1].tDom2);
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
            sortDom.total = 0;
            sortDom.allLen = 0;
            sortDom.fanWeight = 0;
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
                var ten = prompt("输入10的重量");
                sortDom.weight = parseFloat(ten);
            } else if (sortDom.domId == 8) {
                sortDom.weight = 0.45;
            } else if (sortDom.domId == 6) {
                sortDom.weight = 0.4;
            }
            domArr.push(sortDom);
        }
    }
    domArr.sort(compare('domId'));
    // 合并算法
    for (var i = 0; i < domArr.length; i++) {
        var isFind = false;
        for (var j = 0; j < resArr.length; j++) {
            // 比较方法先比较直径和图片相同的话继续下一步
            var domURL = domArr[i].tDom.find("img").attr("src");
            var resURL = resArr[j].tDom.find("img").attr("src");
            if (domArr[i].domId === resArr[j].domId && domURL !== undefined && resURL !== undefined && domURL === resURL) {
                // 比较所有的input值
                var inpLen = domArr[i].tDom.children("td").eq(2).find("input").length;
                var temp = 0;
                if (inpLen) {
                    for (var k = 0; k < inpLen; k++) {
                        var tdInpVal = domArr[i].tDom.children("td").eq(2).find("input").eq(k).val()
                        var tdResInpVal = resArr[j].tDom.children("td").eq(2).find("input").eq(k).val()
                        if (tdInpVal && tdInpVal === tdResInpVal) {
                            temp++;
                        }
                    }
                }
                if (temp === inpLen) {
                    resArr[j].allSum += parseInt(domArr[i].allSum);
                    domArr[i].allSum = 0;
                    domArr[i].tDom.children("td").eq(4).find("input").val(0);
                    domArr[i].tDom.children("td").eq(2).children().hide();
                    domArr[i].tDom.children("td").eq(3).children().hide();
                    // domArr[].tDom.children()
                    isFind = true;
                    break;
                }
            }
        }
        if (!isFind) {
            resArr.push(domArr[i]);
        }
    }
    // 开一个新的数组存最后结果
    var result = [];
    // 开一个对象存相似值
    for (var la = 0; la < resArr.length; la++) {
        var lastFind = false;
        for (var j = 0; j < result.length; j++) {
            if (resArr[la].domId === result[j].domId) {
                // 做处理 todo 把allSum相加
                // result[j].total = result[j].allSum + resArr[la].allSum;
                // result[j].allLen = parseFloat(result[j].tDom.find("td").eq(3).html()) + parseFloat(resArr[la].tDom.find("td").eq(3).html());
                // result[j].count += resArr[i].count;
                result[j].fanWeight += result[j].weight * resArr[la].allSum * parseFloat(resArr[la].tDom.find("td").eq(3).html())
                lastFind = true;
                break;
            }
        }
        if (!lastFind) {
            resArr[la].total = resArr[la].allSum;
            resArr[la].allLen = parseFloat(resArr[la].tDom.find("td").eq(3).html());
            resArr[la].fanWeight = resArr[la].weight * resArr[la].total * resArr[la].allLen;
            result.push(resArr[la]);
        }
    }
    // console.log(result);
    // 重新渲染
    // $("#tbList tbody td").html("");
    $("#tbList tbody tr").remove();
    var temp = $("#tbList tbody tr").eq(0).children("td").eq(1).find("input").val();
    for (var ii = 0; ii < resArr.length; ii++) {
        var a = resArr[ii].tDom.children("td").eq(4).find("input").val(resArr[ii].allSum);
        $("#tbList tbody").append(resArr[ii].tDom);
    }
    for (var jj = resArr.length + 1; jj <= 20 + result.length; jj++) {
        $("#tbList tbody").append("<tr><td class=''>" + jj + "</td><td></td><td></td><td></td><td></td></tr>")
    }
    var tt = 0;
    var p = 0;
    var resTr = $("#tbList tbody");
    console.log(result);
    for (var ll = 0; ll < result.length; ll++) {
        for (var kk = p; kk < resTr.find("tr").length; kk++) {
            if (result[ll].domId != parseInt($("#tbList tbody tr").eq(kk).children("td").eq("1").find("input").val())) {
                $("#tbList tbody tr").eq(kk).before("<tr><td colspan='4'> 直径" + result[ll].domId + "总重量为" + Math.round(result[ll].fanWeight * 100) / 100 + "公斤</td></tr>");
                p++;
                break;
            } else {
                p++;
            }
        }
    }
    // 排表2
    var sortArr2 = [];
    var domArr2 = [];
    var resArr2 = [];
    for (var i2 = 1; i2 <= 20; i2++) {
        var a12 = $("#tbListt tr").eq(i2).children("td").eq(1).find("input").val();
        var aDom2 = $("#tbListt tr").eq(i2);
        if (a12) {
            var sortDom2 = {};
            sortDom2.domId2 = a12;
            sortDom2.tDom2 = aDom2;
            sortDom2.total2 = 0;
            sortDom2.allLen2 = 0;
            sortDom2.fanWeight2 = 0;
            sortDom2.allSum2 = parseInt($("#tbListt tr").eq(i2).children("td").eq(4).find("input").val());
            if (sortDom2.domId2 == 25) {
                sortDom2.weight2 = 3.86;
            } else if (sortDom2.domId2 == 22) {
                sortDom2.weight2 = 2.99;
            } else if (sortDom2.domId2 == 20) {
                sortDom2.weight2 = 2.47;
            } else if (sortDom2.domId2 == 18) {
                sortDom2.weight2 = 2;
            } else if (sortDom2.domId2 == 16) {
                sortDom2.weight2 = 1.58;
            } else if (sortDom2.domId2 == 14) {
                sortDom2.weight2 = 1.21;
            } else if (sortDom2.domId2 == 12) {
                sortDom2.weight2 = 0.888;
            } else if (sortDom2.domId2 == 10) {
                var ten2 = prompt("输入10的重量");
                sortDom2.weight2 = parseFloat(ten2);
            } else if (sortDom2.domId2 == 8) {
                sortDom2.weight2 = 0.45;
                // 特殊处理
            } else if (sortDom2.domId2 == 6) {
                sortDom2.weight2 = 0.4;
            }
            domArr2.push(sortDom2);
        }
    }
    domArr2.sort(compare('domId2'));
    // 合并算法
    for (var i2 = 0; i2 < domArr2.length; i2++) {
        var isFind2 = false;
        for (var j2 = 0; j2 < resArr2.length; j2++) {
            // 比较方法先比较直径和图片相同的话继续下一步
            var domURL2 = domArr2[i2].tDom2.find("img").attr("src");
            var resURL2 = resArr2[j2].tDom2.find("img").attr("src");
            if (domArr2[i2].domId2 === resArr2[j2].domId2 && domURL2 !== undefined && resURL2 !== undefined && domURL2 === resURL2) {
                // 比较所有的input值
                var inpLen2 = domArr2[i2].tDom2.children("td").eq(2).find("input").length;
                var temp2 = 0;
                if (inpLen2) {
                    for (var k2 = 0; k2 < inpLen2; k++) {
                        var tdInpVal2 = domArr2[i2].tDom2.children("td").eq(2).find("input").eq(k2).val()
                        var tdResInpVal2 = resArr2[j2].tDom2.children("td").eq(2).find("input").eq(k2).val()
                        if (tdInpVal2 && tdInpVal2 === tdResInpVal2) {
                            temp2++;
                        }
                    }
                }
                if (temp2 === inpLen2) {
                    resArr2[j2].allSum2 += parseInt(domArr2[i2].allSum2);
                    domArr2[i2].allSum2 = 0;
                    domArr2[i2].tDom2.children("td").eq(4).find("input").val(0);
                    domArr2[i2].tDom2.children("td").eq(2).children().hide();
                    domArr2[i2].tDom2.children("td").eq(3).children().hide();
                    // domArr[].tDom.children()
                    isFind2 = true;
                    break;
                }
            }
        }
        if (!isFind2) {
            resArr2.push(domArr2[i2]);
        }
    }
    // 开一个新的数组存最后结果
    var result2 = [];
    // 开一个对象存相似值
    for (var la2 = 0; la2 < resArr2.length; la2++) {
        var lastFind2 = false;
        for (var j2 = 0; j2 < result2.length; j2++) {
            if (resArr2[la2].domId2 === result2[j2].domId2) {
                // 做处理 todo 把allSum相加
                // result[j].total = result[j].allSum + resArr[la].allSum;
                // result[j].allLen = parseFloat(result[j].tDom.find("td").eq(3).html()) + parseFloat(resArr[la].tDom.find("td").eq(3).html());
                // result[j].count += resArr[i].count;
                result2[j2].fanWeight2 += result2[j2].weight2 * resArr2[la2].allSum2 * parseFloat(resArr2[la2].tDom2.find("td").eq(3).html())
                lastFind2 = true;
                break;
            }
        }
        if (!lastFind2) {
            resArr2[la2].total2 = resArr2[la2].allSum2;
            resArr2[la2].allLen2 = parseFloat(resArr2[la2].tDom2.find("td").eq(3).html());
            resArr2[la2].fanWeight2 = resArr2[la2].weight2 * resArr2[la2].total2 * resArr2[la2].allLen2;
            result2.push(resArr2[la2]);
        }
    }
    // console.log(result);
    // 重新渲染
    // $("#tbList tbody td").html("");
    $("#tbListt tbody tr").remove();
    var temp2 = $("#tbListt tbody tr").eq(0).children("td").eq(1).find("input").val();
    for (var ii2 = 0; ii2 < resArr2.length; ii2++) {
        var a2 = resArr2[ii2].tDom2.children("td").eq(4).find("input").val(resArr2[ii2].allSum2);
        $("#tbListt tbody").append(resArr2[ii2].tDom2);
    }
    for (var jj2 = resArr2.length + 1; jj2 <= 20 + result2.length; jj2++) {
        $("#tbListt tbody").append("<tr><td class=''>" + jj2 + "</td><td></td><td></td><td></td><td></td></tr>")
    }
    var tt2 = 0;
    var p2 = 0;
    var resTr2 = $("#tbListt tbody");
    console.log(result2);
    for (var ll2 = 0; ll2 < result2.length; ll2++) {
        for (var kk2 = p2; kk2 < resTr2.find("tr").length; kk2++) {
            if (result2[ll2].domId2 != parseInt($("#tbListt tbody tr").eq(kk2).children("td").eq("1").find("input").val())) {
                $("#tbListt tbody tr").eq(kk2).before("<tr><td colspan='4'> 直径" + result2[ll2].domId2 + "总重量为" + Math.round(result2[ll2].fanWeight2 * 100) / 100 + "公斤</td></tr>");
                p2++;
                break;
            } else {
                p2++;
            }
        }
    }

})
// 对象排序规则
function compare(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
    }
}


