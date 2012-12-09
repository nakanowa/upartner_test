/*
 * トップページ表示
 */
exports.index = function(req, res){
    //res.charset = 'ISO-8859-1';
  res.render('index', { title: 'U-PARTNER' ,
                        about: 'このサイトはEXPRESSで作られています。',
                        textarea2:''});
};


/*
 * トークエリア
 */
exports.talk = function(req,res){
    var TextArea = req.body.textarea + req.body.talkarea + '\n';

        res.render('index', {
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


    // users model 読み込み
    var users = require('../models/users');    
    
    // 入力「ユーザ」「パスワード」取得
    var userid = req.body.user;
    var passwd = req.body.pass;
    
    // ユーザ入力チェック
    if (userid === null || userid === '' ){
        res.render('index', {
            title: 'U-PARTNER' ,
            about : 'ユーザ・パスワードを入力してください。',
            textarea2: ''
        });
        return;
    }
    // パスワード入力チェック
    if(passwd === null || passwd === '' ){
        res.render('index', {
            title: 'U-PARTNER' ,
            about : 'ユーザ・パスワードを入力してください。',
            textarea2: ''
        });
        return;
    }

    // データの取得
    users.findOne({userid:userid}, function(err , users){
        
        // ユーザ情報取得チェック
        if(users === null){
            console.log('1');
            res.render('index', {
                title: 'U-PARTNER' ,
                about : "ユーザが存在しません userid：" + userid,
                textarea2: ''
            });
        return;
        }
        
        // パスワードチェック
        if(users.password === passwd){
            res.render('index', {
                title: 'U-PARTNER' ,
                about : 'ログインに成功しました',
                textarea2: ''
            });
        }else{
            res.render('index', {
                title: 'U-PARTNER' ,
                about : 'ログインに失敗しました',
                textarea2: ''
            });
        }
 
    });
    
   

};