(function () {
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
					var scrollTop=window.setInterval(function(){
						//pageYOffset获取窗口离上面的距离
						// console.log(window.pageYOffset+':'+scrollTop);
						var pop=window.pageYOffset;
						if(pop>0){
							window.scrollTo(0,pop-20);
						}
						else{
							window.clearInterval(scrollTop);
						}
					},1);



        }

    })();















})()