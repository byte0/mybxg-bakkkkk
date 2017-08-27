
NProgress.start();
NProgress.done();

$('.navs ul').prev('a').on('click', function () {
	$(this).next().slideToggle();
});

// 实现退出功能
$('#logoutBtn').click(function(){
    console.log(123);
    $.ajax({
        type : 'post',
        url : '/api/logout',
        dataType : 'json',
        success : function(data){
            if(data.code == 200){
                // 退出成功
                location.href = '/main/login';
            }
        }
    });
    return false;
});