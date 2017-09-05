define(['jquery','template','util','bootstrap'],function($,template,util){
  // 设置导航菜单选中
  util.setMenu('/course/list');
  // 获取课程ID
  var csId = util.qs('cs_id');
  // 根据课程ID获取课时信息
  $.ajax({
    type : 'get',
    url : '/api/course/lesson',
    data : {cs_id:csId},
    dataType : 'json',
    success : function(data){
      // 渲染页面
      var html = template('lessonTpl',data.result);
      $('#lessonInfo').html(html);
      // 实现添加课时功能
      $('#addBtn').click(function(){
        var html = template('modalTpl',{operate: '添加课时'});
        $('#modalInfo').html(html);
        $('#chapterModal').modal();
      });
      $('.editLesson').click(function(){
        var ctId = $(this).attr('data-ctId');
        // 获取最新的课时数据
        $.ajax({
          type : 'get',
          url : '/api/course/chapter/edit',
          data : {ct_id : ctId},
          dataType : 'json',
          success : function(data){
            data.result.operate = '编辑课时';
            var html = template('modalTpl',data.result);
            $('#modalInfo').html(html);
          }
        });
        // 显示弹窗
        $('#chapterModal').modal();
      });
    }
  });
});