var prompt = require('prompt');
var Word = require('./word.js');

prompt.start();

game = {
	words : ["tree","cliff","volcano","biome","tundra","rainforest","tropical","shoreline","horizon"],
	guessesRemaining : 10,
	currentWrd : null,
	startGame : function (wrd){
		
		this.resetGuessesRemaining();

		
		this.currentWrd = new Word(this.words[Math.floor(Math.random()* this.words.length)]);

		this.currentWrd.getLets();

		this.keepPromptingUser();

	}, 
	resetGuessesRemaining : function(){
		this.guessRemaining = 10;
	},
	keepPromptingUser : function(){
		var self = this;

		prompt.get(['guessLetter'], function(err, result) {

		    
		    console.log('  The letter or space you guessed is: ' + result.guessLetter);

		    
		    var findHowManyOfUserGuess = self.currentWrd.checkIfLetterFound(result.guessLetter);

		    if (findHowManyOfUserGuess == 0){
		    	console.log('You guessed wrong!');
		    	self.guessesRemaining--;
		    }else{
		    	console.log('You guessed right!');

	    		if(self.currentWrd.didWeFindTheWord()){
			    	console.log('You Won!!!');
			    	return;
			    }
		    }
		    
		    console.log('Guesses remaining: ', self.guessesRemaining);
		    console.log(self.currentWrd.wordRender());
		    console.log('here are the letters you guessed already: ');

		    if ((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
		    	self.keepPromptingUser();
		    }
		    else if(self.guessesRemaining == 0){
		    	console.log('Game over bro it was ', self.currentWrd.word);
		    	console.log('Get with the program man');
		    }else{
		    	console.log(self.currentWrd.wordRender());
		    }
		});
	}


};

game.startGame();