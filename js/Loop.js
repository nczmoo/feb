class Loop{

    looping(){
        if (game.paused){
            return;
        }
        let timer = game.config.fetchTimer();
        if (timer > game.config.maxTimer){
            game.paused = true;
            alert('Timed out!');
        }
        let rand = game.config.fetchRandRhythm();

        
        $(".cards").removeClass('highlighted');
        for (let i in game.config.characters){
            i = Number(i);
            game.processing = 0;
                        
            game.process(i, 'before', rand);
            game.config.rhythm = rand;
            game.process(i, 'after', rand);
            game.config.characters[i].step();
        }
        game.config.steps ++;
        ui.refresh();
    }

}