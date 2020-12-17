# Haggle!
## The Pitch!
Haggle! is a game where 1 person is Gamemaster and 4 to 8 players trade for items and information! There are 10 Rules to start! 2 of the rules are public, and 8 are divided up evenly amongst each player. Each rule has information on how much certain items are worth and how to get points. It is the goal of each player to gather as much information as possible and gather the right items together to get the most amount of points by the end of the game. This web app is designed for game masters and players to more easily keep track of items and rules. By the deadline we aim to have a functioning web app that allows the game master to set-up a game of players, create rules and items, and then give those rules and items to players. It will also allow the game master to perform trades between players (players will be assumed to have agreed to this trade outside of the web app), and reflect the change in items and rules for each player, as well as show players a screen detailing all of their current rules and items. 
## User Stories
The Home Page will be a page that welcomes the user and then asks them whether they are a "Player" or the "Game Master".
### Gamemaster
#### Game Setup
The gamemaster starts by being greeted with a Game Creation screen where they can add players to the player database. If they've already done this they will instead be sent to the Gamemaster Players screen
#### Gamemaster Players Screen
In this screen the gamemaster will be shown a list of all the players. Each player will have two buttons next to them redirecting to the Player's Rules, and Player's Items.
#### Player Rules and Player Items
Both the Player Rules and Player Items screens function identically. The Gamemaster will see a list of that player's rules/items as well as all of it's information. They will also be able to add more rules/items to that player via a dropdown list at the bottom of the screen.
#### Gamemaster Nav Bar
Of course in order to add rules and items to players they have to exist first. There is a navbar at the top of the screen where the gamemaster can navigate to Items, Rules, Players, or the Trade Screen.
#### Items/Rules
The Items and Rules pages are pages where the gamemaster can see lists of all current Items/Rules. They can directly edit the information, as well as hit a button to delete a rule/item. At the bottom of the page is a section where you can add new rules/items. We decided to do things this way in order to economize on the number of views.
#### Trade
Finally once the gamemaster has added all of the items, rules, and then distributed them out amongst players, the game can properly begin. Whenever two players agree on a trade, the gamemaster can facilitate this by clicking on Trade! in the navbar. This will bring them to the trade screen. The trade screen will have three drop down menus on each side where the gamemaster can choose a Player, any number of that player's items, and any number of that player's rules. (Rules are not "traded" so much as "given"). The gamemaster can then hit the Trade! button to initate the trade which will update the database to reflect the trade.
### Player
#### Player Select
Upon hitting "Players" on the homepage Players will be taken to a Player select where they can choose which player they are. They will then be taken to their Player Screen.
#### Player Screen
The player screen will show the player all of their current items as well as all of their known rules.
## Stretch Goals
Stretch Goals include a login feature so that players can't cheat and learn other rules on other player pages/the game master page, as well as letting players initiate and confirm trades on the player side so that the game master doesn't have to be present. Further stretch goals might inculde adding a store or implementing more complex rules.
## Milestones
Creating the Server and Databases.\
Implement Relationships between Models\
Create and Implement Gamemaster CRUD Functionality\
Get Trading to Work\
Implent CSS and Javascript to make the web app look good\
