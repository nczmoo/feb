class Config {    
    rhythm = null;
    rhythms = ['a', 'b', 'c', 'd'];
    
	constructor(){        
        this.fetchRandRhythm();
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
}