var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();
var swig = require('swig');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));

app.engine('html',swig.renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'build')));//静态资源

//http://service.exmail.qq.com/cgi-bin/help  
var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
    host: 'smtp.exmail.qq.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'yourqq@qq.com',
        pass: 'password'
    }
});

/*  router */
app.get('/', function(req, res) {
	res.render('index');
})
app.get('/success', function(req, res) {
	res.render('success');
})

app.post('/join', function(req, res){
	var name = req.body.name,
		sex = req.body.sex,
		phone = req.body.phone,
		email = req.body.email,
		qq = req.body.qq,
		age = req.body.age,
		address =  req.body.address,
		school = req.body.school,
		schooladdress = req.body.schooladdress,
		des = req.body.des,
		book = req.body.book;

	var mailOptions = {
		from: "yourqq@qq.com",
		to: "toqq@qq.com",
		subject: "node邮件",
		html: 	"<b>姓名：&nbsp;&nbsp;</b>"+name+"<br>"+
				"<b>性别：&nbsp;&nbsp;</b>" + sex + "<br>"+
				"<b>电话：&nbsp;&nbsp;</b>" + phone + "<br>"+
				"<b>邮箱：&nbsp;&nbsp;</b>" + email + "<br>"+
				"<b>QQ：&nbsp;&nbsp;</b>" + qq + "<br>"+
				"<b>年龄：&nbsp;&nbsp;</b>" + age + "<br>"+
				"<b>联系地址：&nbsp;&nbsp;</b><br><div style='margin-left:20px;margin-top:20px'>" + address + "</div><br>"+
				"<b>所在院校及专业：&nbsp;&nbsp;</b><br><div style='margin-left:20px;margin-top:20px'>" + school + "</div><br>"+
				"<b>学校地址：&nbsp;&nbsp;</b><br><div style='margin-left:20px;margin-top:20px'>" + schooladdress + "</div><br>"+
				"<b>跟我们说说你的大学吧：&nbsp;&nbsp;</b><br><div style='margin-left:20px;margin-top:20px'>" + des + "</div><br>"+
				"<b>个人书单及评价：&nbsp;&nbsp;</b><br><div style='margin-left:20px;margin-top:20px'>" + book + "</div><br>"
	}

	smtpTransport.sendMail(mailOptions, function(err, resp){
		if(err){
			console.log("error message:" + err);
			res.send({
				code: 201,
				msg: "报名失败，请重试"
			})
		}else{
			res.send({
				code: 200,
				msg: "报名成功"
			})
			//console.log("Message sent:" + JSON.stringify(resp.response))
		}
		smtpTransport.close();//关闭连接池
	});


});


/*  listen port */
var http = require('http');
var server = http.createServer(app);
//test 4002
//var port = 4002;
//deploy
var port = 4100;
server.listen(port);
console.log('server creat port is '+port)
server.on('error', onError);
//server.on('listening', onListening);



/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
