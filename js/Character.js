class Character {   
    blocking = false; 
    health = null;        
    maxHealth = null;    
    stunned = 0;
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
        if (this.stunned > 0){
            this.stunned = 0;
        }
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
        if (this.stunned > 0){
            console.log('step: ' + this.stunned);
            this.stunned --;
        }
    }

    stun(){
        console.log('stun');
        this.stunned +=  3;
    }
}