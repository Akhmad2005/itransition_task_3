const KeyGenerator = require('./KeyGenerator') 
const HMACGenerator = require('./HMACGenerator') 
const TableGenerator = require('./TableGenerator'); 

class Game {
	constructor(moves) {
		this.moves = moves;
	}

	displayMenu() {
		this.computerMove = this.moves[Math.floor(Math.random() * this.moves.length)];
		this.computerMoveIndex = this.moves.indexOf(this.computerMove);
		this.key = KeyGenerator.generateKey();
		this.hmac = HMACGenerator.generateHMAC(this.key, this.computerMove);
    console.log('HMAC:', this.hmac);
    console.log('Available moves:');
    this.moves.forEach((move, index) => {
      console.log(`${index + 1} - ${move}`);
    });
    console.log('0 - Exit');
    console.log('? - Help');
    console.log('Enter your move:');
  }

	play(playerMoveIndex) {
    if (playerMoveIndex < 0 || playerMoveIndex > this.moves.length) {
      console.log('Invalid input. Please try again.');
      return;
    }

    if (playerMoveIndex == 0) {
      console.log('Game exited.');
			process.exit(0);
    }

		const playerMoveIndexInMovesArray = playerMoveIndex - 1
    const playerMove = this.moves[playerMoveIndexInMovesArray];
    console.log('Your move:', playerMove);
    console.log('Computer move:', this.computerMove);
    
		if (playerMove == this.computerMove) {
			console.log('It\'s a draw!');
		} else if  ((playerMoveIndexInMovesArray > this.computerMoveIndex && playerMoveIndexInMovesArray - this.computerMoveIndex <= this.halfStartArgumentLength) ||
		(this.computerMoveIndex > playerMoveIndexInMovesArray && this.computerMoveIndex - playerMoveIndexInMovesArray > this.halfStartArgumentLength)) {
			console.log('You win!');
		} else {
			console.log('Computer wins!');
		}
    console.log('HMAC key:', this.key.toString('hex'));
		console.log('----------------------------------------------------------------');
		
  }

	displayHelp() {
		const halfStartArgumentLength = Math.floor(this.moves.length / 2)
		let table = new TableGenerator(this.moves, halfStartArgumentLength)
		const winTable = [];
		this.moves.forEach((e,i) => {
			winTable.push(table.definingGameWin(e, i))
		})
    console.log('Help table:');
		table.generateTable(winTable)
  }
}

module.exports = Game;