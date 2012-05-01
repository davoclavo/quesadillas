function Telephone(){
	this.folder = 'tones/';
	this.extension = 'ogg';
	this.map = {
		0: 'DTMF-0',
		1: 'DTMF-1',
		2: 'DTMF-2',
		3: 'DTMF-3',
		4: 'DTMF-4',
		5: 'DTMF-5',
		6: 'DTMF-6',
		7: 'DTMF-7',
		8: 'DTMF-8',
		9: 'DTMF-9',
		'*': 'DTMF-star',
		'#': 'DTMF-pound'
	};
	this.numberString = '';
	this.currentIndex = 0;
	this.pause = 1000;
}

Telephone.prototype = {
	dial: function(numberString){
		var self = this;
		self.numberString = numberString;
		self.playNextDigit();
	},
	playNextDigit: function(){
		var self = this;
		var number = self.numberString[self.currentIndex];
		
		switch(number){
			case '-':
				console.log('Pause');
				setTimeout(function(){
					self.nextDigit();
				}, self.pause)
				break;
			default:
				console.log('Dialing ['+number + ']');
				var sound = document.getElementById(self.map[number]);
				sound.play();
				sound.addEventListener('ended', function(){
					//Remove all event listeners by cloning and replacing
					var sound_clone = sound.cloneNode(true);
					sound.parentNode.replaceChild(sound_clone, sound);
					self.nextDigit();
				}, false);
		}
	},
	nextDigit: function(){
		var self = this;
		self.currentIndex++;
		if(self.currentIndex < self.numberString.length)
			self.playNextDigit();
		else{
			console.log('Finished dialing '+self.numberString);
			self.currentIndex = 0;
			self.numberString = '';
		}
	}
}
//var telephone = new Telephone();