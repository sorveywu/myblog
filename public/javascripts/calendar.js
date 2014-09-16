var Calendar = function(objName){
	this.obj = document.getElementById(objName);
	this.init();
}

Calendar.prototype = {
	oNext: null,
	oPrev: null,

	init: function(){
		var now     = new Date();
		this.year  = now.getFullYear();	//获取当前年份
		this.month = now.getMonth();		//获取当前月份
		this.fillDate(this.year, this.month);
	},
	fillDate: function(year, month){
		var today            = new Date().getDate();			//获取今天日期
		var firstDay         = new Date(year, month, 1).getDay();	//获取当月第一天是星期几
		var front            = firstDay == 0 ? 7 : firstDay;	//开头空几格
		var lastDay          = new Date(year, month+1, 0).getDate(); 	//获取当月最后一天是几号
		var lastMonthLastDay = new Date(year, month, 0).getDate();	//获取上月最后一天是几号
		var end 			 = 42 - front - lastDay;	//末尾空几格
		var html = '';
		html += '<div class="u-calendar-box"><div id="u-calendar-prev" class="u-calendar-prev glyphicon glyphicon-chevron-left"></div><div id="u-calendar-next" class="u-calendar-next glyphicon glyphicon-chevron-right"></div>';
		html += '<span class="u-calendar-head"></span><span class="u-calendar-head">M</span><span class="u-calendar-head"></span><span class="u-calendar-head">W</span><span class="u-calendar-head"></span><span class="u-calendar-head">F</span><span class="u-calendar-head"></span>';
		for( var i = front; i>0; i--){
			if(month == 0){
            	html += '<span data-toggle="tooltip" data-placement="left" title="'+(year-1)+'-'+12+'-'+(lastMonthLastDay-i+1)+'"></span>';
            }else{
            	html += '<span data-toggle="tooltip" data-placement="left" title="'+year+'-'+(month)+'-'+(lastMonthLastDay-i+1)+'"></span>';
            }
        }

        for( var i = 1; i<=lastDay; i++){   
            html += '<span class="u-calendar-main" data-toggle="tooltip" data-placement="left" title="'+year+'-'+(month+1)+'-'+i+'"></span>';
        }

        for( var i=1; i<=end; i++){
        	if(month == 11){
        		html += '<span data-toggle="tooltip" data-placement="left" title="'+(year+1)+'-'+1+'-'+i+'"></span>';
        	}else{
            	html += '<span data-toggle="tooltip" data-placement="left" title="'+year+'-'+(month+2)+'-'+i+'"></span>';
        	}
        }
	
		html += '</div>';
		this.obj.innerHTML = html;
		this.prev();
		this.next();
	},
	prev: function(){
		var _that = this;
		this.oPrev = document.getElementById('u-calendar-prev');
		this.oPrev.onclick = function(){
			_that.month --;
            if(_that.month < 0){
                _that.month = 11;
                _that.year--;
            }
             _that.fillDate(_that.year,_that.month);
		}
	},
	next:function(){
        var _that = this;
        this.oNext = document.getElementById("u-calendar-next"); 
        this.oNext.onclick = function(){
            _that.month ++;
            if(_that.month>11){
                _that.month = 0;
                _that.year++;
            }
            // 填充日历
            _that.fillDate(_that.year,_that.month);
        }
    }

}

$(function(){
	$('.u-calendar').on('mouseover','span[data-toggle=tooltip]',function() {
		var date = $(this).attr('title');
		$.post('/count', {date: date}, function(doc){
			alert(doc);
		})
		$(this).tooltip('show');
		$(this).css('border', '1px solid #000');
	})
	$('.u-calendar').on('mouseout','span[data-toggle=tooltip]',function() {
		$(this).css('border', 'none');
	})
})