class Loop{

    looping(){
        
        let rand = game.config.fetchRandRhythm();

        
        $(".cards").removeClass('highlighted');
        for (let i in game.config.characters){
            game.process(i, 'before', rand);
            game.config.rhythm = rand;
            game.process(i, 'after', rand);
            game.config.characters[i].step();
        }
        game.config.steps ++;
        ui.refresh();
    }

}