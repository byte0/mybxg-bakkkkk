define(['jquery'],function($){
  // 监控ajax状态
  $(document).ajaxStart(function(){
    $('.overlay').show();
  });
  $(document).ajaxStop(function(){
    setTimeout(function(){
      $('.overlay').hide();
    },100);
  });
});