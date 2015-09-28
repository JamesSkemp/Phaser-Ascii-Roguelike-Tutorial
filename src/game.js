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

		// Initialize the map.
		this.game.levelMap = [];
		this.initializeMap();

		// The display of the map with ASCII characters.
		this.game.asciiDisplay = [];

		for (var y = 0; y < ROWS; y++) {
			var newRow = [];
			this.game.asciiDisplay.push(newRow);
			for (var x = 0; x < COLUMNS; x++) {
				newRow.push(this.initCell(this.game.levelMap[y][x], x, y));
			}
		}
		this.drawMap();
	},

	render: function () {
	},

	initializeMap: function () {
		for (var y = 0; y < ROWS; y++) {
			var newRow = [];
			for (var x = 0; x < COLUMNS; x++) {
				if (Math.random() > 0.8) {
					newRow.push('#');
				} else {
					newRow.push('.');
				}
			}
			this.game.levelMap.push(newRow);
		}
	},

	initCell: function (character, x, y) {
		var style = { font: FONT + 'px monospace', fill: '#fff' };
		return game.add.text(FONT * 0.6 * x, FONT * y, character, style);
	},

	drawMap: function () {
		console.log('drawing map');
		for (var y = 0; y < ROWS; y++) {
			for (var x = 0; x < COLUMNS; x++) {
				this.game.asciiDisplay[y][x].content = this.game.levelMap[y][x];
			}
		}
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