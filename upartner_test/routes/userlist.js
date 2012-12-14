
/**
 * userListFind
 **/ 
function userListFind(){
        // users model 読み込み
    var users = require('../models/users');    

    users.find( function(err , userlist){
        
        if(userlist !== null){
            return userlist;
        }else{
            return null;
        }    
    });
}

/*
 * トップページ表示
 */
exports.index = function(req, res){
    
//    var userlist = userListFind();
//
//    if(userlist !== null){
//        res.render('userlist', { title : 'U-PARTNER'
//                                ,about : 'ユーザ一覧'
//                                ,userlist : userlist });        
//    }else{
//        res.redirect();
//    }

    // users model 読み込み
    var users = require('../models/users');    

    users.find( function(err , userlist){
        
        if(userlist !== null){
        res.render('userlist', { user : req.session.user 
                                ,title : 'U-PARTNER'
                                ,about : 'ユーザ一覧'
                                ,userlist : userlist });
        }else{
            res.redirect('/');
        }    
    });
};


exports.userDelete = function(req,res){

    var selectId = req.body.selectId;
    
    if (selectId === null || selectId === ''){
        req.redirect('/userlist');
    }
    
    // user model 読み込み
    var users = require('../models/users');
    
    
    users.remove({_id : selectId},function(err){
        
        if(err === null || err === ''){
            
            // 削除後のユーザ一覧の取得
            users.find( function(err , userlist){
        
                if(userlist !== null){
                    res.render('userlist', { user : req.session.user 
                                            ,title : 'U-PARTNER'
                                            ,about : 'ユーザ一覧'
                                            ,userlist : userlist });        
                }else{
                    res.redirect();
                } 
            });
        }
        
    });



}

