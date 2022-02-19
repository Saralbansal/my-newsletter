const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express(); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req, res) {
res.sendFile(__dirname + "/signup.html");
});
app.post ("/", function(req, res) {
  const firsName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    members: [
       {
         email_address: email,
         status: "subscribed",
         merge_fields: {
           FNAME: firsName,
           LNAME: lastName
         }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url="https://us14.api.mailchimp.com/3.0/lists/9bd5fca365";
  const options = {
    method: "POST",
    auth:"saral1:bb3be6e85d67009a39be1b6b3927ee9e-us14"
  };
const request = https.request(url, options, function(response) {
  console.log(response.statusCode);
    if(response.statusCode===200){
        res.sendFile(__dirname + "/success.html");
    }else{
        res.sendFile(__dirname + "/failure.html");
    }
 response.on("data", function(data) {
  console.log(JSON.parse(data));
});
});
request.write(jsonData);
request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000, function() { 
  console.log("Server is running on port 3000");
});
