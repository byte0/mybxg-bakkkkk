define(['jquery','template','util','uploadify'],function($,template,util){
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
      // 处理课程封面的上传
      $('#upfile').uploadify({
        width : 80,
        height :30,
        buttonText : '选择图片',
        buttonClass : 'btn btn-success btn-sm upfilebtn',
        itemTemplate : '<span></span>',
        fileObjName : 'cs_cover_original',
        formData : {cs_id : csId},
        swf : '/public/assets/uploadify/uploadify.swf',
        uploader : '/api/uploader/cover',
        onUploadSuccess : function(f,data){
          var data = JSON.parse(data);
          // 修改图片的URL地址
          $('.preview img').attr('src',data.result.path);
        }
      });
    }
  });
});