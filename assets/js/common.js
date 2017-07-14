
/*
ugh
* 功能1:判断用户是否登录
* 功能2:从cookie中读取用户的资料,并展示
* 功能3:导航菜单的交互(展开与收起)
* 功能4:退出登录
* 功能5:让页面打开时有进度条,让每个ajax发送过程有进度*/
define(['jquery','nprogress','cookie'],function($,NProgress){
    //打开页面时有进度条
    NProgress.start();
//    功能1 验证是否登录过
    valiSignIn();
//    功能2 获取用户资料并展示
    getInfo();
//    功能3 导航菜单交互
    navToggle();
//    功能4 退出登录
    signOut();
//    功能5:注册全局的ajax事件,添加进度条
    globalAjaxEvent();


    //功能1的函数
    function valiSignIn(){
    //    获取cookie中的PHPSESSID这个cookie,只要它的值存在,就说明登录过,反之就没有登录
        var sessionID = $.cookie('PHPSESSID');
        console.log(1323);
        console.log(sessionID);
        if(!sessionID){
            window.location.href='/bxg/views/index/login.html'
        }
    }
//    功能2的函数
    function getInfo(){
        //得到存在cookie中的值,转换为对象
        var userInfo = JSON.parse($.cookie('userinfo'));
        console.log(userInfo);
        //    头像
        $('.profile img ').attr('src',userInfo.tc_avator);
    //    用户名
        $('.profile h4').text(userInfo.tc_name);
    }
//    功能3的函数菜单栏切换
    function navToggle(){
        $('.navs li a').on('click',function(e){
            $(this).next('ul').slideToggle();
        })
    }
//    功能4的函数 退出登录
    function signOut(){
        $('.fa-sign-out').closest('li').on('click',clickHandler);
        function clickHandler(e){
            var options={
                type:'post',
                url:'/api/logout',
                success:function(data){
                   if(data.code == 200){
                       window.location.href = '/bxg/views/index/login.html'
                   }
                }
            }
            $.ajax(options);
        }
    }
//功能5:注册全局的ajax请求事件
    function globalAjaxEvent(){
        $(document).ajaxStart(function(){
            NProgress.start();
        });
        $(document).ajaxStop(function(){
            NProgress.done();
        })
    }

    // $(function(){
        NProgress.done();
    // })
    console.log(666);


})