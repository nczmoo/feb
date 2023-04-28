SUMMARY

    Fighting Engine Builder

    An autobattler where you setup your cards to determine the system of how your character fights beforehand.
TODO
    
    x Create rhythm system
    
    x Create characters
        Actions
            Move left 
            Move right
            Jump
            Punch
            Kick
            Block

    x Create cards that move players
        Trigger Context: Before, When, After
        Trigger Content: actions or rhythms
        Action: action

    x Play cards
        It's a 10 second timer to play or remove cards and that goes up with each additional card.

    x BUG: before move-enemy wasn't activating, onyl the rhythms
    
    BUG: recursive loop that crashes game, just trying to figure out a good way to stop.
    BUG: there's a kick that's triggered by before punch and a punch that's triggered by before kick and that's it.
    
    instead of ending the game at the ten second timer, both players can add another card.

    

QUESTIONS
    x Insted of (left, right), maybe it should be towards enemy, away


DESIGN
    So what I'm thinking is having a rhythm system whenever a certain symbol is triggered, that can trigger a specific thing as a way of creating an automatic system to motivate movement instead of having the player manually control it.


MAYBE
    what if when a player gets to half health, they get to change their cards? Maybe the other doesn't until they get to half health. Or maybe they just get to change the same number of cards as tthe other person.