// console.log('添加讲师');
require(['/bxg/assets/js/config.js'],function(){
    require(['jquery','/bxg/assets/js/common.js','datepicker','validate','form','zh'],function($){

    //    日期插件的初始化
        $('input[name="tc_join_date"]').datepicker({
            format:'yyyy/mm/dd',
            language:'zh-CN'
        })
    //    表单控件验证
        $('form').validate({
            submitHandler:function(){
                //    验证通过会执行这个方法,调用ajax请求的方法
                $('form').ajaxSubmit({
                    url:'/api/teacher/add',
                    type:'post',
                    success:function(data){
                        if(data.code === 200){
                            window.alert('添加成功');
                        }
                    },
                    error:function(){
                       window.alert('错误')
                    }
                })
            },
            rules:{
                tc_name:{
                    required:true,
                    rangelength:[2,4]
                },
                tc_pass:{
                    required:true,
                },
                tc_join_date:{
                    required:true,
                    date:true
                }
            },
            message:{
                tc_name:{
                    required:'不能为空',
                    rangelength:'长度要在2到4 之间'
                },
                tc_pass:{
                    required:'不能为空'
                }
            }
        })
    })
})