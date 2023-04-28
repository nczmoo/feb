class Game{
	config = new Config();
	
	loop = new Loop();
	loopInterval = null;
	paused = true;
	processing = 0;

	constructor(){		
		this.loopInterval = setInterval(this.loop.looping, 1000);
	}

	fetchCardOfAction(charID, action, set){
		for (let cardID in this.config[set][charID]){
			let card = this.config[set][charID][cardID];
			if (card.action == action){
				return cardID
			}
		}
		return null;		
	}

	process(charID, when, thisHappens){
		if (this.config.characters[charID].stunned){
			console.log(charID + ": can't do shit - stunned");
			return;
		}
		if(this.processing > 10){
			console.log(this.processing);
		}
		this.processing++;
		for (let i in this.config.cards[charID]){
			let card = this.config.cards[charID][i];
			if (card.when != when || card.thisHappens != thisHappens){
				continue;

			}	
			$("." + charID + "-" + when + "-" + thisHappens).addClass('highlighted');
			this.process(charID, 'before', card.action);
			ui.status(card.action);
			if (card.action.split('-')[0] == 'move'){
				this.config.characters[charID].move();
				this.config.move(charID, card.action.split('-')[1]);
			} else {
				this.config.characters[charID][card.action]();
				this.config[card.action](charID);
			}			
			this.process(charID, 'after', card.action);
			
		}
	}

	play(cardID){
		let card = this.config.hands[0][cardID];
		this.config.hands[0].splice(cardID, 1);
		this.config.cards[0].push(card);
		let enemyCardID = this.fetchCardOfAction(1, card.action, 'hands');
		if (enemyCardID == null){
			enemyCardID = randNum(0, this.config.hands.length - 1);
		}			
		card = this.config.hands[1].splice(enemyCardID, 1)[0]		
		this.config.cards[1].push(card);
		ui.printHand();
		ui.printCards();
		
	}

	remove(cardID){
		let card = this.config.cards[0][cardID];
		this.config.hands[0].push(this.config.cards[0].splice(cardID, 1)[0]);
		this.config.sort();
		let enemyCardID = this.fetchCardOfAction(1, card.action, 'cards');
		if (enemyCardID == null){
			enemyCardID = randNum(0, this.config.cards.length - 1)
		}
		this.config.hands[1].push(this.config.cards[1].splice(enemyCardID, 1)[0]);
		ui.printHand();
		ui.printCards();
	}

	start(){
		this.config.drawTimer = Date.now();
		this.paused = false;
		ui.gameStarted = true;
	}
}
