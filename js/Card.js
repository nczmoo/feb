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
        this.when = this.contexts[randNum(0, this.contexts.length - 1)];
        this.thisHappens = this.triggers[randNum(0, this.triggers.length - 1)];
        while (1){
            let rand = Config.actions[randNum(0, Config.actions.length - 1)];
            if (rand == this.thisHappens == rand){
                continue;
            }
            this.action = rand;
            break;
        }
        
        if (this.action == 'move-enemy' || this.action  == 'move-away'){
            this.thisHappens = Config.rhythms[randNum(0, Config.rhythms.length - 1)];
        }
    }
}