class UI{
	constructor(){

	}
	refresh(){
		$("#rhythm").html(game.config.rhythm);
	}

	formatID(id){
		return Number(id) + 1;
	}
}
