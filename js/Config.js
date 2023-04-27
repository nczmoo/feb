class Config {    
    characters = [];
    dmg = { kick: 10, punch: 5 };
    enemies = [1, 0];
    maxX = 10;
    numOfCharacters = 2;
    rhythm = null;
    rhythms = ['a', 'b', 'c', 'd'];
    startHealth = 100;
    startX = [0];
	constructor(){        
        this.fetchRandRhythm();
        this.startX.push(this.maxX);
        for (let i = 0; i < this.numOfCharacters; i++){
            this.characters.push(new Character(this.startHealth, this.startX[i]));
        }
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
        let opposition = [1, 0];
		let enemy = this.characters[charID];
        let them = this.characters[opposition[charID]];
        if (them.x > enemy.x){
            return -1;
        }
        return 1;
	}

    fetchRandRhythm(){
        while (1){
            let rand = this.rhythms[randNum(0, this.rhythms.length - 1)];
            if (this.rhythm == rand){
                continue;
            }

            this.rhythm = rand;
            return;
        }
    }

    hit(req){
        let distanceBtw = distance(this.characters[0].x, this.characters[1].x, 
            this.characters[0].y, this.characters[1].y);
        return (req < distanceBtw);            
    }
 
    isItInRange(x, y){
        return !(x < 1 || x > this.maxX || y < 1 || y > 2);
    }

    isEnemyThere(x, y, charID){
        let enemies = [1, 0];
        let enemyID = enemies[charID];
        let char = this.characters[enemyID];
        return char.x == x && char.y == y;
    }

    jump(charID){
        let char = this.characters[charID];                
        if (char.y == 0){
            char.y ++;
        }
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
        let otherDir = [1, null, -1];
        if (direction = 'away'){
            xDelta = otherDir[xDelta];
        }
        let newX = char.x + xDelta;
        if (this.isItInRange(newX, 0) && !this.isEnemyThere(newX, 0, charID)){
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
}