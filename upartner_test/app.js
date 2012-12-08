
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
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
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

///** ログイン状態チェック
//var login_check = function(req, res, next){
//    if(req.session.login === true){
//        next()
//    }else{
//        res.redirect('/')
//    }
//}
//*/

// ルート定義
app.get('/', routes.index);
app.post('/', routes.talk);
app.post('/login', routes.login);
app.post('/signup', routes.signup);
app.get('/user', user.list);



http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});



