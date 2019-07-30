const fs = require('fs');
const path = require('path');

function copy(from, to) {
	
	const files = fs.readdirSync(from);
	for (let file of files) {
		if (path.extname(file) === '.js') {
			const fromPath = path.join(from, file);
			const toPath = path.join(to, file);
			console.log(`copy ${fromPath} to ${toPath}`);
			fs.copyFileSync(fromPath, toPath);
		}
	}
}

let srcLocation = path.join(__dirname, '..', 'src');

copy(path.join(__dirname, '..', 'src', 'beautify'), path.join(__dirname, '..', 'lib', 'umd', 'beautify'));
copy(path.join(__dirname, '..', 'src', 'beautify', 'esm'), path.join(__dirname, '..', 'lib', 'esm', 'beautify'));