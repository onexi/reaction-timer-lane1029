// This will be the node Express server that will serve up your app
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3030;
const path = require('path');
// these are some of the libraries you will need

// Array to store names
let players = [];

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
    let order = players.length

    // If the array is empty, add the user to the array
    if (players.length === 0) {
        players.push({ name: name, reactionTime: reactionTime });
    }
    // If the array is not empty, find the correct place to insert the new player based on reaction time
    else{
        for (let i = 0; i < players.length; i++) {
            if (parseFloat(reactionTime) < parseFloat(players[i].reactionTime)) {
                order = i;
                break;
            }
        }
        // Add the new user to the array at the correct position
        players.splice(order, 0, { name: name, reactionTime: reactionTime });
    }

    // Send the updated list of players back as JSON
    res.json(players);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});