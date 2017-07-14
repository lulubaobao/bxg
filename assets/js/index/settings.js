console.log('个人资料');
/*
* 功能1:获取个人资料并展示
* 功能2:上传头像功能(插件版,原生js版本)
* 功能3:省市联动功能
* 功能4:日期插件初始化
* 功能5:表单验证插件初始化
* */
require(['/bxg/assets/js/config.js'],function(){
    require(['jquery','template','webuploader','form','validate','datepicker','/bxg/assets/js/common.js'],function($,template,WebUploader){
    //    功能1:获取个人资料并展示
        getUserInfo();
        function getUserInfo(){
            var options={
                url:'/api/teacher/profile',
                type:'get',
                success:function(data){
                    console.log(data);
                    if(data.code === 200){
                        var result = template('tmp',{list:data.result});
                        $('.settings').html(result);
                        //上传头像
                        uploaderAvatar ();
                    //    三级联动
                        pcd();
                    //    日期插件
                        datepicker();
                    //    表单验证
                        validate();
                    }
                }
            };
            $.ajax(options);
        }
    //    功能2:上传头像功能
        function uploaderAvatar (){
            window.alert('上传头像');
            var uploader = WebUploader.create({
                auto:true,
                swf:'/bxg/node_modules/webuploader/dist/Uploader.swf',
                server:'/api/uploader/avatar',
                pick:'#filePicker',
                fileVal:'tc_avatar',
                accpet:{
                    title:'Images',
                    extensions:'gif,jpg,jpeg,bmp,png'
                }
            })
            uploader.on('uploadSuccess',function(xx,data){
                console.log(arguments);
                $('.preview img').attr('src',data.result.path)
            })
        }
    //功能3:省市三级联动
        function pcd(){
            var pcd = {};
            var options = {
                url:'/bxg/assets/region.json',
                type:'post',
                success:function(data){
                    console.log(data);
                    pcd = data;
                    //默认值
                    setOptions('000000',$Proivnce,'p');
                }
            };
            $.ajax(options);
            var $Proivnce = $('[name="tc_province"]');
            var $City = $('[name="tc_city"]');
            var $District = $('[name="tc_district"]');

            function setOptions(code,$select,type){
                var options = pcd[type][code];
                var str='';
                for(var key in options){
                    str += `<option value="${key}">${options[key]}</option>`
                }
                $select.html(str);
                $select.trigger('change');
            }
            $Proivnce.on('change',function(){
                setOptions(this.value,$City,'c')
            });
            $City.on('change',function(){
                setOptions(this.value,$District,'d')
            })
        }
    //    功能4:日期插件初始化
        function datepicker(){
            $('[name="tc_birthday"],[name="tc_join_date"]').datepicker({
                format:'yyyy/mm/dd'
            })
        }
    //功能5:表单验证插件初始化
        function validate(){
            $('form').validate({
                submitHandle:function(){
                    var options = {
                        url:'/api/teacher/modify',
                        type:'post',
                        data:{
                            tc_id:872
                        },
                        success:function(data){
                            if(data.code === 200){
                                console.log('修改成功');
                            }
                        }
                    }
                    $('form').ajaxSubmit(options);
                },
                rules:{
                    tc_roster:{
                        required:true
                    }
                },
                messages:{
                    tc_roster:{
                        required:'不能为空'
                    }
                }

            })
        }
    })
})
