// This will be the node Express server that will serve up your app
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3030;
const path = require('path');
// these are some of the libraries you will need

// Array to store names
let users = [];

app.use(bodyParser.json());
app.use(express.static('public'));

// Serve the web page with the form
// note __dirname is the directory in which node Web Server is running 
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Handle the form submission via fetch
app.post('/input', function(req, res){
    const name = escape(req.body.name);
    const reactionTime = escape(req.body.reactionTime);
    let order = users.length

    if (users.length === 0) {
        users.push({ name: name, reactionTime: reactionTime });
    }
    else{
        for (let i = 0; i < users.length; i++) {
            if (parseFloat(reactionTime) < parseFloat(users[i].reactionTime)) {
                order = i;
                break;
            }
        }
        // Add the new user to the array
        users.splice(order, 0, { name: name, reactionTime: reactionTime });
    }


    // Send the updated list of users back as JSON
    res.json(users);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});