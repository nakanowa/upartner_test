
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , signup = require('./routes/signup')
  , userList = require('./routes/userlist')
  , http = require('http')
  , path = require('path');

//var app = express();
var app = module.exports = express();


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({secret:"Keyboard cat"}));
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});



// ルート定義
app.get('/', routes.index);
app.post('/', routes.talk);
app.post('/login', routes.login);
app.get('/login', routes.getLogin);
app.post('/logout', routes.logout);
app.get('/logout', routes.getLogout);
app.get('/user', user.list);

app.get('/signup', signup.index);
app.post('/do', signup.signup);
app.get('/do', signup.getSignup);

app.post('/userlist', userList.index);
app.post('/userdelete', userList.userDelete);


http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});



