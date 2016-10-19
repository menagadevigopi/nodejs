
var http = require('http');
/*var fs = require('fs');*/
var express=require('express');
var app=express();
var path=require('path');
var bodyParser = require('body-parser')
var enterdname;
var enterdpasswrd;
var newusername;
var newpasswrd;
var name;
var pass;

/*http.createServer(function(req, res){
	console.log(req.url);
	if(req.url=='/'||req.url=='/index.html'){
        var filename='index.html';
     sendResponse(200,filename);

	}
		else if(req.url=='/home.html'){
         var filename=req.url.replace('/',"");
		sendResponse(200,filename)
	} 
	else{
		res.end();
	}
	
   function sendResponse(status,filename){
   	var html=fs.readFileSync(filename,'utf8');
    res.writeHead(status, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();
}
}).listen(8000);*/
app.use(express.static(path.join(__dirname, '/public'))); 
app.use(express.static(path.join(__dirname,'/images')));
app.use(bodyParser.urlencoded({
    extended: true
})); 
app.get('/home.html',function(req,res){
		res.sendFile(__dirname+'/home.html');
})
app.get('/',function(req,res){
		res.sendFile(__dirname+'/home.html');
})
app.get('/login.html',function(req,res){
		res.sendFile(__dirname+'/login.html');
})
app.get('/signup.html',function(req,res){
		res.sendFile(__dirname+'/signup.html');
})
app.get('/fpasswrd.html',function(req,res){
		res.sendFile(__dirname+'/fpasswrd.html');
})
app.get('/main.html',function(req,res){
		res.sendFile(__dirname+'/main.html');
})




var server = app.listen(5000);
// to connect with database
var mongo=require('mongodb');
var mongoClient=mongo.MongoClient;
var url="mongodb://abc:abc@ds061076.mlab.com:61076/userdata";
mongoClient.connect(url,function(err,db){
  var uc=db.collection("blog"); 
  var us=db.collection("post"); 
  us.find().toArray(function(err,doc){
  	var data=doc;
app.get('/postdata',function(req,res){
	res.send(data);
})

app.post('/postdata',function(req,res){
	var title=req.body.title;
	var content=req.body.content;
	var date=req.body.date;
	var author=req.body.author;
	us.insert({name:title,content:content,date:date,author:author})
	data.push({name:title,content:content,date:date,author:author})
	res.send(data);
	res.redirect("/main.html");
})
})
  
//funct for login 
app.post('/home',function(Req,Res){
	 enterdname=Req.body.uname;
	 enterdpasswrd=Req.body.password;
	
	uc.find({username:enterdname,password:enterdpasswrd}).toArray(function(err,docs){
		if(docs.length){
			Res.redirect("/main.html");
		}
		else{
			Res.redirect("/signup.html");
		}
	});
})
//func for signup
app.post('/data',function(req,res){
	newusername=req.body.newname;
	newpasswrd=req.body.newpass;
    
	uc.find({username:newusername}).toArray(function(err,docs){
		if(docs.length==0){
			uc.insert({username:newusername,password:newpasswrd});
			res.redirect("/login.html");
		}
		else{
			res.redirect("/signup.html");
		}
	});
	
})
app.post('/new',function(req,res){
	name=req.body.username;
	pass=req.body.curntpass;
    uc.update({'username':name},{$set:{'password':pass}})
	res.redirect('/login.html')
})
})