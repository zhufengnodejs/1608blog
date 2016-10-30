var mongoose = require('mongoose');
mongoose.Promise = Promise;
//连接数据库
mongoose.connect('mongodb://127.0.0.1/1608blog');
//定义Schema 定义集合的字段名称和类型
var UserSchema = new mongoose.Schema({
  username:String,
  password:String,
  email:String
},{collection:'user'});

//定义操作数据库的模型model
exports.User = mongoose.model('User',UserSchema);
