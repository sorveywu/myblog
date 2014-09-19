$(function(){
   	var oDiv = document.getElementById("float");
   	var H = 0,iE6;
   	var Y = oDiv;
   	while(Y){
   		H += Y.offsetTop;
   		Y = Y.offsetParent};
   		iE6 = window.ActiveXObject && !window.XMLHttpRequest;
   		if(!iE6){
        	window.onscroll=function(){
	           var s = document.body.scrollTop || document.documentElement.scrollTop;
	           if(s>H){
	           		oDiv.className = "m-right-content u-float";
	           		if(iE6){
	           			oDiv.style.top=(s-H)+"px";
	           		}
	           	}else{
	           		oDiv.className="m-right-content";
	           	}
       	};
   	}
});

function comment_submit(){
	var id = $("input[name='postId']").val(),
		email = $("input[name='email']").val(),
		nickname = $("input[name='nickname']").val(),
		comment = $("#comment").val(),
		pattern=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]]\w+)*$/;
	if(!pattern.test(email)){
		alert('邮箱未填格式不正确！');
		$("input[name='email']").focus();
	}else if(trim(nickname) == ''){
		alert('昵称不能为空！');
		$("input[name='nickname']").focus();
	}else if(trim(comment) == ''){
		alert('请填写评论内容！');
		$("#comment").focus();
	}else{
		$.post('/comment-add', {id: id, email: email, nickname: nickname, comment: comment}, function(data){
			if(data){
				var html = '';
				html += '<div class="m-comments-box"><div class="u-comments-author"><div class="u-comments-floor f-fl">'+($('.m-comments-box').length+1)+'楼　'+data.nickname+'</div><div class="u-comments-date f-fr">发表于：'+data.createAt+'</div></div><div class="u-comments-content"><div class="u-comments-pic f-fl"><img class="img-thumbnail" src="http://www.gravatar.com/avatar/'+data.email.md5+'?size=48" alt="sorvey" /></div><div class="u-comments-body f-fr f-tal">'+data.body+'</div><div class="u-comments-tools f-fr f-tar"><a href="#">回复</a></div><div class="f-cl"></div></div></div>';
				$(html).insertBefore('.m-comments-box:first');
				$("input[name='email']").val('');
				$("input[name='nickname']").val('');
				$("#comment").val('');
				$("input[name='email']").focus();
			}else{
				alert('评论添加失败');
			}
		})
	}
}

function trim(str) { 
	return str.replace(/(^\s*)|(\s*$)/g, ""); 
} 