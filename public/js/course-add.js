define(['jquery','template','util','validate','form'],function($,template,util){
  // 设置导航菜单
  util.setMenu(location.pathname);
  // 验证并提交表单
  $('#addCourse').validate({
    sendForm : false,
    valid : function(){
      // 验证通过，提交表单
      $(this).ajaxSubmit({
        type : 'post',
        url : '/api/course/create',
        dataType : 'json',
        success : function(data){
          if(data.code == 200){
            location.href = '/course/basic?flag=1&cs_id=' + data.result.cs_id;
          }
        }
      });
    }
  });

    
});