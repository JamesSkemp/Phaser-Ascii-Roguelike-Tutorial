/// <reference path="../lib/phaser-2.4.3.js" />

// We're using text for our graphics, so this is our font size.
var FONT = 32;
// Number of columns and rows that make up the level.
var COLUMNS = 15;
var ROWS = 10;
// Number of actors per level, including the player.
var ACTORS = 10;

// Create a game, and use the WebGL (default) or Canvas renderer, depending upon the browser.
var game = new Phaser.Game(COLUMNS * FONT * 0.6, ROWS * FONT, Phaser.AUTO);

game.state.add('play', {
	preload: function () {
	},

	create: function () {
		var state = this;

		game.input.keyboard.addCallbacks(null, null, this.onKeyUp, null);

	},

	render: function () {
	},

	onKeyUp: function (event) {
		console.log(event);

		switch (event.keyCode) {
			case Phaser.Keyboard.UP:
				console.log('up');
				break;
			case Phaser.Keyboard.DOWN:
				console.log('down');
				break;
			case Phaser.Keyboard.LEFT:
				console.log('left');
				break;
			case Phaser.Keyboard.RIGHT:
				console.log('right');
				break;
			default:
				break;
		}
	}
});

game.state.start('play');