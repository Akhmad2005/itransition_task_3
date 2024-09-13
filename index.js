const Game  = require("./classes/Game.js");

const findSimilarPairs = (arguments) => {
  for (let i = 0; i < arguments.length; i++) {
    for (let j = i + 1; j < arguments.length; j++) {
      if (arguments[i] === arguments[j]) {
				return 1;
      }
    }
  }
	return 0;
};

function main() {
	const startArguments = process.argv.splice(2)
	if (startArguments.length < 3) {
		console.error('Parameters must be at least 3 arguments!. For example "node index.js Example1 Example2 Example3"');
		process.exit(0)
	} else if (startArguments.length % 2 == 0) {
		console.error('Parameters must odd number of arguments!. For example "node index.js Example1 Example2 Example3"')
		process.exit(0)
	} else if (findSimilarPairs(startArguments.sort())) {
		console.error('Error: Similar pairs have been found!. For example "node index.js Example1 Example2 Example3"')
    process.exit(0)
	}
	

	let game = new Game(startArguments)
	game.displayMenu();
	process.stdin.setEncoding('utf-8');
	process.stdin.on('data', (input) => {
    const choice = input.trim();
    if (choice <= startArguments.length) {
			game.play(choice);
    } else if (choice == '?') {
      game.displayHelp();
    }
    game.displayMenu();
  });
}

main()

