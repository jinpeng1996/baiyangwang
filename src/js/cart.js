(function () {
    function cart() {
        let ul = document.getElementsByClassName("order_content")[0];

        ajax2({
            type: 'get',
            url: '../api/cart.php',
            // async: false,
            // data: '',
            success: str => {

                let arr = JSON.parse(str);

                let html = ""
                // console.log(arr);
                arr.map((item, index) => {

                    var result = item.imgurl.split("&");



                    html += `
  
                    <ul class="order_lists">
                    <li class="list_chk">
                        <input type="checkbox" id="checkbox_${item.id}" class="son_check">
                        <label for="checkbox_4"></label>
                    </li>
                    <li class="list_con">
                        <div class="list_img"><a href="javascript:;"><img src="../imgs/index/${result[0]}" alt=""></a></div>
                        <div class="list_text"><a href="javascript:;">${item.name}</a></div>
                    </li>
                    <li class="list_info">
                        <p>规格：默认</p>
                        <p>尺寸：16*16*3(cm)</p>
                    </li>
                    <li class="list_price">
                        <p class="price">￥${item.price}</p>
                    </li>
                    <li class="list_amount">
                        <div class="amount_box">
                            <a href="javascript:;" class="reduce reSty">-</a>
                            <input type="text" value="1" class="sum">
                            <a href="javascript:;" class="plus">+</a>
                        </div>
                    </li>
                    <li class="list_sum">
                        <p class="sum_price">￥${item.price}</p>
                    </li>
                    <li class="list_op">
                        <p class="del"><a href="javascript:;" class="delBtn">移除商品</a></p>
                    </li>
                </ul>
                    
                    
                    
                    
                    `








                }).join('');


                ul.innerHTML = html; //数据渲染

                // bucar() //商品的加减

            }

        });

    };


    cart();




    function bucar() {




        $(function () {

            //全局的checkbox选中和未选中的样式
            var $allCheckbox = $('input[type="checkbox"]'), //全局的全部checkbox
                $wholeChexbox = $('.whole_check'),
                $cartBox = $('.cartBox'), //每个商铺盒子
                $shopCheckbox = $('.shopChoice'), //每个商铺的checkbox
                $sonCheckBox = $('.son_check'); //每个商铺下的商品的checkbox
            $allCheckbox.click(function () {
                if ($(this).is(':checked')) {
                    $(this).next('label').addClass('mark');
                } else {
                    $(this).next('label').removeClass('mark')
                }
            });

            //===============================================全局全选与单个商品的关系================================
            $wholeChexbox.click(function () {
                var $checkboxs = $cartBox.find('input[type="checkbox"]');
                if ($(this).is(':checked')) {
                    $checkboxs.prop("checked", true);
                    $checkboxs.next('label').addClass('mark');
                } else {
                    $checkboxs.prop("checked", false);
                    $checkboxs.next('label').removeClass('mark');
                }
                totalMoney();
            });


            $sonCheckBox.each(function () {
                $(this).click(function () {
                    if ($(this).is(':checked')) {
                        //判断：所有单个商品是否勾选
                        var len = $sonCheckBox.length;
                        var num = 0;
                        $sonCheckBox.each(function () {
                            if ($(this).is(':checked')) {
                                num++;
                            }
                        });
                        if (num == len) {
                            $wholeChexbox.prop("checked", true);
                            $wholeChexbox.next('label').addClass('mark');
                        }
                    } else {
                        //单个商品取消勾选，全局全选取消勾选
                        $wholeChexbox.prop("checked", false);
                        $wholeChexbox.next('label').removeClass('mark');
                    }
                })
            })

            //=======================================每个店铺checkbox与全选checkbox的关系/每个店铺与其下商品样式的变化===================================================

            //店铺有一个未选中，全局全选按钮取消对勾，若店铺全选中，则全局全选按钮打对勾。
            $shopCheckbox.each(function () {
                $(this).click(function () {
                    if ($(this).is(':checked')) {
                        //判断：店铺全选中，则全局全选按钮打对勾。
                        var len = $shopCheckbox.length;
                        var num = 0;
                        $shopCheckbox.each(function () {
                            if ($(this).is(':checked')) {
                                num++;
                            }
                        });
                        if (num == len) {
                            $wholeChexbox.prop("checked", true);
                            $wholeChexbox.next('label').addClass('mark');
                        }

                        //店铺下的checkbox选中状态
                        $(this).parents('.cartBox').find('.son_check').prop("checked", true);
                        $(this).parents('.cartBox').find('.son_check').next('label').addClass('mark');
                    } else {
                        //否则，全局全选按钮取消对勾
                        $wholeChexbox.prop("checked", false);
                        $wholeChexbox.next('label').removeClass('mark');

                        //店铺下的checkbox选中状态
                        $(this).parents('.cartBox').find('.son_check').prop("checked", false);
                        $(this).parents('.cartBox').find('.son_check').next('label').removeClass('mark');
                    }
                    totalMoney();
                });
            });


            //========================================每个店铺checkbox与其下商品的checkbox的关系======================================================

            //店铺$sonChecks有一个未选中，店铺全选按钮取消选中，若全都选中，则全选打对勾
            $cartBox.each(function () {
                var $this = $(this);
                var $sonChecks = $this.find('.son_check');
                $sonChecks.each(function () {
                    $(this).click(function () {
                        if ($(this).is(':checked')) {
                            //判断：如果所有的$sonChecks都选中则店铺全选打对勾！
                            var len = $sonChecks.length;
                            var num = 0;
                            $sonChecks.each(function () {
                                if ($(this).is(':checked')) {
                                    num++;
                                }
                            });
                            if (num == len) {
                                $(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
                                $(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
                            }

                        } else {
                            //否则，店铺全选取消
                            $(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
                            $(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
                        }
                        totalMoney();
                    });
                });
            });


            //=================================================商品数量==============================================
            var $plus = $('.plus'),
                $reduce = $('.reduce'),
                $all_sum = $('.sum');

            console.log($plus);

            $plus.click(function () {
                console.log(66666);

                var $inputVal = $(this).prev('input'),
                    $count = parseInt($inputVal.val()) + 1,
                    $obj = $(this).parents('.amount_box').find('.reduce'),
                    $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
                    $price = $(this).parents('.order_lists').find('.price').html(), //单价
                    $priceTotal = $count * parseInt($price.substring(1));
                $inputVal.val($count);
                $priceTotalObj.html('￥' + $priceTotal);
                if ($inputVal.val() > 1 && $obj.hasClass('reSty')) {
                    $obj.removeClass('reSty');
                }
                totalMoney();
            });

            $reduce.click(function () {
                var $inputVal = $(this).next('input'),
                    $count = parseInt($inputVal.val()) - 1,
                    $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
                    $price = $(this).parents('.order_lists').find('.price').html(), //单价
                    $priceTotal = $count * parseInt($price.substring(1));
                if ($inputVal.val() > 1) {
                    $inputVal.val($count);
                    $priceTotalObj.html('￥' + $priceTotal);
                }
                if ($inputVal.val() == 1 && !$(this).hasClass('reSty')) {
                    $(this).addClass('reSty');
                }
                totalMoney();
            });

            $all_sum.keyup(function () {
                var $count = 0,
                    $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
                    $price = $(this).parents('.order_lists').find('.price').html(), //单价
                    $priceTotal = 0;
                if ($(this).val() == '') {
                    $(this).val('1');
                }
                $(this).val($(this).val().replace(/\D|^0/g, ''));
                $count = $(this).val();
                $priceTotal = $count * parseInt($price.substring(1));
                $(this).attr('value', $count);
                $priceTotalObj.html('￥' + $priceTotal);
                totalMoney();
            })

            //======================================移除商品========================================

            var $order_lists = null;
            var $order_content = '';
            $('.delBtn').click(function () {
                $order_lists = $(this).parents('.order_lists');
                $order_content = $order_lists.parents('.order_content');
                $('.model_bg').fadeIn(300);
                $('.my_model').fadeIn(300);
            });

            //关闭模态框
            $('.closeModel').click(function () {
                closeM();
            });
            $('.dialog-close').click(function () {
                closeM();
            });

            function closeM() {
                $('.model_bg').fadeOut(300);
                $('.my_model').fadeOut(300);
            }
            //确定按钮，移除商品
            $('.dialog-sure').click(function () {
                $order_lists.remove();
                if ($order_content.html().trim() == null || $order_content.html().trim().length == 0) {
                    $order_content.parents('.cartBox').remove();
                }
                closeM();
                $sonCheckBox = $('.son_check');
                totalMoney();
            })

            //======================================总计==========================================

            function totalMoney() {
                var total_money = 0;
                var total_count = 0;
                var calBtn = $('.calBtn a');
                $sonCheckBox.each(function () {
                    if ($(this).is(':checked')) {
                        var goods = parseInt($(this).parents('.order_lists').find('.sum_price').html().substring(1));
                        var num = parseInt($(this).parents('.order_lists').find('.sum').val());
                        total_money += goods;
                        total_count += num;
                    }
                });
                $('.total_text').html('￥' + total_money);
                $('.piece_num').html(total_count);

                // console.log(total_money,total_count);

                if (total_money != 0 && total_count != 0) {
                    if (!calBtn.hasClass('btn_sty')) {
                        calBtn.addClass('btn_sty');
                    }
                } else {
                    if (calBtn.hasClass('btn_sty')) {
                        calBtn.removeClass('btn_sty');
                    }
                }
            }


        });



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
            console.log(11111111);

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


            window.location.href = "../html/signin.html"

        }
    }

    update();
    // $('#expRet').on('click', () => {

    // 退出功能



    $('.loginbar-left').on('click', '.out', () => {

        // 退出 清除colik、

        // removeCookie(user222) //删除：设置失效时间为过去的时间，立即失效
        // removeCookie(username) //删除：设置失效时间为过去的时间，立即失效

        ajax2({
            type: 'post',
            url: '../js/guestbook/index.php',
            data: 'm=index&a=logout',
            success: str => {
                // console.log(str);
                let arr = JSON.parse(str);
                console.log(arr);
                // alert(arr.message);
                update();
            }
        });
        // 退出 清除colik、

        // removeCookie(user222) //删除：设置失效时间为过去的时间，立即失效
        // removeCookie(username) //删除：设置失效时间为过去的时间，立即失效



    })





})()