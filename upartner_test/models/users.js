//    //mongo ds033037.mongolab.com:33037/upartner -u upartner -p up08090326 
//    //mongodb://upartner:up08090326@ds033037.mongolab.com:33037/upartner
//    //mongolabのwebログインユーザはtetsuya

// mongooseを使ってmongodbのdatabaseに接続する（'users'db）
    var mongoose = require('mongoose');
    var db = mongoose.createConnection('mongodb://upartner:up08090326@ds033037.mongolab.com:33037/upartner');
  
// mongodbの接続確認を行う  
    db.on('error',console.error.bind(
      console, 'connection error:'));
    db.once('open',function callback(){
        //正常時の処理
        console.log('db connect successfully ');
    });

// データの取得に使うSchemaの定義
    var usersSchema = new mongoose.Schema({
        userid   : {type : String},
        password : {type : String},
        name     : {type : String},
        email    : {type : String}
    })

// コンパイルしたSchemaをmodelの中に入れる
    var users = db.model('users', usersSchema);
    //console.log(users);
 
module.exports = users;