var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

(function() {
	var fs, http, qs, server, url;
	http = require('http');
	url = require('url');
	qs = require('querystring');
	fs = require('fs');
	
	var loginStatus = false, loginUser = "";
	
	server = http.createServer(function(req, res) {
		var action, form, formData, msg, publicPath, urlData, stringMsg;
		urlData = url.parse(req.url, true);
		action = urlData.pathname;
		publicPath = __dirname + "\\public\\";
		console.log(req.url);
		
		
		
		if (action === "/register") {
			console.log("Register");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Email:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						res.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							console.log(user);
							dbo.collection("user").count({"Email" : splitName[1]}, function(err, count){
								console.log(err, count);
								finalcount = count;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("user exist");
									db.close();
									return res.end("fail");
								}
								else
								{
									dbo.collection("user").insertOne(myobj, function(err, res) {
										if (err) throw err;
										console.log("1 document inserted");
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
								}
							});
						});
					});
				});
				
			} 
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "Register.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		} 
		else if( action ==="/newpage")
		{
			res.writeHead(200, {
				"Content-Type": "text/html"
			});
			return res.end("<h1>welcome to new page</h1><p><a href=\"/alexpage\">register</a></p>");
		}
		
		else if (action === "/login"){
			console.log("Login");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Email:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							console.log(user);
							dbo.collection("user").count({"Email" : splitName[1] , "password" : splitPassword[1] }, function(err, count){
								console.log(err, count);
								finalcount = count;
								console.log("myconut="+count);
								if(finalcount > 0)
								{
									console.log("Login success");
									db.close();
									return res.end(splitName[1]);
								}
								else
								{
										console.log("Login failed");
										db.close();
										//return res.end(msg);
									return res.end("fail");
								}
							});
						});
					});
				});
			}	
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "Login.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		} 
		else if (action === "/index"){
			console.log("Index");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Name:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);	
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						res.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
					});
				});
			}
		else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "index.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		} 
		else if (action === "/member"){
			console.log("Member_page");
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
							dbo.collection("user").count({"Email" : splitName[1]}, function(err, count){
								finalcount = count;
								console.log(finalcount);
								if(finalcount < 1)
								{
									console.log("Not have this user");
									db.close();
									return res.end("fail");
								}
								else
								{
									dbo.collection("favlist").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									{
										console.log("Data inserted");
										db.close();
										return res.end("OK");
										});
								}
							});
							dbo.collection("favlist").findOne({"Email" : splitName[1]}, function(err, result) {
							if (err) throw err;
							console.log(result);
							db.close();
							});
						});
					});
				});
			}

		else
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "member.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
						}
					});
				}
		}
		else if (action === "/readfavourlist")
		{
			console.log("readfavourlist");
			var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				usernameData = '';
				user= '';
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
					return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
				console.log("read favourite");
				MongoClient.connect(dbUrl, function(err, db) 
				{
					var finalcount;
					if (err) throw err;
					var dbo = db.db("database");
					dbo.collection("favlist").find({"Email" : splitName[1]}).toArray(function(err, result) 
					{
    				if (err) throw err;
    				console.log("result" + result);
    				db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
            return res.end(resultReturn);
					});
				});
			});
		});
	}
}
	else if (action === "/delfavcoffe1")
		{
		
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"c1.jpg"};

								
								{
								
										dbo.collection("usercoffe").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("del!");
											db.close();
										});

						}
							
		
						});
					});
				});
			} 
		
		}
		
		else if (action === "/delfavcoffe2")
		{
		
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"c2.jpg"};

								
								{
								
										dbo.collection("usercoffe").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("del!");
											db.close();
										});

						}
							
		
						});
					});
				});
			} 
		
		}
		
		else if (action === "/delfavcoffe3")
		{
		
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"c3.jpg"};

								
								{
								
										dbo.collection("usercoffe").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("del!");
											db.close();
										});

						}
							
		
						});
					});
				});
			} 
		
		}
		
		else if (action === "/delfavcoffe4")
		{
		
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"c4.jpg"};

								
								{
								
										dbo.collection("usercoffe").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("del!");
											db.close();
										});

						}
							
		
						});
					});
				});
			} 
		
		}
		
		else if (action === "/delfavcoffe5")
		{
		
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"c5.jpg"};

								
								{
								
										dbo.collection("usercoffe").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("del!");
											db.close();
										});

						}
							
		
						});
					});
				});
			} 
		
		}
		
		else if (action === "/delfavcoffe6")
		{
		
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"c6.jpg"};

								
								{
								
										dbo.collection("usercoffe").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("del!");
											db.close();
										});

						}
							
		
						});
					});
				});
			} 
		
		}
else if (action === "/addfav1")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1], "image":"c1.jpg", "name":"Honduras", "Flavor":"rich cocoa, calm atmosphere", "BakingDegree":"Medium baking", "Matching":"brownies, chocolate", "Button":"delete1"}];
								dbo.collection("usercoffe").countDocuments({"Email" : splitName[1], "image":"c1.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("usercoffe").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}
		else if (action === "/addfav2")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1], "image":"c2.jpg","name":"Guatemala", "Flavor":"strong cocoa, pleasant woody fragrance", "BakingDegree":"medium and deep baking", "Matching":"macaron", "Button":"delete2"}];
								dbo.collection("usercoffe").countDocuments({"Email" : splitName[1], "image":"c2.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("usercoffe").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}
		else if (action === "/API"){
			console.log("Index");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Name:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);	
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						res.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
					});
				});
			}
		else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "API.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		} 
		
else if (req.url === "/getapi")
			{
			console.log("readfavourlist");
			var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				usernameData = '';
				user= '';
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
					return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
				console.log("read favourite");
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("database");
  //Find all documents in the collection:
  dbo.collection("index").find({}).toArray(function(err, result){
						if (err) throw err;
					console.log(result);
					db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
						return res.end(resultReturn);
	});
});
});
});
}
	sendFileContent(res, "outputapi.html", "text/html");
}

else if (action === "/findapi"){
console.log("readfavourlist");
			var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				usernameData = '';
				user= '';
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
					return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
				console.log("read favourite");
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("database");
  //Find all documents in the collection:
  dbo.collection("index").find({}).toArray(function(err, result){
						if (err) throw err;
					console.log(result);
					db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
						return res.end(resultReturn);
	});
});
});
});
}
}
		else if (action === "/addfav3")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1], "image":"c3.jpg","name":"Nicaragua", "Flavor":"refreshing citrus aroma", "BakingDegree":"Medium baking", "Matching":"cheese cake", "Button":"delete3"}];
								dbo.collection("usercoffe").countDocuments({"Email" : splitName[1], "image":"c3.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("usercoffe").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}
		else if (action === "/addfav4")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1], "image":"c4.jpg","name":"Mandhelin", "Flavor":"calm herbal aroma", "BakingDegree":"Deep baking", "Matching":"salty snacks", "Button":"delete4"}];
								dbo.collection("usercoffe").countDocuments({"Email" : splitName[1], "image":"c4.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("usercoffe").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}
		else if (action === "/addfav5")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1], "image":"c5.jpg","name":"Brazil", "Flavor":"mellow and smooth", "BakingDegree":"medium and deep baking", "Matching":"strawberry cake", "Button":"delete5"}];
								dbo.collection("usercoffe").countDocuments({"Email" : splitName[1], "image":"c5.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("usercoffe").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}
		else if (action === "/addfav6")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1], "image":"c6.jpg","name":"Costa Rica", "Flavor":"soft and smooth", "BakingDegree":"Medium baking", "Matching":"muffins", "Button":"delete6"}];
								dbo.collection("usercoffe").countDocuments({"Email" : splitName[1], "image":"c6.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("usercoffe").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}
		
		else if (action === "/editFlavor1"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1],"name":"Honduras"};
									var newvalues = { $set: {"Email" : splitName[1], "Flavor" : splitFavlist[1]}};
									dbo.collection("usercoffe").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
				else if (action === "/editdegree1"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1],"name":"Honduras"};
									var newvalues = { $set: {"Email" : splitName[1], "BakingDegree" : splitFavlist[1]}};
									dbo.collection("usercoffe").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
		else if (action === "/editmatching1"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1],"name":"Honduras"};
									var newvalues = { $set: {"Email" : splitName[1], "Matching" : splitFavlist[1]}};
									dbo.collection("usercoffe").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
		//2
				else if (action === "/editFlavor2"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1],"name":"Guatemala"};
									var newvalues = { $set: {"Email" : splitName[1], "Flavor" : splitFavlist[1]}};
									dbo.collection("usercoffe").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
				else if (action === "/editdegree2"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1],"name":"Guatemala"};
									var newvalues = { $set: {"Email" : splitName[1], "BakingDegree" : splitFavlist[1]}};
									dbo.collection("usercoffe").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
		else if (action === "/editmatching2"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1],"name":"Guatemala"};
									var newvalues = { $set: {"Email" : splitName[1], "Matching" : splitFavlist[1]}};
									dbo.collection("usercoffe").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		//3
				else if (action === "/editFlavor3"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1],"name":"Nicaragua"};
									var newvalues = { $set: {"Email" : splitName[1], "Flavor" : splitFavlist[1]}};
									dbo.collection("usercoffe").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
				else if (action === "/editdegree3"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1],"name":"Nicaragua"};
									var newvalues = { $set: {"Email" : splitName[1], "BakingDegree" : splitFavlist[1]}};
									dbo.collection("usercoffe").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
		else if (action === "/editmatching3"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1],"name":"Nicaragua"};
									var newvalues = { $set: {"Email" : splitName[1], "Matching" : splitFavlist[1]}};
									dbo.collection("usercoffe").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
		//4
		
				else if (action === "/editFlavor4"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1],"name":"Mandhelin"};
									var newvalues = { $set: {"Email" : splitName[1], "Flavor" : splitFavlist[1]}};
									dbo.collection("usercoffe").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
				else if (action === "/editdegree4"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1],"name":"Mandhelin"};
									var newvalues = { $set: {"Email" : splitName[1], "BakingDegree" : splitFavlist[1]}};
									dbo.collection("usercoffe").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
		else if (action === "/editmatching4"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1],"name":"Mandhelin"};
									var newvalues = { $set: {"Email" : splitName[1], "Matching" : splitFavlist[1]}};
									dbo.collection("usercoffe").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		//5
				else if (action === "/editFlavor5"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1],"name":"Brazil"};
									var newvalues = { $set: {"Email" : splitName[1], "Flavor" : splitFavlist[1]}};
									dbo.collection("usercoffe").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
				else if (action === "/editdegree5"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1],"name":"Brazil"};
									var newvalues = { $set: {"Email" : splitName[1], "BakingDegree" : splitFavlist[1]}};
									dbo.collection("usercoffe").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
		else if (action === "/editmatching5"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1],"name":"Brazil"};
									var newvalues = { $set: {"Email" : splitName[1], "Matching" : splitFavlist[1]}};
									dbo.collection("usercoffe").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
		//6
				else if (action === "/editFlavor6"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1],"name":"Costa Rica"};
									var newvalues = { $set: {"Email" : splitName[1], "Flavor" : splitFavlist[1]}};
									dbo.collection("usercoffe").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
				else if (action === "/editdegree6"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1],"name":"Costa Rica"};
									var newvalues = { $set: {"Email" : splitName[1], "BakingDegree" : splitFavlist[1]}};
									dbo.collection("usercoffe").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
		else if (action === "/editmatching6"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1],"name":"Costa Rica"};
									var newvalues = { $set: {"Email" : splitName[1], "Matching" : splitFavlist[1]}};
									dbo.collection("usercoffe").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
		else if (action === "/deleteall")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1]};
								
								{
								
										dbo.collection("usercoffe").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("info deleted");
											db.close();
										});
									

						}
						//	}); 
		
						});
					});
				});
			} 
		
		}		
		
		
		
			
		else if (action === "/findfavourlist")
		{
			console.log("readfavourlist");
			var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				usernameData = '';
				user= '';
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
					return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
				console.log("read favourite");
				MongoClient.connect(dbUrl, function(err, db) 
				{
					var finalcount;
					if (err) throw err;
					var dbo = db.db("database");
					dbo.collection("usercoffe").find({"Email" : splitName[1]}).toArray(function(err, result) 
					{
						if (err) throw err;
					console.log(result);
					db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
            return res.end(resultReturn);
					});
				});
					});
				});
			}
		}
			
				else if (action === "/member"){
			console.log("Member_page");
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
							dbo.collection("user").count({"Email" : splitName[1]}, function(err, count){
								finalcount = count;
								console.log(finalcount);
								if(finalcount < 1)
								{
									console.log("Not have this user");
									db.close();
									return res.end("fail");
								}
								else
								{
									dbo.collection("favlist").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									{
										console.log("Data inserted");
										db.close();
										return res.end("OK");
										});
								}
							});
							dbo.collection("favlist").findOne({"Email" : splitName[1]}, function(err, result) {
							if (err) throw err;
							console.log(result);
							db.close();
							});
						});
					});
				});
			}	
		else if (action === "/removefavourlist")
		{
			if (req.method === "POST") {
				console.log("action = post");
				delfavData = '';
				delfav = '';
				return req.on('data', function(data) {
					delfavData += data;
					console.log("delfavlist data="+ delfavData);
					return req.on('end', function() {
						var delfavlist;
						delfavlist = qs.parse(delfavData);
						delfav = JSON.stringify(delfavlist);
						console.log("delfav"+delfav);
						stringdelfav = JSON.parse(delfav);
						var splitdelfav = delfavData.split("&");
						console.log("splitdelfav="+splitdelfav);
						var tempSplitName = splitdelfav[1];

						var tempSplitDelfavlist = splitdelfav[2];
						
						var splitName = tempSplitName.split("=");
						var splitDelfavlist = tempSplitDelfavlist.split("=");
						console.log(splitName[1]);
						console.log(splitDelfavlist[1]);
				MongoClient.connect(dbUrl, function(err, db) {
							if (err) throw err;
							var dbo = db.db("database");
				dbo.collection("favlist").remove({"Email" : splitName[1], "favlist" : splitDelfavlist[1]}, function(err, obj)
                {
    				if (err) throw err;
    				console.log("1 document deleted");
    				db.close();
					return res.end("OK");
					});
                
              });
            });
          });
		}
	}	
				}
		else 
		{
      //handle redirect
			if(req.url === "/index")
			{
        if(loginStatus)
				{
					sendFileContent(res, "loginindex.html", "text/html");
				}
				else
				{
					sendFileContent(res, "finalindex.html", "text/html");
				}
			}
		
			else if (req.url === "/Signuppage")
			{
				sendFileContent(res, "signuppage.html", "text/html");
			}
			else if (req.url === "/loginpage")
			{
				sendFileContent(res, "loginpage.html", "text/html");
			}
			else if (req.url === "/logout")
			{
				loginStatus = false;
				loginUser = "";
				sendFileContent(res, "finalindex.html", "text/html");
			}
			else if (req.url === "/hklawprivacy")
			{
				sendFileContent(res, "text_hklawprivacy.html", "text/html");
			}
      else if (req.url === "/member_mainpage")
			{
				sendFileContent(res, "member_mainpage.html", "text/html");
			}	
			else if (req.url === "/MyAPI")
			{
				sendFileContent(res, "MyAPI.html", "text/html");
			}	
	  else if (req.url === "/member_favlist")
			{
				sendFileContent(res, "member_favlist.html", "text/html");
			}
	  else if (req.url === "/API")
			{
				sendFileContent(res, "API.html", "text/html");
			}
      else if (req.url === "/socialnetwork")
			{
				sendFileContent(res, "text_socialnetwork.html", "text/html");
			}
      else if (req.url === "/favlistpage")
			{
				sendFileContent(res, "favouritelistpage.html", "text/html");
			}else if (req.url === "/abuse")
			{
				sendFileContent(res, "article4.html", "text/html");
			}else if (req.url === "/manage")
			{
				sendFileContent(res, "article3.html", "text/html");
			}else if (req.url === "/use")
			{
				sendFileContent(res, "article2.html", "text/html");
			}else if (req.url === "/food")
			{
				sendFileContent(res, "article1.html", "text/html");
			}
			else if(req.url === "/"){
				console.log("Requested URL is url" + req.url);
				res.writeHead(200, {
					'Content-Type': 'text/html'
				});
				res.write('<b>testpage</b><br /><br />This is the default response.');
			}	  
			
			

	
			
			else if(/^\/[a-zA-Z0-9\/_.-]*.js$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/javascript");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.css$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/css");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.jpg$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/jpg");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.mp4$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/mp4");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.ico$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/ico");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.ttf$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/ttf");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.woff$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/woff");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.png$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/png");
			}else{
				console.log("Requested URL is: " + req.url);
				res.end();
			}
		 }
	});

	server.listen(9999);

	console.log("Server is running，time is" + new Date());


	function sendFileContent(response, fileName, contentType){
		fs.readFile(fileName, function(err, data){
			if(err){
				response.writeHead(404);
				response.write("Not Found!");
			}else{
				response.writeHead(200, {'Content-Type': contentType});
				response.write(data);
			}
			response.end();
		});
	}
 }).call(this);