define(['jquery','template','util','bootstrap','form'],function($,template,util){
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

      // 提交表单公共方法
      function submitForm(url,ctCsId,ctId){
        $('#modalBtn').click(function(){
          var param = {ct_cs_id : ctCsId};
          if(ctId){
            // 编辑的时候需要提供课时ID
            param.ct_id = ctId;
          }
          $('#modalForm').ajaxSubmit({
            type : 'post',
            url : url,
            data : param,
            dataType : 'json',
            success : function(data){
              if(data.code == 200){
                location.reload();
              }
            }
          });
        });
      }

      // 实现添加课时功能
      $('#addBtn').click(function(){
        var html = template('modalTpl',{operate: '添加课时'});
        $('#modalInfo').html(html);
        $('#chapterModal').modal();
        submitForm('/api/course/chapter/add',csId);
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
            submitForm('/api/course/chapter/modify',csId,ctId);
          }
        });
        // 显示弹窗
        $('#chapterModal').modal();
      });
    }
  });
});