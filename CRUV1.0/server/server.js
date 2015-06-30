var restify     =   require('restify');
var mongojs     =   require('mongojs');
var morgan      =   require('morgan');
var db          =   mongojs('mongodb://root:root@ds061391.mongolab.com:61391/integrador', ['usuarios', 'Retos', 'Problemas', 'Objetivos']);
var server      =   restify.createServer();
var nodemailer 	=	require('nodemailer');

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(morgan('dev')); // LOGGER
 
// CORS
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
 
server.listen(process.env.PORT || 9804, function () {
    console.log("Server started @ ",process.env.PORT || 9804);
});

//var manageUsers = require('./auth/manageUser');

var manageUsers = require('./auth/manageUser')(server, db);

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'jcsudea@gmail.com',
		pass: 'jcsudea123'
	}
});

var mailOptions = {
    from: 'Gamification App ✔ <jcsudea@gmail.com>', // sender address
    to: 'sebasj14@gmail.com, carito9994@gmail.com, jaime951@gmail.com', // list of receivers
    subject: 'Pruebas ✔', // Subject line
    text: 'Hola, esto es una prueba del envío de correos con Nodemailer ✔', // plaintext body
    html: '' // html body
};
/*
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});*/