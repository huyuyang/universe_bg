seajs.config({
    base:"./",
    paths:{
        'feUtil':'http://pic.my4399.com/re/cms/feUtil/',
        'js':window.cdnPath ? window.cdnPath+'/js' : 'js'
    },
    alias:{
        "jquery":"feUtil/jquery/1.7.2/jquery",
        "png":"feUtil/DD_belatedPNG/0.0.8a/DD_belatedPNG",
        "swfobject":"feUtil/swfobject/2.3.2/swfobject",
        "json":""
    },
    map:[
        [/^(.*\.(?:css|js))(.*)$/i, '$1?v=20160624'],
    ],  //map,批量更新时间戳
    charset: 'utf-8'
});

seajs.use("js/main");
