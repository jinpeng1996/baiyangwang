(function () {

    //随机数
    var ran1 = document.getElementsByClassName("random1")[0];


    var a1 = randomNum();
    ran1.innerHTML = a1;
    yzm = a1;

    var oncli = document.getElementsByClassName("makecode")[0];

    oncli.onclick = function () {
        // console.log(6666);

        var a2 = randomNum();
        ran1.innerHTML = a2;
        yzm = a2;
    }




    var infs = document.querySelectorAll('.inf');
    var ip = document.getElementById("phone");
    var isok1 = false;
    var ipone = ip.value.trim()
    //手机号码
    ip.onblur = function () {
        // console.log(2222);

        //1、非空验证
        var phon = ipone;
        if (phon) {
            //非空
            //2、正则验证  /^1[3-9]\d{9}$/
            var reg = /^1[3-9]\d{9}$/;
            var res = reg.test(phon);
            if (res) {
                //真 验证通过
                //真 验证通过
                infs[0].innerHTML = "通过";
                infs[0].style.color = "#58bc58"
                isok1 = true;

            } else {
                //假：验证失败
                infs[0].innerHTML = '格式不正确';
                infs[0].style.color = 'red';
                isok1 = false;
            }

        } else {
            //空
            infs[0].innerHTML = "请输入手机号码";
            infs[0].style.color = "red"

        }

    }

    //验证码
    var text = document.getElementById("image_captcha");
    var yzm;
    text.onblur = function () {
        console.log(yzm);
        var yzm1 = yzm.toLowerCase()
        var nick = text.value.trim().toLowerCase();
        if (nick) {
            if (nick == yzm1) {
                //真 验证通过
                infs[1].innerHTML = "验证通过";
                infs[1].style.color = "#58bc58"
                isok1 = true;
            } else {
                isok = false;
                infs[1].innerHTML = '请输入正确的验证码';
                infs[1].style.color = "red"
            }

        } else {

            infs[1].innerHTML = "请输入验证码";
            infs[1].style.color = "red"
        }
    }
    // dx
    $('#btn').on('click', function () {
        $.ajax({
            type: "post",
            data: {
                userphone: ipone //换成你的号码即可
            },
            url: "../api/duanxin.php",
            async: true,
            success: function (str) {
                console.log(str);
            }
        });
    });









})();