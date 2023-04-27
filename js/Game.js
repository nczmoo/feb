class Game{
	config = new Config();
	loop = new Loop();
	loopInterval = null;
	
	constructor(){		
		this.loopInterval = setInterval(loop.looping, 1000);
	}
}
