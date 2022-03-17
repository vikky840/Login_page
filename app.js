const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");
const { options } = require("request");
const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;
    
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                FNAME:firstName,
                LNAME:lastName
                }
            }
        ]
    };
    var jsonData=JSON.stringify(data);
    const url="https://us14.api.mailchimp.com/3.0/lists/7cb835c295";
    const options={
        method:"POST",
        auth:"vikky:43d37f589b9bc73350767dd846e45363-us14"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(req,res){
    console.log("server is running on port 3000");
});
// API Key
// 43d37f589b9bc73350767dd846e45363-us14

// List Id
// 7cb835c295