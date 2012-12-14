/** ログイン状態チェック **/
var login_check = function(req, res, next){
    if(req.session.loginflg === "1"){
        next();
    }else{
        res.redirect('/');
    }
};