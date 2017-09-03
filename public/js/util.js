define(['jquery'],function($){
  // 工具函数
  return {
    setMenu : function(path){
      $('.navs a[href="'+path+'"]').addClass('active').closest('ul').show();
    },
    qs : function(key){
      // 获取URL参数中指定的参数值
      // param是所有的参数（uname=lisi&age=12）
      var param = location.search.substring(1);// 删除参数的第一个问号
      var result = null;
      if(param){
        var kvs = param.split('&');
        $.each(kvs,function(i,item){
          var kv = item.split('=');
          if(key == kv[0]){
            // 找到对应参数
            result = kv[1];
            return false;// 终止循环
          }
        });
      }
      return result;
    }
  }
});