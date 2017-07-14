 /*讲师列表页面
 功能1:获取讲师的信息并展示
 功能2:点击查看,展示讲师详细信息
 * */
 console.log(5555);
 require(['/bxg/assets/js/config.js'],function(){
   require(['jquery','template','bootstrap','/bxg/assets/js/common.js'],function($,template){
   //    功能1:获取讲师信息并展示
       getTeacherList();
   // 功能2:点击查看按钮,
       getDetailInfo();
   //    功能3:注销启用
       stopOrStart();
   //    功能1:
       function getTeacherList() {
           var options={
               url:'/api/teacher',
               success:function(data){
                   console.log(data);
                   if(data.code === 200){
                   //    把数据呈现到页面中
                       var result=template('tmp1-list',{list:data.result});
                       // console.log(result);
                       $('#list').html(result);
                   }else{
                       window.alert('没有拿到数据');
                   }
               },
               error:function(){
                   window.alert('不允许你获得数据')
               }
           }
           $.ajax(options);
       }
   //    功能2:点击查看按钮
       function getDetailInfo (){
       //    由于按钮是动态生成的,使用事件委托
           $('#list').on('click','.preview',function(){
               console.log('点击成功');
               $('#teacherModal').modal();
           //    发请求获取讲师的详细信息
               var tcId=$(this).closest('tr').attr('tc-id');
               var options={
                   type:'get',
                   url:'/api/teacher/view',
                   data:{
                       tc_id:tcId
                   },
                   success:function(data){
                       if(data.code === 200){
                           var obj = data.result;
                           var result = `
              <tr>
                      <th>姓名:</th>
                                <td>${obj.tc_name}</td>
                                <th>职位:</th>
                                <td colspan="3">讲师</td>
                                <td rowspan="4" width="128">
                                    <div class="avatar">
                                        <img src="${obj.tc_avatar}" alt="">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>花名:</th>
                                <td>${obj.tc_roster}</td>
                                <th>年龄:</th>
                                <td colspan="">${getAge(obj.tc_birthday)}</td>
                            </tr>
                            <tr>
                                <th>性别:</th>
                                <td>${obj.tc_gender === '0' ? '男' : '女'}</td>
                                <th>入职日期日期:</th>
                                <td colspan="3">${obj.tc_join_date}</td>
                            </tr>
                            <tr>
                                <th>手机号码:</th>
                                <td colspan="2">${obj.tc_cellphone}</td>
                                <th>邮箱:</th>
                                <td colspan="2">${obj.tc_email}</td>
                            </tr>
                            <tr>
                                <th>籍贯:</th>
                                <td colspan="6">${obj.tc_hometown}</td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <div class="introduce">
                                    ${obj.tc_introduce}
                                    </div>
                                </td>
                  </tr>
              `
                           $('#modal-list').html(result);
                       }
                   },
                   error:function(){
                       console.log('出错了')
                   }
               }
               $.ajax(options);
               console.log(tcId);
           })
       }
   //    功能3:点击注销,变化
       function stopOrStart(){
           $('#list').on('click','.start-stop',function(){
               console.log('点击启用');
               var $this=$(this);
               var $tr=$this.closest('tr');
               //讲师的id
               var tcId=$tr.attr('tc-id');
               //讲师的状态
               var tcStatus=$tr.attr('tc-status');
               console.log(tcStatus)
               var options={
                   type:'post',
                   url:'/api/teacher/handle',
                   data:{
                       tc_id:tcId,
                       tc_status:tcStatus
                   },
                   success:function(data){
                       if(data.code === 200){
                           var str=data.result.tc_status === 0 ? '注销':'启用';
                       //    把讲师的状态保存到tr中,下次点击a标签时需要使用
                           $tr.attr('tc-status',data.result.tc_status);
                           $this.text(str);
                       }
                   }
               };
               $.ajax(options);
           })
       }

   //    传入的出生日期,返回年龄
       function getAge(birth){
           var birthYear = new Date(birth).getFullYear();//根据参数生成对应的时间
           var nowYear = new Date().getFullYear();
           return nowYear - birthYear;
       }
       //让所有的模板中都可以使用该方法,
       //template.defaults.imports是固定的
       //过滤器,给模板中提供方法
       template.defaults.imports.getTecAge = getAge;
   })
 })