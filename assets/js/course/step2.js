console.log('裁剪');
require(['/bxg/assets/js/config.js','/bxg/assets/js/common.js'],function(){
    require(['jquery','/bxg/assets/js/getarg.js','webuploader','jsrop'],function($,args,WebUploader){
        var coords = {};
    //    保存裁切图片的坐标
    //    上传图片功能
        console.log(args.cs_id);
        uploadAvatar ();
        //裁剪图片
        subCoords();
        function uploadAvatar (){
            window.alert('111');
            var uploader = WebUploader.create({
                auto:true,
                swf:'/bxg/node_modules/webuploader/dist/Uploader.swf',
                server:'/api/uploader/cover',
                pick:'#filePicker',
                formData: {
                    cs_id: args.cs_id
                },
                fileVal:'cs_cover_original',
                accept:{
                    title:'Images',
                    extensions:'gif,jpg,jpeg,bmp,png'
                }
            })
            uploader.on('uploadSuccess',function(xx,data){
                console.log(data);
                $('.preview img').attr('src',data.result.path).on('load',function(){
                    //图片加载完毕后执行裁剪插件
                    jcropInit();
                })
            })
        }
    //    裁剪图片
        function jcropInit(){
            var options = {
                boxWidth:300,
                aspectRatio:1.618,
                onSelect:function(c){
                    coords = c;
                }
            }
            $('.preview img').Jcrop(options,function(){
                this.setSelect([0,20,100,400])
            })
        }
    //    点击裁切按钮,把坐标发给服务器
        function subCoords(){
            $('#sub').on('click',function(){
                coords.cs_id = args.cs_id;
                var options = {
                    url:'/api/course/update/picture',
                    type:'post',
                    data:coords,
                    success:function(data){
                        alert('裁剪成功');
                        if(data.code === 200){
                            window.location.href = './step3.html?cs_id='+args.cs_id;
                        }
                    }
                };
                $.ajax(options);
            })
        }
    })
})