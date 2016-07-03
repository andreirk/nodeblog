var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"); 
    
mongoose.connect('mongodb://' + process.env.IP + '/nodeblog');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body:  String,
    created: {type:Date, dafault: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

// RESTful routs

app.get('/', function(req,res){
    res.redirect('/blogs');
});

app.get('/blogs', function(req,res){
    Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       }   else {
           res.render('index', {blogs: blogs});
       }
    });
  
});






// title
// image
// body
// created

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('The Nodeblog Has started!');
});