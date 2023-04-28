class Config {
    static actions = ['block', 'kick', 'punch', 'move-away', 'move-enemy', ];
    cards = [];
    characters = [];
    dmg = { kick: 10, punch: 5 };
    enemies = [1, 0];
    hands = [];
    maxX = 10;
    numOfCards = 10;
    numOfCharacters = 2;
    rhythm = null;
    static rhythms = ['a', 'b', 'c', 'd'];
    startHealth = 100;
    startX = [1];
    steps = 0;
	constructor(){        
        this.fetchRandRhythm();
        this.startX.push(this.maxX);
        for (let i = 0; i < this.numOfCharacters; i++){
            this.characters.push(new Character(this.startHealth, this.startX[i]));
        }
        for (let charID = 0; charID < this.numOfCharacters; charID++){       
            let actionsIn = [], triggers = [];
             this.cards.push([]);
             this.hands.push([]);
            for (let i = 0; i < this.numOfCards; i ++){
                while(1){
                    let card = new Card();
                    let trigger = card.when + "-" + card.thisHappens;
                    if ((actionsIn.length < Config.actions.length 
                        && actionsIn.includes(card.action)) || triggers.includes(trigger)){                
                        continue;
                    }
                    actionsIn.push(card.action);
                    triggers.push(trigger);
                    this.hands[charID].push(card);
                    break;
                }
                            
            }
        }
        this.sort();
    }

    block(){

    }

    fetchCharAt(x, y){
        for (let charID in this.characters){
            let char = this.characters[charID];
            if (char.x == x && char.y == y){
                return charID;
            }
        }
        return null;
    }

    fetchDirOfEnemy(charID){
		let them = this.characters[charID];
        let enemy = this.characters[this.enemies[charID]];
        if (them.x > enemy.x){
            return -1;
        }
        return 1;
	}

    fetchRandRhythm(){
        while (1){            
            let rand = Config.rhythms[randNum(0, Config.rhythms.length - 1)];
            if (this.rhythm == rand){
                continue;
            }            
            return rand;
        }
    }

    hit(req){
        let distanceBtw = distance(this.characters[0].x, this.characters[1].x, 
            this.characters[0].y, this.characters[1].y);
        
        return (req >= distanceBtw);            
    }
 
    isItInRange(x, y){
        let val = (x > 0 && x <= this.maxX && y >= 0 && y <= 2);
        return val;
    }

    isEnemyThere(x, y, charID){
        let enemies = [1, 0];
        let enemyID = enemies[charID];
        let char = this.characters[enemyID];
        return char.x == x && char.y == y;
    }

    jump(charID){
        let char = this.characters[charID];                
        
    }

    kick(charID){
        let enemyID = this.enemies[charID];
        let hitThem = this.hit(2);
        let enemy = this.characters[enemyID];

        if (!hitThem){
            return;
        }

        if (enemy.blocked){
            return;
        }

        enemy.getHit(this.dmg.kick);
    }

    move(charID, direction){
        let char = this.characters[charID];                
        let xDelta = this.fetchDirOfEnemy(charID);
        //let otherDir = [1, null, -1];
        if (direction == 'away'){
            xDelta = -xDelta;
        }
        let newX = char.x + xDelta;
        let inRange = this.isItInRange(newX, 0);
        if (inRange && !this.isEnemyThere(newX, 0, charID)){
            this.characters[charID].x = newX;
        }

    }

    punch(charID){        
        let enemyID = this.enemies[charID];
        let hitThem = this.hit(1);
        let enemy = this.characters[enemyID];

        if (!hitThem){
            return;
        }

        if (enemy.blocked){
            return;
        }

        enemy.getHit(this.dmg.punch);
   }

   sort(){
    let newStack = [];
    for (let action of Config.actions){
        for (let cardID in this.hands[0]){
            let card = this.hands[0][cardID];
            if (card.action == action){
                newStack.push(card);
            }
        }
    }
    this.hands[0] = newStack;
   }
}