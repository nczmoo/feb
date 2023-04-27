class Character {    
    health = null;        
    maxHealth = null;    
    x = null;
    y = 0;

    constructor(health, x){
        this.health = health;
        this.maxHealth = health;
        this.x = x;
    }
    
    block(){
        this.blocking = true;
    }

    getHit(dmg){
        this.health -= dmg;
        return this.health < 0;                    
    }

    jump(){
        this.blocking = false;
        if (this.y == 0){
            this.y ++;
        }
    }

    kick(){
        this.blocking = false;
    }

    move(){
        this.blocking = false;
    }

    punch(){
        this.blocking = false;
    }

    step(){
        if (this.y != 0){
            this.y --;
        }
    }
}