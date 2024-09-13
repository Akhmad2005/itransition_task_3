const { Console } = require('console');
const { Transform } = require('stream');

class TableGenerator {

	constructor(startArguments, halfStartArgumentLength) {
		this.startArguments = startArguments
		this.halfStartArgumentLength = halfStartArgumentLength
	}

	generateTable(input) {
		const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
		const logger = new Console({ stdout: ts })
		logger.table(input)
		const table = (ts.read() || '').toString()
		let result = '';
		for (let row of table.split(/[\r\n]+/)) {
			let r = row.replace(/[^┬]*┬/, '┌');
			r = r.replace(/^├─*┼/, '├');
			r = r.replace(/│[^│]*/, '');
			r = r.replace(/^└─*┴/, '└');
			r = r.replace(/'/g, ' ');
			result += `${r}\n`;
		}
		console.log(result);
	}

	definingGameWin(firstArgument, firstArgumentIndex) {
		let o = {
			'Your move / PC\'s move': firstArgument
		}
		this.startArguments.forEach((opponentArgument, opponentArgumentIndex) => {
			if (firstArgument == opponentArgument) {
				o[opponentArgument] = 'Draw'
			} else if  ((firstArgumentIndex > opponentArgumentIndex && firstArgumentIndex - opponentArgumentIndex <= this.halfStartArgumentLength) ||
			(opponentArgumentIndex > firstArgumentIndex && opponentArgumentIndex - firstArgumentIndex > this.halfStartArgumentLength)) {
				o[opponentArgument] = 'You Win'
			} else {
				o[opponentArgument] = 'Computer Win'
			}
		});
		return o
	}
}

module.exports = TableGenerator;