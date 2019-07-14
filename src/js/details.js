(function () {

    // (function () {
    //     $('#head').load('heade.html'); //ajax，需要用环境打开

    //     $('#foode').load('footer.html'); //footer
    //     $('#bro').load('broad.html'); //侧边


    // })();
    // var imgdag = document.getElementsByClassName("small-img");
    // var clearfix = document.getElementsByClassName("clearfix")[0];
    // console.log(clearfix);

    var information = "";
    var url = location.href; //完整的url
    var url = location.search; //?id=001&name=iphone7 plugs&imgurl=img/ip7.jpg&price=5899&sale=5888&color=土豪金
    // console.log(decodeURI(url));
    var res = strToObj(decodeURI(url));

    // 获取id
    var id = res.id;

    function init() {

        // console.log(id);
        ajax2({
            type: 'get',
            url: '../api/details.php',
            data: 'id=' + id,
            success: str => {
                // console.log(str);
                let arr = JSON.parse(str); //将字符串转成对象  [{},{},{}]

                // console.log(arr);
                information = arr
                //img 的url
                var result = arr[0].imgurl.split("&");

                var html = '';
                for (var i = 0; i < result.length; i++) {
                    // console.log(result[i]);


                    html += `
                        <li class="active">
                        <div class="small-img">
                            <img src="../imgs/details/${result[i]}">
                            
                        </div>
                    </li> 
                    `;


                }
                // console.log(html);
                $('.clearfix').html(html);
                // clearfix.innerHTML = html;

                // comment: "7"
                // id: "9"
                // imgurl: "ia_10010.jpg&ia_10011.jpg"
                // marketprice: "559.3"
                // more: "14"
                // name: "【4盒送陶瓷刀具】迪巧 维D钙咀嚼片122片钙片 孕妇 哺乳期 成人 中老年补钙 无糖 防治骨质疏松"
                // price: "4144"



                // 信息的替换
                let h2val = document.getElementsByClassName("ncs-goods-h2")[0];
                let costprice = document.getElementsByClassName("cost-price")[0];
                let price = document.getElementsByClassName("price")[0];
                let rate = document.getElementsByClassName("rate")[0];


                h2val.innerHTML = arr[0].name
                costprice.innerHTML = `¥${arr[0].price}`
                price.innerHTML = `¥${arr[0].marketprice}`
                rate.innerHTML = `共有 ${arr[0].more } 条评价`


            }
        });

    }

    init();


    //购物车 添加信息到后台
    // address: null
    // comment: "17"
    // id: "21"
    // imgurl: "ia_10011.jpg&ia_10013.jpg&ia_10010.jpg&ia_10014.jpg"
    // marketprice: "435.7"
    // more: "27"
    // name: "【4盒送陶瓷刀具】迪巧 维D钙咀嚼片126片钙片 孕妇 哺乳期 成人 中老年补钙 无糖 防治骨质疏松"
    // price: "10769"

    // var addcabuycartrt = document.getElementById("buycart")[0];

    $("#buycart").on('click', () => {
        // console.log(999999999999999);

        ajax2({
            type: 'get',
            url: '../api/details1.php',
            data: 'id=' + id,
            success: str => {
                // console.log(232326666663);
                alert("添加成功")



            }

        });

    });
    // buycart.onclick = function () {

    //     console.log(information);
    // ajax2({
    //     type: 'get',
    //     url: '../api/details.php',
    //     data: 'id=' + id,






    // });








    // 放大镜
    function zoom() {

        var magnifierConfig = {
            magnifier: "#magnifier1", //最外层的大容器
            width: 360, //承载容器宽
            height: 360, //承载容器高
            moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
            zoom: 5 //缩放比例
        };

        var _magnifier = magnifier(magnifierConfig);




    };
    zoom();

    function gotop() {
        var box = document.getElementById('gotop');


        //点击回到顶部可以快速回到顶部
        box.onclick = function () {
            // window.scrollTo(0, 0); //快速回到顶部

            //点击缓慢回到顶部
            var scrollTop = window.setInterval(function () {
                //pageYOffset获取窗口离上面的距离
                // console.log(window.pageYOffset+':'+scrollTop);
                var pop = window.pageYOffset;
                if (pop > 0) {
                    window.scrollTo(0, pop - 20);
                } else {
                    window.clearInterval(scrollTop);
                }
            }, 1);



        }

    }
    gotop();


    // $('.search').kuCity();
    // console.log($('.search'));




    // 数量的加减
    function buynumber() {

        // console.log(6666666666);

        $('#cart').on('click', '.addnum', function () {
            // console.log(6666666666);
            //点击加号：数量增1
            let num = $("#quantity").val()
            let kucun = $("#quantity").data('num');
            num++;
            if (num >= kucun) {
                num = kucun;
            }
            // $(this).prev().val(num)
            $("#quantity").val(num)
            // console.log(num);

            // console.log(num,kuncun);
            // goodTotal($(this)); //把点击当前的那个按钮传到函数，通过节点的关系查找其他节点
        });

        //数量的减
        $('#cart').on('click', '.nownum', function () {

            let num = $("#quantity").val()
            let kucun = $("#quantity").data('num');
            num--;
            if (num <= 1) {
                num = 1;
            }
            $("#quantity").val(num)
            // goodTotal($(this));
        });

        // 手动输入数量的变化
        $('#cart').on('input', '.input-text', function () {
            let num = $(this).val();
            let kucun = $(this).data('num');
            if (num <= 1) {
                num = 1;
            } else if (num >= kucun) {
                num = kucun;
            }
            $(this).val(num);
            // goodTotal($(this)); //小计变化
        });

    };

    buynumber();


    function tab() {
        var ul = document.getElementById("categorymenu");
        var li = ul.getElementsByTagName("li")
        var aa = ul.getElementsByTagName("a")
        // console.log(aa);

        var div = document.getElementsByClassName("tabdiv");

        for (var b = 0; b < li.length; b++) {
            li[b].index = b;
            li[b].onclick = function () {

                // console.log(li[this.index].children.className);

                // 排他思想
                for (var a = 0; a < li.length; a++) {
                    div[a].style.display = 'none';

                }
                div[this.index].style.display = 'block'


            }
            for (var i = 0; i < li.length; i++) {
                aa[i].index = i;
                aa[i].onclick = function () {
                    // 排他思想
                    for (var j = 0; j < li.length; j++) {
                        aa[j].className = "";
                    }
                    aa[this.index].className = "acti"
                }
            }
        }
    };
    tab();

    function commenttab() {
        var ul = document.getElementById("comment_tab");
        var li = ul.getElementsByTagName("li")
        for (var b = 0; b < li.length; b++) {
            li[b].index = b;
            li[b].onclick = function () {

                // 排他思想
                for (var j = 0; j < li.length; j++) {
                    li[j].className = "";
                }
                li[this.index].className = "current"
            }
        }
    };

    commenttab();



})();

function consultingtab() {
    var ul = document.getElementById("consulting_tab");
    var li = ul.getElementsByTagName("li")
    for (var b = 0; b < li.length; b++) {
        li[b].index = b;
        li[b].onclick = function () {

            // 排他思想
            for (var j = 0; j < li.length; j++) {
                li[j].className = "";
            }
            li[this.index].className = "currentt"


        }
    }





};
consultingtab();



function fly() {
    var offset = $("#end").offset(); //结束的地方的元素
    $(".addcar").click(function (event) { //是$(".addcar")这个元素点击促发的 开始动画的位置就是这个元素的位置为起点

        // console.log(offset.left);

        var addcar = $(this);
        var img = $(".small-img").find('img').attr('src');
        // console.log(img);

        // var img = $(".img")
        var flyer = $('<img class="u-flyer" src="' + img + '">');
        flyer.fly({
            start: {
                left: event.pageX,
                top: event.pageY
            },
            end: {
                left: offset.left + 10,
                top: offset.top + 10,
                width: 0,
                height: 0
            },
            onEnd: function () {
                $("#msg").show().animate({
                    width: '250px'
                }, 200).fadeOut(1000);
                addcar.css("cursor", "default").removeClass('orange').unbind('click');
                this.destory();
            }
        });
    });

};
fly();






// 三级菜单

function commenttab() {
    var li = document.getElementsByClassName("navdlLi");
    var div = document.getElementsByClassName("subClass");

    for (var b = 0; b < li.length; b++) {
        li[b].index = b;
        li[b].onmouseover = function () {

            // 排他思想
            for (var j = 0; j < li.length; j++) {
                // li[j].className = "navdlLi";
                div[j].style.display = 'none ';
            }
            // li[this.index].className = "active"
            // console.log(this.index);

            // div[this.index].style.display = 'block';
            div[this.index].style.display = 'block';

        }
    }

};

commenttab();


// 导航条
var menu = document.getElementsByClassName("site-menu")[0];
var lis = menu.getElementsByTagName("li");
// console.log(lis.length);

for (var k = 0; k < lis.length; k++) {
    lis[k].onclick = function () {
        window.location.href = "html/list.html"



    }



}





//刷新面板：退出面板和登陆面板是矛盾的关系，注册和登陆面板同时显示隐藏

var loginbarleft = document.getElementsByClassName("loginbar-left")[0];

function update() {
    let username = getCookie('username');
    // console.log(uid);

    let uid = getCookie('uid');
    var html;
    if (uid) {
        //证明已登录：显示退出面板，隐藏登陆和注册面板


        html = `     
                   您好，         
            <span>[<a href="html/signin.html">${username}</a>]</span>
             欢迎来到  
            <a href="https://www.baiyangwang.com/">百洋健康</a>

            <span>[<a href="" class="out">退出</a>]</span>
            `;

        $('.loginbar-left').html(html);


    } else {
        //证明已退出：隐藏退出面板，显示登陆和注册面板


        html = `您好，欢迎来到
                                <a href="https://www.baiyangwang.com/">百洋健康</a>
                                <span>[<a href="signin.html">登录</a>]</span>
                                <span>[<a href="register.html">注册</a>]</span>
                            </div> `;


        $('.loginbar-left').html(html);


    }
}

update();


// 退出功能



$('.loginbar-left').on('click', '.out', () => {

    console.log(2322);

    // 退出 清除colik、

    ajax2({
        type: 'post',
        url: '../js/guestbook/index.php',
        data: 'm=index&a=logout',
        success: str => {

            let arr = JSON.parse(str);

            removeCookie(user222); //删除：设置失效时间为过去的时间，立即失效
            removeCookie(username); //删除：设置失效时间为过去的时间，立即失效
            removeCookie(uid);
            update();
        }
    });



})

// 点击 我的购物车 判断有没有登录

var cart = document.getElementsByClassName("car")[0];
cart.onclick = function () {
    let username = getCookie('username');
    // console.log(uid);

    let uid = getCookie('uid');
    if (uid) {

        window.location.href = "cart.html"


    } else {
        window.location.href = "signin.html"



    }

}

var car = document.getElementsByClassName("name1")[0];

car.onclick = function () {


    let username = getCookie('username');
    // console.log(uid);

    let uid = getCookie('uid');
    if (uid) {

        window.location.href = "cart.html"


    } else {
        window.location.href = "signin.html"



    }


}