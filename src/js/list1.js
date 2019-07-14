(function () {
    let list = document.getElementById('list');
    let pages = document.getElementById('pages');
    let btn = document.getElementById('btn');
    let iPage = 1; //获取第一页内容
    let num = 24; //每页25条内容
    let paixu = ''; //默认没有排序

    function init() {
        ajax2({
            type: 'get',
            url: '../api/list1.php',
            data: 'page=' + iPage + '&num=' + num + '&paixu=' + paixu,
            // async: false,
            success: str => {
                // console.log(str);
                let arr = JSON.parse(str); //将字符串转成对象  [{},{},{}]
                // console.log(arr);
                let html = arr.data.map((item, index) => {


                    //img 的url

                    var result = item.imgurl.split("&");
                    // console.log(result);
                    var url3 = '';
                    for (var i = 0; i < result.length; i++) {
                        // console.log(result[i]);

                        url3 += `
                        <li class="selected">
                        <a href="javascript:void(0);">

                        <img src="../imgs/index/${result[i]}"></a>
                        
                        </li>
                        `;


                    }
                    // console.log(url3);





                    return `
                    <li class="item" data-id="${item.id}">
                    <div class="goods-content">
                        <div class="goods-pic">
                            <a href="details.html?&id=${item.id}"
                                title="美国进口百适滴海藻油DHA胶囊90粒赠来益 叶黄素咀嚼片40片、">
                                <img
                                    src="../imgs/index/${result[1]}">
                            </a>
                        </div>
                        <div class="goods-info">
                            <div class="goods-pic-scroll-show">
                                <ul>
                                ${url3}
                                </ul>
                            </div>
                            <div class="goods-name">
                                <a href="https://www.baiyangwang.com/item-877781064.html" target="_blank"
                                    title="">
                                    ${item.name}
                                    <em>${item.address}</em>
                                </a>
                            </div>
                            <div class="goods-price">
                                <em class="sale-price" title="商城价：¥686.00">¥${item.price}.00</em>
                                <em class="market-price" title="市场价：¥899.00">¥${item.marketprice}.00</em>

                                <div class="goods-cti">
                                    <span title="100%正品保证">
                                        <img
                                            src="https://b2cstatic.baiyangwang.com/shop/contracticon/05890672784766467_60.gif">
                                    </span>
                                    <span title="30天无忧售后">
                                        <img
                                            src="https://b2cstatic.baiyangwang.com/shop/contracticon/pz_60.gif">
                                    </span>
                                    <span title="正品保障">
                                        <img
                                            src="https://b2cstatic.baiyangwang.com/shop/contracticon/05883488394380583_60.png">
                                    </span>
                                </div>

                            </div>
                            <div class="goods-sub">
                                <span class="goods-compare">
                                    <i></i>
                                    加入对比
                                </span>
                            </div>
                            <div class="sell-stat">
                                <ul>
                                    <li>
                                        <p class="p1">${item.comment}</p>
                                        <p class="p2">商品销量</p>
                                    </li>
                                    <li>
                                        <p class="p1">${item.more}</p>
                                        <p class="p2">用户评论</p>
                                    </li>
                                    <li>
                                        <span></span>
                                        <span></span>
                                    </li>
                                </ul>


                            </div>
                            <div class="store">
                                <a href="https://www.baiyangwang.com/shop-1.html" title="百洋健康官方自营店"
                                    class="name">
                                    百洋健康官方自营店
                                </a>
                            </div>
                            <div class="add-cart">
                                <a href="javascript:void(0);" nctype="add_cart" data-gid="${item.id}" class="buycart">
                                    <i></i>
                                    加入购物车
                                </a>
                            </div>
                        </div>
                    </div>
                </li>





                    `;
                }).join('');




                list.innerHTML = html; //数据渲染


                // //2.根据总条数和每页显示条数，计算总页数，生成页码；
                let pagesNum = Math.ceil(arr.pages / arr.num);
                // console.log(pagesNum);
                // console.log(arr.num);

                let pageBtns = '';
                for (let i = 0; i < pagesNum; i++) {
                    pageBtns += `<a href="#">${i + 1}</a>`;
                }

                pages.innerHTML = pageBtns;
                pages.children[iPage - 1].className = 'active'; //第一页高亮



                //3.点击页码，能够按需加载新一页数据过来渲染；事件委托实现事件绑定
                pages.onclick = ev => {
                    if (ev.target.tagName.toLowerCase() == 'a') {

                        iPage = ev.target.innerHTML;
                        init(); //调取最新的数据渲染到页面
                    }
                }

                //4.升序降序：按照价格；
                btn.onclick = function () {

                    if (this.value == '升序') {
                        //升序
                        paixu = 'asc';
                        this.value = '降序';
                    } else {
                        paixu = 'desc';
                        this.value = '升序';
                    }
                    init();
                    console.log(paixu);
                }





                var buycartt = document.getElementsByClassName("buycart");



                for (var m = 0; m < buycartt.length; m++) {

                    buycartt[m].onclick = function () {
                        console.log(23333);
                        
                        var gid = this.dataset.gid;
                        ajax2({
                            type: 'get',
                            url: '../api/buycart.php',
                            data: 'id=' + gid,
                            // async: false,
                            success: str => {

                                console.log(2222);
                                


                            }
                        });


                    }


                }












            }
        });
    }

    init();



    // 点击 加入购物车  获取li 上面的 data-id  发送给 后台查询该数据  添加到另一个表单
    //INSERT INTO  目标表 (字段1, 字段2, ...)  SELECT   字段1, 字段2, ...   FROM  来源表 ;










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
    // console.log(lis);

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










})()