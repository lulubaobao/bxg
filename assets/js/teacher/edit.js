// console.log('编辑页面');
require(['/bxg/assets/js/config.js'],function(){
    require(['jquery','/bxg/assets/js/getarg.js','validate','form','datepicker','/bxg/assets/js/common.js'],function($,obj){
        console.log(obj);
        console.log(obj.tc_id);
        //发送ajax请求,显示编辑页面
        var options={
            url:'/api/teacher/edit',
            type:'get',
            data:{
                tc_id:obj.tc_id
            },
            success:function(data){
                if(data.code === 200){
                    console.log(data)
                //    在模板引擎把数据呈现之后,再操作dom
                    var $tcName=$('input[name="tc_name"]');
                    var $tcJoinDate=$('input[name="tc_join_date"]');
                    var $tcType=$('input[name="tc_type"]');
                    var $tcGender=$('input[name="tc_gender"]');
                    //得到数据并赋值
                    var obj = data.result;
                    $tcName.val(obj.tc_name);
                    $tcJoinDate.val(obj.tc_join_date);
                    var num = obj.tc_type === 0 ? 1 : 0;
                    $($tcType.find('option')[num]).attr('selected',true);

                   var num = obj.tc_gender === 0 ? 1 : 0;
                   $($tcGender[num]).attr('checked',true)
                }
            },
            error:function(){
                alert('错误');
            }
        }
        $.ajax(options);
        //    进行表单验证
        $('form').validate({
            submitHandler:function(){
                $('form').ajaxSubmit({
                    url:'/api/teacher/update',
                    type:'post',
                    data:{
                        tc_id:obj.tc_id
                    },
                    success:function(data){
                        if(data.code===200){
                            window.alert(data.msg)
                        }
                    },
                    error:function(){
                        window.alert('错误')
                    }
                })
            },
        //    规则
            rules:{
                tc_name:{
                    required:true,
                    rangelength:[2,4]
                },
                tc_join_date:{
                    required:true,
                    date:true
                }
            },
            message:{
                tc_name:{
                    required:'不能为空',
                    rangelength:'长度在2到4之间'
                },
                tc_join_date:{
                    required:'日期不能为空',
                    date:'格式不对'
                }
            }
        })
    //    日期的插件
        $('input[name="tc_join_date"]').datepicker({
            format:'yyyy/mm/dd'
        })
    })
})
