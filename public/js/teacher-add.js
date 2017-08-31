define(['jquery','template','util','datepicker','language','validate'],function($,template,util){
  // 设置导航菜单选中
  util.setMenu('/teacher/list');
  // 获取编辑讲师的ID
  var tcId = util.qs('tc_id');
  if(tcId){
    // 编辑讲师
    // 根据ID查询对应的讲师详细信息
    $.ajax({
      type : 'get',
      url : '/api/teacher/edit',
      data : {tc_id : tcId},
      dataType : 'json',
      success : function(data){
        // 解析数据渲染页面
        data.result.operate = '讲师编辑';
        var html = template('teacherTpl',data.result);
        $('#teacherInfo').html(html);
        // 绑定编辑的提交事件
        submitForm('/api/teacher/update');
      }
    });
  }else{
    // 添加讲师
    var html = template('teacherTpl',{operate : '讲师添加',tc_gender : 1});
    $('#teacherInfo').html(html);
    // 绑定添加的提交事件
    submitForm('/api/teacher/add');
  }

  // 实现表单提交功能
  function submitForm(url){
    $('#formId').validate({
      sendForm : false,
      valid : function(){
        // 提交表单
        console.log(123);
      },
      description : {
        tc_name : {
          required : '用户名不能为空',
          valid : '用户名可以使用'
        },
        tc_pass : {
          required : '密码不能为空',
          pattern : '必须是6位数字',
          valid : '密码有效'
        },
        tc_join_date : {
          required : '入职日期不能为空',
          valid : '日期有效'
        }
      }
    });
  }
  // function submitForm(url){
  //   $('#formBtn').click(function(){
  //     $.ajax({
  //       type : 'post',
  //       url : url,
  //       data : $('#formId').serialize(),
  //       dataType : 'json',
  //       success : function(data){
  //         if(data.code == 200){
  //           location.href = '/teacher/list';
  //         }
  //       }
  //     });
  //   });
  // }
  
});