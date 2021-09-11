// // process parameters from command line [0]: node, [1]: app.js, [2]: first parameter, [3]: .....
// // gets parameters from CLI starting on 3rd parameter (0 based index)
// const profileDataArgs = process.argv.slice(2, process.argv.length);
// const [name, github] = profileDataArgs; // de-structure array profileDataArgs elemnts 0, 1

// // includes core module: 'File system'
// const fs = require('fs');

// // includes local module generatePage from page-template.js file
// const {generatePage} = require('./src/page-template');

// fs.writeFile('index.html', generatePage(name, github), (err) => {
// 	if (err) throw new Error(err);

// 	console.log('Portfolio complete! Check out index.html to see the output!');
// });

// includes inquirer 3P module
const inquirer = require('inquirer');

// includes core module: 'File system'
const fs = require('fs');

// includes local module generatePage from page-template.js file
const { generatePage } = require('./src/page-template');

inquirer
	.prompt([
		/* Pass your questions in here */
		{
			type: 'input',
			name: 'name',
			message: 'What is your name?',
		},
		{
			type: 'input',
			name: 'last_name',
			message: 'What is your last name?',
		},
	])
	.then((answers) => {
		// Use user feedback for... whatever!!
		console.log(answers);
	})
	.catch((error) => {
		if (error.isTtyError) {
			// Prompt couldn't be rendered in the current environment
		} else {
			// Something else went wrong
		}
	});
