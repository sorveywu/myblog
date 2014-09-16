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

function commit_submit(){
	var id = $("input[name='postId']").val();
	var email = $("input[name='email']").val();
	var nickname = $("input[name='nickname']").val();
	var commit = $("input[name='commit']").val();

	$.post('/commit-add', {id: id, email: email, nickname: nickname, commit: commit}, function(data){
		if(data == 'success'){
			alert('添加评论成功');
		}
	})
}