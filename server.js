const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

//send files from public
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/sign_up.html');
});




app.post('/', function(req, res){
    let Fname = req.body.Fname;
    let Lname = req.body.Lname;
    let email = req.body.email;

    // list id 8bfc3cc124
    // api key 0ace71c9450042e4c8e9a2486014fc8f-us4

    // build up an object of to be posted to the server
    let data = {
        members: [
            {email_address: email,
            status: "subscribed",
        merge_fields: {
            Fname: Fname,
            Lname: Lname

        }}]
    };
    
    let jsonData = JSON.stringify(data);

    //Prepaare data for POST request
    const option = {
        url: "https://us4.api.mailchip.com/3.0/lists/8bfc3cc124",
        method: "POST",
        headers: {
            "Authorization" : "InTheEveryString 0ace71c9450042e4c8e9a2486014fc8f-us4"
        },
        body: jsonData
    }

    request(option, function(error, response, body){

        if (error){
            console.log(error);
        } else {
            console.log(response.statusCode);
        };

    });

    console.log(`First name is ${Fname}, Last Name is ${Lname}, Email is ${email}`);
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});