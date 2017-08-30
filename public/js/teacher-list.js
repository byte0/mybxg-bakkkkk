define(['jquery','template','util','bootstrap'],function($,template,util){
  // 设置导航菜单选中
  util.setMenu(location.pathname);
  // 请求后台接口获取列表数据
  $.ajax({
    type : 'get',
    url : '/api/teacher',
    dataType : 'json',
    success : function(data){
      // 解析数据并渲染页面
      var html = template('teacherTpl',{list : data.result});
      $('#teacherInfo').html(html);
      // 绑定预览点击事件
      $('.preveiw').click(function(){
        // 通过接口获取数据
        var tcId = $(this).closest('td').attr('data-tcId');
        $.ajax({
          type : 'get',
          url : '/api/teacher/view',
          data : {tc_id:tcId},
          dataType : 'json',
          success : function(data){
            // 解析数据渲染页面
            var html = template('modalTpl',data.result);
            $('#modalInfo').html(html);
            // 显示弹窗
            $('#teacherModal').modal();
          }
        });
      });
      // 处理启用注销功能
      $('.eod').click(function(){
        var td = $(this).closest('td');
        var tcId = td.attr('data-tcId');
        var tcStatus = td.attr('data-status');
        var that = this;// 点击的按钮
        $.ajax({
          type : 'post',
          url : '/api/teacher/handle',
          data : {tc_id : tcId,tc_status : tcStatus},
          dataType : 'json',
          success : function(data){
            td.attr('data-status',data.result.tc_status);
            if(data.result.tc_status == 0){
              $(that).html('注 销');
            }else{
              $(that).html('启 用');
            }
          }
        });
      });
    }
  });
});