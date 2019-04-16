var fileArray = [];
var count = 1;


$(document).on('input', 'input', function () {
    //customValidity($(this));
    if ($(this).val() != "") {
        $(this).removeClass("required");
    } else if ($(this).next().next().attr("data-require") == "required") {
        $(this).addClass("required");
    }
    if ($("#password").val() != $("#confirmPwd").val()) {
        document.getElementById("confirmPwd").setCustomValidity('invalid');
    } else {
        document.getElementById("confirmPwd").setCustomValidity(''); //通過驗證
    }
    if ($(this).parent().parent().parent()[0].checkValidity() && !$(this).parent().parent().parent().find("input").hasClass("required")) {
        $(this).parent().parent().parent().find('[type="button"]').attr("disabled", false);
    } else {
        $(this).parent().parent().parent().find('[type="button"]').attr("disabled", true);
    }
});

$(document).on('click', '#done', function (event) {
    event.preventDefault(); //type=submit
    event.stopPropagation(); //type=submit

});
//TODO:信用卡
$(document).on('click', '#brand', function (event) {
    if ($(this).hasClass("fa-cc-visa")) {
        $(this).removeClass("fa-cc-visa").addClass("fa-cc-mastercard");

    } else {
        $(this).removeClass("fa-cc-mastercard").addClass("fa-cc-visa");
        $("#cardnumber").attr("pattern", "^(4[0-9]{12}(?:[0-9]{3})?)*$");
    }
})

$("#cvv").on('input', function () {
    if ($("#cvv").val().length > 3 || ($("#cvv").val().length < 3 && $("#cvv").val().length > 0)) {
        document.getElementById("cvv").setCustomValidity('invalid');
    } else {
        document.getElementById("cvv").setCustomValidity(''); //通過驗證
    }
});


//地址區塊
$("#twzipcode").on('change', function () {
    var val = $(this).find("option:selected").text();
    $("#adrsdetail").val(val);
});
$("#twzipcode").twzipcode({
    zipcodeIntoDistrict: true, // 郵遞區號自動顯示在地區
    css: ["col-6 form-control", "col-6 form-control"], // 自訂 "城市"、"地區" class 名稱 
    countyName: "city", // 自訂城市 select 標籤的 name 值
    districtName: "town" // 自訂地區 select 標籤的 name 值
});
//TODO:
$('#file').change(function (event) {
    fileArray.length = 0;
    $("#profile").html("");
    var files = document.getElementById('file').files;
    // fileArray = Array.prototype.slice.call(files);//無法直接刪除files,須先複製一份array
    if (files.length > 3) {
        $("#warnpic").removeClass("d-none");
        $("#warnpic span").text("EXEED 3 PHOTOS");
        $('#file').val("");
        $("#picBtn").attr("disabled", true);
    } else {
        $("#picBtn").attr("disabled", true);
        $("#warnpic").addClass("d-none");
        for (var i = 0; i < files.length; i++) {
            var index = 0;
            var file = files[i];
            var name = file.name; //檔案名稱
            var type = file.type; //檔案類型
            var size = file.size; //檔案大小
            var reader = new FileReader();
            reader.readAsDataURL(file); //轉換成圖片url
            // reader.readAsText(file,"UTF-8");//轉換成檔案內容文字,預設編碼是UTF-8(word需存成txt檔)
            reader.onload = function (e) {
                var fileContent = e.target.result;
                var image = new Image();
                image.onload = function () { //要在 image.src = 之前cached
                    var width = image.width;
                    var height = image.height;
                    if (width > 800 || height > 800) {
                        $("#warnpic").removeClass("d-none");
                        $("#warnpic span").text(name).append("<p>IS OVER THE MAXIMUM SIZE</p>");
                        // $("#warnpic span").text("ONE FILE IS OVER THE MAXIMUM SIZE");
                    } else {
                        fileArray.push(file);
                        $("#profile").append('<div class="col-4 mr-3 mb-4" data-index=' + index + ' style="background-image:url(' + fileContent + ');"></div>');
                        index++;
                        $("#picBtn").attr("disabled", false);
                    }
                };
                image.src = fileContent;
            };
        }
    }
});

$("#photo").click(function (event) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        $('[type="file"]').click();
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
});

//移除圖片
$(document).on('click', '#profile div', function (event) {
    $(this).remove();
    delete fileArray[parseInt($(this).attr("data-index"))];
});


//TODO:頁面跳轉

$(document).on('click', '[type="button"]', function (event) {
    $("#form" + count.toString()).animate({
        "height": "0"
    }, 500);
    $("#progressbar i").eq(count - 1).attr("class", "fa fa-check-circle");
    // $("#progressbar hr").eq(count-1).css("background-color","#0275D8");
    count++;
    $("#progressbar li").eq(count - 1).addClass("active");
    $("#progressbar i").eq(count - 1).attr("class", "fa fa-dot-circle");
    $("#form" + count.toString()).css("height", "100%");
    // $("#progressbar").append('<li><i class="fa-dot-circle-o"></i></li>');
});

$(function () {
    $("#form1").css("height", "100%");
});