var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
mongoose.Promise = Promise;
//连接数据库
mongoose.connect('mongodb://127.0.0.1/1608blog');
//定义Schema 定义集合的字段名称和类型
var UserSchema = new mongoose.Schema({
  username:String,
  password:String,
  email:String,
  avatar:String
},{collection:'user'});

//定义操作数据库的模型model
exports.User = mongoose.model('User',UserSchema);

var ArticleSchema = new mongoose.Schema({
  title:String,
  content:String,
  user:{type:ObjectId,ref:'User'} //外键 别人(User)家的主键
});
exports.Article = mongoose.model('Article',ArticleSchema);
