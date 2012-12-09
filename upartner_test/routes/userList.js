/*
 * トップページ表示
 */
exports.index = function(req, res){


    // users model 読み込み
    var users = require('../models/users');    

    users.find( function(err , userlist){
        
        if(userlist !== null){
        res.render('userlist', { title : 'U-PARTNER'
                                ,about : 'ユーザ一覧'
                                ,userlist : userlist });
        }else{
            res.redirect('/');
        }    
    });



};
