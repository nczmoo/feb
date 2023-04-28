class UI{
	log = [];
	constructor(){
		this.printCards();
		this.printHand();
	}

	refresh(){
		$("#rhythm").html(game.config.rhythm);
		this.printCharacters();
		this.printBoard();
		
		this.printLog();		
	}

	fetchAction(action){
		return "<img src='img/" + action + ".png'>";
	}

	formatID(id){
		return Number(id) + 1;
	}

	menu(id){
		$(".window").addClass('d-none');
		$("#" + id.split('-')[1]).removeClass('d-none');
		$(".menu").prop('disabled', false);
		$("#" + id).prop('disabled', true);

	}

	printBoard(){
		let txt = '';
		for (let x = 1; x <= game.config.maxX; x ++){
			let charID = game.config.fetchCharAt(x, 0), charClass = '';
			if (charID != null){
				charClass = 'char-' + charID;
			}			
			txt += "<div class='cell " + charClass + "'>";			
			txt += "</div>";			
		}
		$("#board").html(txt);
	}

	printCard(charID, cardID, isHand){
		let card = game.config.cards[charID][cardID];
		if (isHand){
			card = game.config.hands[charID][cardID];
		}		
		let txt = "<div class=' card text-center'>";
		if (!isHand && charID == 0){
			txt += "<div><button id='remove-" + cardID + "' class='btn btn-danger verb1'>x</button></div>";
		}

		txt +=  "<div class='" + card.thisHappens + "'>Trigger: " + card.when + " " + card.thisHappens + "</div>"
			+ "<div class='mt-3 mb-3 cards " + charID + "-" + card.when + "-" 
			+ card.thisHappens + "'>" + card.action + " " + this.fetchAction(card.action) + "</div>";
		if (isHand){
			txt += "<div><button id='play-" + cardID + "' class='btn btn-primary verb1'>play</button></div>";
		}
		txt += "</div>";
		return txt;
	}

	printCards(){
		
		for (let charID = 0; charID <  game.config.numOfCharacters; charID++){
			let txt = '';
			for (let cardID in game.config.cards[charID]){				
				txt += this.printCard(charID, cardID, false);
			}
			$("#cards-" + charID).html(txt);
		}
		
	}

	printCharacters(){
		let txt = "";
		let distanceBtw = distance(game.config.characters[0].x, 
			game.config.characters[1].x, game.config.characters[1].y, 
			game.config.characters[1].y);
		for (let charID in game.config.characters){
			let blocking = '', char = game.config.characters[charID];
			let progressClass = '';
			if (charID == 1){
				progressClass = ' bg-danger ';
			}
			if (char.blocking){
				blocking = ' blocking ';
			}
			let width = char.health / char.maxHealth * 100;

			txt += "<div class='col'>";
			txt += "<div class='text-center'>" + char.x + ", " + char.y + ": " 
				+ blocking + "</div>";
			txt += "<div>hp: " + char.health + "/" + char.maxHealth + "</div>";
			txt += "<div class='progress'><div class='progress-bar " + progressClass + "' " 
				+ "role='progressbar' style='width: " + width + "%' ></div></div>";
			txt += "</div>";

		}
		$("#characters").html(txt);
	}

	printHand(){
		let txt = '';
		for (let cardID in game.config.hands[0]){
			
			txt += this.printCard(0, cardID, true);
		}
		$("#cardsInHand").html(txt);
	}

	printLog(){
		let txt = '';
		for (let i of this.log){
			txt += i;
		}
		$("#log").html(txt);
	}

	status(msg){
		this.log.unshift("<div>" + game.config.steps + ": " + msg + "</div>");
	}
}
