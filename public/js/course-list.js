define(['jquery','template','util'],function($,template,util){
  // 设置导航菜单选中
  util.setMenu(location.pathname);
  // 调用接口，获取数据，渲染页面
  $.ajax({
    type : 'get',
    url : '/api/course',
    dataType : 'json',
    success : function(data){
      // 解析数据，渲染页面
      var html = template('courseTpl',{list : data.result});
      $('#courseInfo').html(html);
    }
  });

});