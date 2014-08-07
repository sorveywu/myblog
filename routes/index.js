var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var article = [
		{
			title: 'Ubuntu系统改变网卡的速度和双工',
			author: 'Sorvey',
			summary: 'Linux缺省会在网卡连接到路由器上时自动协商判断网卡的速度和双工。配置一个路由器端口自动协商速度和双工...',
			pic: '/images/pic.png',
			meta: {
				createAt: '2014/07/18',
				updateAt: '2014/07/18'
			}
		},
		{
			title: 'Ubuntu系统改变网卡的速度和双工',
			author: 'Sorvey',
			summary: 'Linux缺省会在网卡连接到路由器上时自动协商判断网卡的速度和双工。配置一个路由器端口自动协商速度和双工...',
			pic: '/images/pic.png',
			meta: {
				createAt: '2014/07/18',
				updateAt: '2014/07/18'
			}
		},
		{
			title: 'Ubuntu系统改变网卡的速度和双工',
			author: 'Sorvey',
			summary: 'Linux缺省会在网卡连接到路由器上时自动协商判断网卡的速度和双工。配置一个路由器端口自动协商速度和双工...',
			pic: '/images/pic.png',
			meta: {
				createAt: '2014/07/18',
				updateAt: '2014/07/18'
			}
		},
		{
			title: 'Ubuntu系统改变网卡的速度和双工',
			author: 'Sorvey',
			summary: 'Linux缺省会在网卡连接到路由器上时自动协商判断网卡的速度和双工。配置一个路由器端口自动协商速度和双工...',
			pic: '/images/pic.png',
			meta: {
				createAt: '2014/07/18',
				updateAt: '2014/07/18'
			}
		}
	]
  	res.render('index', { 
  		title: 'Express',
  		article: article
  	});
});

module.exports = router;
