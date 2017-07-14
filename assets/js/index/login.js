 //定义模块
 /*要做什么功能
 1.给登录按钮注册点击事件
 2.在点击事件触发时获取用户名和密码的值
 3.表单验证,判断用户名和密码是否为空.如果为空不允许发送请求
 4.使用jquery发ajax请求,把数据发给服务器
 * */
 require(['/bxg/assets/js/config.js'],function(){
     require(['jquery','cookie'],function($){
     //    1.注册事件
         var $sub=$('#sub');
         $sub.on('click',clickHandler);
         function clickHandler(e){
             //禁止默认事件
             e.preventDefault();
         //    2.获取用户名和密码
             var username=$('#name').val();
             var password=$('#pass').val();
         //    3.表单验证
             if(!username.trim()||!password.trim()){
                 return
             }
         //    4.发请求
             var options={
                 url:'/api/login',
                 type:'post',
                 data:{
                     tc_name:username,
                     tc_pass:password
                 },
             success:function(data){
                 console.log(data);
                 if(data.code===200){
                      window.alert('登陆成功');
                     // 把用户的信息用cookie保存一下,
                     $.cookie('userInfo',JSON.stringify(data.result),{expires:7,path:'/'})
                     //请求成功跳转到主页面
                     window.location.href='/bxg/views/index/dashboard.html'
                     }
             }
             }
             $.ajax(options)
         }
     })
 })