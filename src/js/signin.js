(function () {


    function commenttab() {
        var ul = document.getElementsByClassName("tabs-nav")[0];
        var li = ul.getElementsByTagName("li")
        var div = document.getElementsByClassName("box");


        for (var b = 0; b < li.length; b++) {
            li[b].index = b;
            li[b].onclick = function () {

                // 排他思想
                for (var j = 0; j < li.length; j++) {
                    li[j].className = "";
                    div[j].style.display = 'none';
                }
                li[this.index].className = "active"
                console.log(this.index);

                // div[this.index].style.display = 'block';
                div[this.index].style.display = 'block';

            }
        }

    };

    commenttab();


    // 随机数
    var a1 = randomNum()
    var ran = document.getElementsByClassName("random")[0];
    ran.innerHTML = a1;

    var ran1 = document.getElementsByClassName("random1")[0];
    var a2 = randomNum()

    ran1.innerHTML = a2;



    var oncli1 = document.getElementsByClassName("makecode1")[0];

    oncli1.onclick = function () {
        // console.log(6666);

        var a3 = randomNum();
        ran.innerHTML = a3;

    }
    var oncli2 = document.getElementsByClassName("makecode2")[0];

    oncli2.onclick = function () {
        // console.log(6666);

        var a4 = randomNum();
        ran1.innerHTML = a4;

    }





    /*
        需求：
            * 验证用户名是否存在
            * 注册
            * 登陆
            * 退出
            * 发表留言
            * 初始化列表数据
            * 懒加载
            * 顶贴、踩贴
    */

    /*
	验证用户名
	get
		guestbook/index.php
			m : index
			a : verifyUserName
			username : 要验证的用户名
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息具体返回信息
			}
    */

    // 注册 失去焦点的时候验证用户名是否存在
    // let username1 = getid('username1');
    // let verifyUserNameMsg = getid('verifyUserNameMsg');


    // username1.onblur = () => {

    //     console.log(username1);

    //     let name = username1.value.trim();
    //     console.log(name);

    //     if (name) {
    //         //非空
    //         ajax2({
    //             type: 'get',
    //             url: '../js/guestbook/index.php',
    //             data: 'm=index&a=verifyUserName&username=' + name,
    //             success: str => {
    //                 console.log(str);
    //                 let arr = JSON.parse(str);
    //                 // console.log(arr);
    //                 if (!arr.code) {
    //                     //正确
    //                     css(verifyUserNameMsg, 'background-color', '#58bc58');
    //                 } else {
    //                     css(verifyUserNameMsg, 'background-color', 'red');
    //                 }
    //                 // verifyUserNameMsg.innerHTML = "ok";
    //                 // console.log(arr.message);

    //             }
    //         });
    //     } else {
    //         //空
    //         verifyUserNameMsg.innerHTML = '请输入要验证的用户名';
    //         css(verifyUserNameMsg, 'color', 'red');
    //     }
    // }


    // /*
    // 用户注册
    // get/post
    // 	guestbook/index.php
    // 		m : index
    // 		a : reg
    // 		username : 要注册的用户名
    // 		password : 注册的密码
    // 	返回
    // 		{
    // 			code : 返回的信息代码 0 = 没有错误，1 = 有错误
    // 			message : 返回的信息 具体返回信息
    // 		}
    // */

    // let btnReg = getid('btnReg');
    // let password1 = getid('password1');
    // let username2 = getid('username2');
    // let password2 = getid('password2');

    // btnReg.onclick = () => {
    //     let name = username1.value.trim();
    //     let pwd = password1.value.trim();
    //     if (name && pwd) {

    //         //非空判断
    //         ajax2({
    //             type: 'post',
    //             url: '../js/guestbook/index.php',
    //             data: 'm=index&a=reg&username=' + name + '&password=' + pwd,
    //             success: str => {
    //                 // console.log(str);
    //                 let arr = JSON.parse(str);
    //                 // console.log(arr);
    //                 alert(arr.message);
    //                 //清空并聚焦
    //                 username1.value = '';
    //                 password1.value = '';
    //                 username2.focus();
    //             }
    //         });
    //     } else {
    //         //空
    //         alert('请输入完整的注册信息');
    //     }

    // }

    /*
	用户登陆
	get/post
		guestbook/index.php
			m : index
			a : login
			username : 要登陆的用户名
			password : 登陆的密码
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
    */
    // 开关
    var isok = "";
    // 验证码 
    var captcha = document.getElementById("image_captcha");
    var ran = document.getElementsByClassName("random")[0];


    let name22 = ran.innerHTML.trim().toLowerCase();


    captcha.onblur = () => {
        let name = captcha.value.trim().toLowerCase();


        if (name) {
            if (name == name22) {
                // isok = true;
                sin();
            } else {
                isok = false;
                alert('请输入正确的验证码');

            }


        } else {

            alert('请输入完整的验证码');
        }



    }



    let password1 = getid('password');
    let username1 = getid('username1');
    let btnLogin = getid('submit');

    function sin() {


        btnLogin.onclick = () => {


            let name = username1.value.trim();
            let pwd = password1.value.trim();
            if (name && pwd) {
                //非空判断
                ajax2({
                    type: 'post',
                    url: '../js/guestbook/index.php',
                    data: 'm=index&a=login&username=' + name + '&password=' + pwd,
                    success: str => {
                        // console.log(str);
                        let arr = JSON.parse(str);
                        // console.log(arr);
                        alert(arr.message);
                        update();
                    }
                });
            } else {
                //空
                alert('请输入完整的登陆信息');
            }
        }

    }

    sin()




    // //刷新面板：退出面板和登陆面板是矛盾的关系，注册和登陆面板同时显示隐藏
    // let reg = getid('reg');
    // let login = getid('login');
    // let user = getid('user');
    // let userinfo = getid('userinfo');

    function update() {
        let username = getCookie('username');
        let uid = getCookie('uid');
        if (uid) {
            //证明已登录：显示退出面板，隐藏登陆和注册面板
            // css(reg, 'display', 'none');
            // css(login, 'display', 'none');
            // css(user, 'display', 'block');
            // userinfo.innerHTML = username;
            window.location.href = "../baiyangwang.html"

        } else {
            //证明已退出：隐藏退出面板，显示登陆和注册面板
            // css(reg, 'display', 'block');
            // css(login, 'display', 'block');
            // css(user, 'display', 'none');
            // userinfo.innerHTML = '';



        }
    }

    // update(); //刷新面板

    // /*
    // 用户退出
    // get/post
    // 	guestbook/index.php
    // 		m : index
    // 		a : logout
    // 	返回
    // 		{
    // 			code : 返回的信息代码 0 = 没有错误，1 = 有错误
    // 			message : 返回的信息 具体返回信息
    // 		}
    // */

    // let logout = getid('logout');
    // logout.onclick = () => {
    //     ajax2({
    //         type: 'post',
    //         url: '../js/guestbook/index.php',
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




    var che = document.getElementsByClassName("checkbox")[0];

    che.onclick = function () {
        var va = username1.value.trim();
        console.log(va);


        if (che.checked == true) {
            setCookie("user222", va, 7);



        }


    }



    // function setCookie(key, val, iDay) {
    //     //key：键名；val：键值；iDay：失效时间
    //     var now = new Date();
    //     now.setDate(now.getDate() + iDay);
    //     document.cookie = key + '=' + val + ';expires=' + now.toUTCString() + ';path=/'; //设置一个站点内的文件可以共享此cookie
    // }








})();