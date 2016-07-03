var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"); 
    
mongoose.connect('mongodb://' + process.env.IP + '/nodeblog');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));


var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body:  String,
    created: {type:Date, default: Date.now}
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

app.get('/blogs/new', function(req, res) {
    res.render('new');
})

app.post('/blogs', function(req,res){
    Blog.create(req.body.blog, function(err, NewBlog){
       if(err){
           res.render('new');
           console.log(err);
       }   else {
           res.redirect('/blogs');
       }
    });
});

// show Route
app.get('/blogs/:id', function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('show', {blog: foundBlog});
        }
    })
})

// Edit route
app.get('/blogs/:id/edit', function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('edit', {blog: foundBlog});         
        }
    })
    
})

// UPDATE route
app.put('/blogs/:id', function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,updatedBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/' + req.params.id);
        }
    })
});

// title
// image
// body
// created

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('The Nodeblog Has started!');
});