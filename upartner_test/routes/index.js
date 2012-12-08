/*
 * トップページ表示
 */
exports.index = function(req, res){
    //res.charset = 'ISO-8859-1';
  res.render('index', { title: 'Express' ,
                        about: 'このサイトはEXPRESSで作られています。',
                        textarea2:''});
};


/*
 * トークエリア
 */
exports.talk = function(req,res){
    var TextArea = req.body.textarea + req.body.talkarea + '\n';

        res.render('index', {
            title: 'Express' ,
            about : 'Aさんが発言しました。',
            textarea2:TextArea
        });
        return;
};


/*
 * サインアップ
 */
exports.signup = function(req, res){
    
    // users model 読み込み
    var users = require('../models/users');    
    
    var username = req.body.username;
    var userid = req.body.user;
    var email = req.body.email;
    var adminpass = req.body.adminpass;
    var confirmpass = req.body.confirmpass;
    
    // 入力チェック
    if (username === '' || userid === '' || email === '' || adminpass === '' || confirmpass === ''){
            res.render('index', {
            title: 'Express' ,
            about : '入力していない項目があります',
            textarea2: ''
        });
        return;
    }
    
    // パスワードチェック
    if (adminpass !== confirmpass){
        res.render('index', {
            title: 'Express' ,
            about : 'パスワードに誤りがあります。',
            textarea2: ''
        });
        return;
    }
        
    // アカウント情報の取得
    var user = new users();
    user.userid = userid;
    user.password = adminpass;
    user.name = username;
    user.email = email;
    
    // データの書き込み
    user.save(function(err){
        if(err){
            res.render('index', {
            title: 'Express' ,
            about : 'アカウント作成に失敗しました。',
            textarea2: ''
            });
            return;
        }else{
            res.render('index', {
            title: 'Express' ,
            about : 'アカウントが作成されました。',
            textarea2: ''
            });
            return;
        }
    });
    
        
        
};

/*
 * ログイン
 */
exports.login = function(req ,res){


    // users model 読み込み
    var users = require('../models/users');    
    
    // 入力「ユーザ」「パスワード」取得
    var userid = req.body.user;
    var passwd = req.body.pass;
    
    // ユーザ入力チェック
    if (userid === null || userid === '' ){
        res.render('index', {
            title: 'Express' ,
            about : 'ユーザ・パスワードを入力してください。',
            textarea2: ''
        });
        return;
    }
    // パスワード入力チェック
    if(passwd === null || passwd === '' ){
        res.render('index', {
            title: 'Express' ,
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
                title: 'Express' ,
                about : "ユーザが存在しません userid：" + userid,
                textarea2: ''
            });
        return;
        }
        
        // パスワードチェック
        if(users.password === passwd){
            res.render('index', {
                title: 'Express' ,
                about : 'ログインに成功しました',
                textarea2: ''
            });
        }else{
            res.render('index', {
                title: 'Express' ,
                about : 'ログインに失敗しました',
                textarea2: ''
            });
        }
 
    });
    
   

};