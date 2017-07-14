require.config({
    baseUrl:'http://localhost/bxg/node_modules/',
    paths:{
        //jquery插件
        jquery:'./jquery/dist/jquery',
        //cookie可以存储数据
        cookie:'./jquery.cookie/jquery.cookie',
        //进度条
        nprogress:'./nprogress/nprogress',
        //模板
        template:'./art-template/lib/template-web',
        //模态框
        bootstrap:'./bootstrap/dist/js/bootstrap',
        //日期插件
        datepicker: './bootstrap-datepicker/dist/js/bootstrap-datepicker',
        //插件中的语言的设置
        zh: './bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min',
        //表单验证
        validate: './jquery-validation/dist/jquery.validate',
        //表单提交
        form: './jquery-form/dist/jquery.form.min',
        webuploader:'./webuploader/dist/webuploader',
        jsrop:'/bxg/assets/jcrop/js/jquery.Jcrop'
    },
    shim:{
        //bootstrap依赖于jquery插件
        bootstrap:{
            deps:['jquery']
        },
        //语言插件依赖于jquery和datepicker
        zh: {
            deps: ['jquery', 'datepicker']
        }
    }
})
