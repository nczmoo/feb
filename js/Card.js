class Card {
    
    triggers = [];
    contexts = ['before', 'after'];
    when = null;
    thisHappens = null;
    action = null;

    constructor(){
        for (let i of Config.actions){
            this.triggers.push(i);
        }
        for (let i of Config.rhythms){
            this.triggers.push(i);
        }
        while(1){
            let randContext = this.contexts[randNum(0, this.contexts.length - 1)];
            let randTrigger = this.triggers[randNum(0, this.triggers.length - 1)];
            if (randContext == 'after' && randTrigger == 'block'){
                continue;
            }
            this.when = randContext;
            this.thisHappens = randTrigger;
            break;
        }
        
        while (1){
            let rand = Config.actions[randNum(0, Config.actions.length - 1)];
            if (rand == this.thisHappens ){
                continue;
            }
            if (rand == 'block' && this.when == 'before'){
                this.when = 'after';

            }
            this.action = rand;
            break;
        }
        
        if (this.action == 'move-enemy' || this.action  == 'move-away'){
            this.thisHappens = Config.rhythms[randNum(0, Config.rhythms.length - 1)];
        }
    }
}