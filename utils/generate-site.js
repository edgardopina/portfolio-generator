const fs = require('fs');

const writeFile = fileContent => {
	return new Promise((resolve, reject) => {
		fs.writeFile('./dist/index.html', fileContent, err => {
			// if there is an error, reject the promise and send the error to the Promise's `.catch()` method
			if (err) {
				reject(err);
				// return out of the function here to make sure the Promise doesn't executes the resolve() function as well
				return;
			}

			// if everything went well, resolve the Promise and send successful data to the `.then()` method
			resolve({
				ok: true,
				message: 'File created!',
			});
		});
	});
};

const copyFile = () => {
	return new Promise((resolve, reject) => {
		fs.copyFile('./src/style.css', './dist/style.css', err => {
			// if there is an error, reject the promise and send the error to the Promise's `.catch()` method
			if (err) {
				reject(err);
				// return out of the function here to make sure the Promise doesn't executes the resolve() function as well
				return;
			}

			// if everything went well, resolve the Promise and send successful data to the `.then()` method
			resolve({
				ok: true,
				message: 'Style sheet copied sucessfully!',
			});
		});
	});
};


// module.exports = {
// 	writeFile: writeFile,
// 	copyFile: copyFile,
// };

module.exports = {writeFile, copyFile};
