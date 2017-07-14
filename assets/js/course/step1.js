console.log('课程信息');
require(['/bxg/assets/js/config.js','/bxg/assets/js/common.js'],function(){
    require(['jquery','/bxg/assets/js/getarg.js','template','validate','form'],function($,args,template){
    //    获取课程信息
        getCourseInfo();
        function getCourseInfo(){
            var options = {
                url:'/api/course/basic',
                type:'get',
                // data:{
                //     cs_id:args.cs_id
                // }
                data:args,
                success:function(data){
                    console.log(data);
                    var result = template('tmp',{item:data.result})
                    $('.content').html(result);
                //    注册一级分类的change事件
                    $('#top').on('change',function(){
                        var cgId=$(this).val();
                        var options={
                            url:'/api/category/child',
                            type:'get',
                            data:{
                                cg_id:cgId
                            },
                            success:function(data){
                                console.log(data);
                                var str='';
                                data.result.forEach(function(item){
                                    str += '<option value="'+item.cg_id+'">'+item.cg_name+'</option>'
                                })
                                $('#childs').html(str);
                            }
                        }
                        $.ajax(options);
                    })
                    validate();
                }
            };
            $.ajax(options);
        }
    //    表单验证
        function validate(){
            var options = {};
            options.submitHandler = function(){
                var options = {
                    url:'/api/course/update/basic',
                    type:'post',
                    data:{
                        cs_id:args.cs_id
                    } ,
                    success:function(data){
                        console.log(213);
                        if(data.code === 200){
                            window.location.href='./step2.html?cs_id='+data.result.cs_id
                        }
                    }
                };
                $('form').ajaxSubmit(options);
            }
            options.rules = {
                cs_name:{
                    required:true,
                    rangelength:[2,10]
                },
                cs_tags:{
                    required:true,
                    rangelength:[2,50]
                }
            }
            options.messages = {
                cs_name:{
                    required:'不能为空',
                    rangelength:'长度不对'
                },
                cs_tags:{
                    required:'不能为空',
                    rangelength:'长度在2到50之间'
                }
            }
            $('form').validate(options);

        }
    })
})