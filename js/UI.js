class UI{
	constructor(){

	}

	refresh(){
		$("#rhythm").html(game.config.rhythm);
		this.printCharacters();
		this.printBoard();
	}

	formatID(id){
		return Number(id) + 1;
	}

	printBoard(){
		let txt = '';
		for (let x = 0; x <= game.config.maxX; x ++){
			let charID = game.config.fetchCharAt(x, 0), charClass = '';
			if (charID != null){
				charClass = 'char-' + charID;
			}			
			txt += "<div class='cell " + charClass + "'>";			
			txt += "</div>";			
		}
		$("#board").html(txt);
	}

	printCharacters(){
		let txt = "";
		let distanceBtw = distance(game.config.characters[0].x, 
			game.config.characters[1].x, game.config.characters[1].y, 
			game.config.characters[1].y);
		for (let charID in game.config.characters){
			let char = game.config.characters[charID];
			let progressClass = '';
			if (charID == 1){
				progressClass = ' bg-danger ';
			}
			let width = char.health / char.maxHealth * 100;

			txt += "<div class='col'>";
			txt += "<div class='text-center'>" + char.x + ", " + char.y + "</div>";
			txt += "<div>hp: " + char.health + "/" + char.maxHealth + "</div>";
			txt += "<div class='progress'><div class='progress-bar " + progressClass + "' " 
				+ "role='progressbar' style='width: " + width + "%' ></div></div>";
			txt += "</div>";

		}
		$("#characters").html(txt);
	}
}
