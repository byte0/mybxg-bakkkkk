define(['jquery','template','util'],function($,template,util){
  // 设置导航菜单
  util.setMenu('/course/add');
  // 获取课程ID
  var csId = util.qs('cs_id');
  // 查询课程封面信息
  $.ajax({
    type : 'get',
    url : '/api/course/picture',
    data : {cs_id : csId},
    dataType : 'json',
    success : function(data){
      // 渲染页面
      var html = template('pictureTpl',data.result);
      $('#pictureInfo').html(html);
    }
  });
});