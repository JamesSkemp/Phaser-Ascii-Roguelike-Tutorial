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
		this.game.levelMap;
		this.initializeMap();

		this.game.player;
		// Collection of all actors, the first of which is the player.
		this.game.actorList;
		this.game.livingEnemies;
		// Each actor's position in the world.
		this.game.actorMap;

		// The display of the map with ASCII characters.
		this.game.asciiDisplay = [];

		for (var y = 0; y < ROWS; y++) {
			var newRow = [];
			this.game.asciiDisplay.push(newRow);
			for (var x = 0; x < COLUMNS; x++) {
				newRow.push(this.initCell(this.game.levelMap[y][x], x, y));
			}
		}

		this.initializeActors();
		this.drawActors();
		this.drawMap();
	},

	render: function () {
	},

	initializeMap: function () {
		this.game.levelMap = [];
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
		console.log('init cell with ' + character + ' at ' + x + '/' + y);
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

	initializeActors: function () {
		this.game.actorList = [];
		this.game.actorMap = [];

		for (var e = 0; e < ACTORS; e++) {
			// Create a new actor, with either 3 HP for the player, or 1 for an enemy.
			var actor = { x: 0, y: 0, hp: e == 0 ? 3 : 1 };
			// Find a spot for the actor that isn't a wall, and isn't already occupied.
			do {
				actor.y = Math.floor(Math.random() * ROWS);
				actor.x = Math.floor(Math.random() * COLUMNS);
			} while (this.game.levelMap[actor.y][actor.x] == '#' || this.game.actorMap[actor.y + '_' + actor.x] != null);

			// Add the actor to the actor map and list.
			this.game.actorMap[actor.y + '_' + actor.x] = actor;
			this.game.actorList.push(actor);
		}

		this.game.player = this.game.actorList[0];
		this.game.livingEnemies = ACTORS - 1;

		console.log('actors: ' + this.game.actorList.length);
		console.log('living enemies: ' + this.game.livingEnemies);
	},

	drawActors: function () {
		for (var a in this.game.actorList) {
			console.log('a drawing ' + a + ' at ' + this.game.actorList[a].y + 'x' + this.game.actorList[a].x);
			if (this.game.actorList[a] != null && this.game.actorList[a].hp > 0) {
				this.game.asciiDisplay[this.game.actorList[a].y][this.game.actorList[a].x].content = (a == 0 ? '' + this.game.player.hp : 'e');
				// TODO this should be taken care of by the logic to draw the map.
				this.initCell((a == 0 ? '' + this.game.player.hp : 'e'), this.game.actorList[a].x, this.game.actorList[a].y);
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