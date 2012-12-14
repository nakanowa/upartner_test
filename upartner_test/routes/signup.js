/*
 * トップページ表示
 */
exports.index = function(req, res){
    //res.charset = 'ISO-8859-1';
  res.render('signup', { user : req.session.user 
                        ,title: 'U-PARTNER' ,
                        about: 'このサイトはEXPRESSで作られています。'
                        });
};

/*
 * サインアップ
 */
 exports.signup = function(req,res){
     res.redirect('/');  
 }
 
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
            res.render('signup', {
            user : req.session.user 
            ,title: 'U-PARTNER' ,
            about : '入力していない項目があります'
        });
        return;
    }
    
    // パスワードチェック
    if (adminpass !== confirmpass){
        res.render('signup', {
            user : req.session.user 
            ,title: 'U-PARTNER' ,
            about : 'パスワードに誤りがあります。'
        });
        return;
    }
    
        // データの取得
    users.findOne({userid:userid}, function(err , users){
        
        // ユーザ情報取得チェック
        if(users !== null ){
                    res.render('signup', {
                        user : req.session.user 
                        ,title: 'U-PARTNER' ,
                        about : "既にユーザが存在します"
                    });
                return;
        }
        
        // ユーザ情報取得チェック
        if(users.email === email){
                    res.render('signup', {
                        user : req.session.user 
                        ,title: 'U-PARTNER' ,
                        about : "既にユーザが存在します"
                    });
                return;
        } 
    });
   
        
    // アカウント情報の取得
    var user = new users();
    user.userid = userid;
    user.password = adminpass;
    user.name = username;
    user.email = email;


    // データの書き込み
    user.save(function(err){
        if(err){
            res.render('signup', {
            user : req.session.user 
            ,title: 'U-PARTNER' ,
            about : 'アカウント作成に失敗しました。'
            });
            return;
        }else{
            res.render('signup', {
            user : req.session.user 
            ,title: 'U-PARTNER' ,
            about : 'アカウントが作成されました。'
            });
            return;
        }
    });
    
        
        
};

