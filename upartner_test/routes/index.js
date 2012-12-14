/*
 * トップページ表示
 */
exports.index = function(req, res){
    //res.charset = 'ISO-8859-1';
    
        console.log(req.session.loginflg);
        console.log(req.session.user);
        /** ログイン状態チェック **/

        if(req.session.loginflg === '1'){
            res.render('index', { user : req.session.user,
                        title: 'U-PARTNER' ,
                        about: 'このサイトはEXPRESSで作られています。',
                        textarea2:''});
                        return;
        }else{
            res.render('top', { user : req.session.user,
                        title: 'U-PARTNER' ,
                        about: 'このサイトはEXPRESSで作られています。',
                        textarea2:''});
            }
};


/*
 * トークエリア
 */
exports.talk = function(req,res){
    var TextArea = req.body.textarea + req.body.talkarea + '\n';

        res.render('index', {
            user : req.session.user,
            title: 'U-PARTNER' ,
            about : 'Aさんが発言しました。',
            textarea2:TextArea
        });
        return;
};


/*
 * ログイン
 */
 exports.getLogin = function(req,res){
     res.redirect('/');
 }
 
 
exports.login = function(req ,res){


    var errmsg;

    // users model 読み込み
    var users = require('../models/users');    
    
    // 入力「ユーザ」「パスワード」取得
    var userid = req.body.user;
    var passwd = req.body.pass;
    
    // ユーザ入力チェック
    if (userid === null || userid === '' ){
        errmsg = "ユーザ・パスワードを入力してください。";
        res.render('index', {user : req.session.user,title: 'U-PARTNER' ,about : errmsg,textarea2:''});
        return;
    }
    // パスワード入力チェック
    if(passwd === null || passwd === '' ){
        errmsg = "ユーザ・パスワードを入力してください。";
        res.render('index', {user : req.session.user,title: 'U-PARTNER' ,about : errmsg,textarea2:''});
        return;
    }

    // データの取得
    users.findOne({userid:userid}, function(err , users){
        
        // ユーザ情報取得チェック
        if(users === null){
            errmsg = "ユーザが存在しません userid：" + userid;
            res.render('index', {user : req.session.user,title: 'U-PARTNER' ,about : errmsg,textarea2:''});
            return;
        }
        
        // パスワードチェック
        if(users.password === passwd){
            
            //セッションに格納する
            req.session.loginflg = '1';
            req.session.name = users.name;
            req.session.user = users.userid;
            req.session.pass = users.password;
            req.session.email = users.email;

            errmsg = "ログインに成功しました";
            res.render('index', {user : req.session.user,title: 'U-PARTNER' ,about : errmsg,textarea2:''});
            
        }else{
            errmsg = "ログインに失敗しました";
           res.render('index', {user : req.session.user,title: 'U-PARTNER' ,about : errmsg,textarea2:''});

        }
 
    });

};


/*
 * ログアウト
 */
 exports.getLogout = function(req,res){
     res.redirect('/');
 }


exports.logout = function(req,res){
    req.session.destroy();
    res.redirect('/');
}


