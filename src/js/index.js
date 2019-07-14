(function () {






    (function () {
        // 轮播图
        //swiper基本款
        var s1 = new Swiper('#swiper-container', {
            autoplay: { //自动轮播
                delay: 3000, //间隔时间
                disableOnInteraction: false //拖拽完后还能继续自动轮播
            },
            loop: true, //无缝 环路
            speed: 1500, //切换速度
            navigation: { //上下按钮
                nextEl: '.banner-next',
                prevEl: '.banner-prev'
            },
            pagination: { //焦点跟随
                el: '.banner-pagination',
                clickable: true, //点击焦点跳到指定图片
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + '</span>'; //生成焦点数字
                }
            },
            // mousewheel: true //滚动滑轮可以切图
            // effect : 'cube'//选用:效果
        });

        var oBox = document.getElementById('swiper-container');

        oBox.onmouseover = function () { //鼠标经过停止
            s1.autoplay.stop();
        }

        oBox.onmouseout = function () { //鼠标离开就运动
            s1.autoplay.start();
        }

        // let bannerImg=document.getElementsByClassName("swiper-slide");
    })();




    // main2 ajax 请求  轮播图

    (function () {



        // var html2 = "";
        // var html3 = "";

        $.ajax({
            type: 'get',
            url: 'api/indexsss.php',
            Which: 'main2',
            success: function (str) {
                // console.log(str);
                let arr = JSON.parse(str); //系统方法在jq一样适用
                // console.log(arr);
                var html2 = "";
                var html3 = "";
                for (var i = 0; i < arr.length; i++) {

                    var html = `<li class="main2Li" >
                    <a href="###">
                    <img src="${arr[i].imgs}" alt="" class="main2Img">
                    <div>
                        <div class="main2DIv">
                            <p>${arr[i].name}</p>
                            <p>￥${arr[i].Price}.00</p>
                        </div>
                        <p class="swiper-slide-buy">${arr[i].Sales}</p>
                    </div>
                </a>
                </li> `;


                    if (i < 5) {
                        html2 += html
                    } else {
                        html3 += html
                    }

                };

                $('.main2UL1').html(html2);
                $('.main2UL2').html(html3);
            }
        });



        // 轮播图
        //图片放到右侧
        let iw = $('.main2UL ul').eq(0).outerWidth(); //一个图片的宽度
        $('.main2UL ul').css('left', iw); //图片放到右侧
        $('.main2UL ul').eq(0).css('left', 0); //第一张在可视区
        // console.log(iw);

        //生成焦点
        let html = '';
        $('.main2UL ul').each((i, item) => {
            html += `<span>${i + 1}</span>`;
        });
        $('.light').html(html); //数据渲染
        $('.light').find('span:first').addClass('active');

        //1.自动轮播：定时器
        let timer = null;
        let now = 0; //可视区图片的下标



        function next() {
            //下一张
            //旧图挪走
            $('.main2UL ul').eq(now).animate({
                'left': -iw
            }, 1000, 'linear');
            //新图进场
            now++;
            if (now >= $('.main2UL ul').size()) {
                now = 0;
            }
            $('.main2UL ul').eq(now).css({
                'left': iw
            }); //快速放在右侧
            $('.main2UL ul').eq(now).animate({
                'left': 0
            }, 1000, 'linear');
            light();
        }

        timer = setInterval(next, 4000);


        //焦点跟随
        function light() {
            $('.light').find('span').eq(now).addClass('active').siblings().removeClass('active');
        }


        //2.鼠标移入停止移出继续运动
        $('.main2UL').hover(() => {
            clearInterval(timer);
        }, () => {
            timer = setInterval(next, 4000);
        });


        //4.点击焦点能够跳转到对应图片
        $('.light').on('click', 'span', function () {
            let index = $(this).index();
            // console.log(index);
            if (index > now) {
                //新图从右边切入
                $('.main2UL ul').eq(now).animate({
                    'left': -iw
                }, 1000, 'linear');
                $('.main2UL ul').eq(index).css({
                    'left': iw
                });
                $('.main2UL ul').eq(index).animate({
                    'left': 0
                }, 1000, 'linear');
            }
            if (index < now) {
                //新图从左边切入
                $('.main2UL ul').eq(now).animate({
                    'left': iw
                }, 1000, 'linear');
                $('.main2UL ul').eq(index).css({
                    'left': -iw
                });
                $('.main2UL ul').eq(index).animate({
                    'left': 0
                }, 1000, 'linear');
            }
            now = index;
            light();
        });

    })();



    // mian5 轮播图

    // var swiper = new Swiper('#main5lbt', {
    //     slidesPerView: 7,
    //     centeredSlides: true,
    //     spaceBetween: 20,
    //     pagination: {
    //       el: '.swiper-pagination',
    //       type: 'fraction',
    //     },
    //     navigation: {
    //         nextEl: '.main5-prev',
    //         prevEl: '.main5-next',
    //     },
    //     virtual: {
    //         slides: (function () {
    //             var slides = [];
    //             for (var i = 0; i < 600; i += 1) {
    //                 slides.push('Slide ' + (i + 1));
    //             }
    //             return slides;
    //         }()),
    //     },
    // });

    // document.querySelector('.slide-1').addEventListener('click', function (e) {
    //     e.preventDefault();
    //     swiper.slideTo(0, 0);
    // });
    // document.querySelector('.slide-250').addEventListener('click', function (e) {
    //     e.preventDefault();
    //     swiper.slideTo(249, 0);
    // });
    // document.querySelector('.slide-500').addEventListener('click', function (e) {
    //     e.preventDefault();
    //     swiper.slideTo(499, 0);
    // });




    /*
          回到顶部：
              * 滚动到300px的时候显示回到顶部的按钮
              * 点击回到顶部可以快速回到顶部
      */
    (function () {
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

    })();





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
    console.log(lis.length);

    for (var k = 0; k < lis.length; k++) {
        lis[k].onclick = function () {
            window.location.href = "html/list.html"



        }



    }


    // //刷新面板：退出面板和登陆面板是矛盾的关系，注册和登陆面板同时显示隐藏

    // var loginbarleft = document.getElementsByClassName("loginbar-left")[0];

    function update() {
        let username = getCookie('username');
        // console.log(uid);

        let uid = getCookie('uid');
        var html;
        if (uid) {
            //证明已登录：显示退出面板，隐藏登陆和注册面板
            // css(reg, 'display', 'none');
            // css(login, 'display', 'none');
            // css(user, 'display', 'block');
            // userinfo.innerHTML = username;
            // console.log(11111111);

            // loginbarleft.innerHTML = html;


            html = `     
                   您好，         
            <span>[<a href="html/signin.html">${username}</a>]</span>
             欢迎来到  
            <a href="https://www.baiyangwang.com/">百洋健康</a>

            <span>[<a href="" class="out">退出</a>]</span>
            `;

            $('.loginbar-left').html(html);
            // console.log(html);


        } else {
            //证明已退出：隐藏退出面板，显示登陆和注册面板
            // css(reg, 'display', 'block');
            // css(login, 'display', 'block');
            // css(user, 'display', 'none');
            // userinfo.innerHTML = '';

            // console.log(222222222);

            // loginbarleft.innerHTML = html;

            html = `您好，欢迎来到
                                <a href="https://www.baiyangwang.com/">百洋健康</a>
                                <span>[<a href="html/signin.html">登录</a>]</span>
                                <span>[<a href="html/register.html">注册</a>]</span>
                            </div> `;


            $('.loginbar-left').html(html);


        }
    }

    update();
    // $('#expRet').on('click', () => {

    // 退出功能



    $('.loginbar-left').on('click', '.out', () => {

        console.log(2322);

        // 退出 清除colik、

        ajax2({
            type: 'post',
            url: 'js/guestbook/index.php',
            data: 'm=index&a=logout',
            success: str => {
                //         // console.log(str);
                let arr = JSON.parse(str);
                //         console.log(arr);
                // alert(arr.message);
                removeCookie(user222); //删除：设置失效时间为过去的时间，立即失效
                removeCookie(username); //删除：设置失效时间为过去的时间，立即失效
                removeCookie(uid);
                update();
            }
        });
        // 退出 清除colik、

        // removeCookie(user222) //删除：设置失效时间为过去的时间，立即失效
        // removeCookie(username) //删除：设置失效时间为过去的时间，立即失效



    })

    // var out = document.getElementsByClassName("out")[0];


    // let logout = getid('logout');
    // out.onclick = () => {
    //     console.log(6666);
    //     ajax2({
    //         type: 'post',
    //         url: 'js/guestbook/index.php',
    //         data: 'm=index&a=logout',
    //         success: str => {
    //             // console.log(str);
    //             let arr = JSON.parse(str);
    //             console.log(arr);
    //             alert(arr.message);
    //             update();
    //         }
    //     });
    // }

    var cart = document.getElementsByClassName("car")[0];
    cart.onclick = function () {

        window.location.href = "html/cart.html"




    }

    var car = document.getElementsByClassName("name")[0];

    car.onclick = function () {

        window.location.href = "html/cart.html"




    }







})()