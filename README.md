# Problem Set 01 - Reflex Reactions
1.125 Architecting and Engineering Software Systems

Laney Marsh

## System Description

The code for this assignment is split between 2 files - server.js and index.html.

### server.js

The server.js file contains the code that is running in the web server. The following actions take place in the server:
1. When a player submits a time reaction, the server receives the player's name and reaction time (calculated in the browser/html side). 
2. It determines where the player's information should be inserted into a sorted array based on reaction time. The start of the array is the fastest time and the end of the array in the slowest time. 
3. The player's information is then inserted into the array at the correct position.
4. The array is returned to the browser in json format.

### index.html

The index.html file contains the formatting for the web page as well as the actions associated with the form and each button. 

#### Section 1 - Form 

The form has three main components - the name field, a submit button, and the colorButton. 

<u>name field</u>

This is a form element for the player to enter their name. The input should be text.

<u>submit Button</u>

When a player clicks the start button:
- The startClicked flag is set to true. This flag indicates that the submit button has been clicked. 
- The falseStart flag is set to false. This flag indicates that this is not a false start.
- The name in the name field of the form is retreived
- The color of the "colorButton" is checked to ensure it is green (the starting color)
- If the player entered a name in the name field, then a random delay between 1 and 20 seconds is generated. Otherwise, the player is prompted to enter a name.
- At the end of the delay, it checks that the disqualified flag is set to false. If it is, then it changes color to red and a starting time is captured.

<u>colorButton</u>

When a player clicks the colorButton:
- The startClicked flag is checked. If it is set to false, the user has not pressed the start button and will be prompted to click start.
- The color of the button will be checked. If it is green, the player will be disqualified and the disqualified flag will be set tot true. This is to deter cheating.
- If it is not green, then the color will be reset back to green and the startClicked flag will be set to false (to reset for a new attempt). If the disqualified flag is set to true, then the actions from this button stop.
- If disqualified is set to false, the current time is captured and a reaction time is calcualted using the starting time and current time.

#### Section 2 - Leaderboard

The leaderboard section consists of a display of the names for each player and their times. These are in order from shortest time to longest time. This display relies on actions from when the colorButton is clicked.

<u>colorButton second set of actions</u>

When the colorButton is clicked, there is a second set of actions:
- The falseStart flag is checked. If it is true, then no more actions will be taken.
- The disqualified flag is checked. It it is true, then no more actions will be taken.
- The player's information (name and time) will be sent to the server.
- It will then receive a new list from the server (with all of the players and their reaction times in order) in json format.
- A new list will be populated with the json data and displayed.
- The name in the form will be reset.

Note: Copilot was used to help generate and autocomplete some of the code.