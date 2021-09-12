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

const promptUser = () => {
	return inquirer.prompt([
		/* Pass your questions in here */
		{
			type: 'input',
			name: 'name',
			message: 'What is your name?',
		},
		{
			type: 'input',
			name: 'github',
			message: 'Enter your GitHub Username',
		},
		{
			type: 'input',
			name: 'about',
			message: 'Provide some information about yourself:',
		},
	]);
};

const promptProject = portfolioData => {
	if (!portfolioData.projects) {
		portfolioData.projects = [];
	}
	console.log(`
+++++++++++++++++
Add a New Project
+++++++++++++++++
`);
	return inquirer
		.prompt([
			{
				type: 'input',
				name: 'name',
				message: 'What is the name of your Project?',
			},
			{
				type: 'input',
				name: 'description',
				message: 'Provide a description of the project (Required)',
			},
			{
				type: 'checkbox',
				name: 'languages',
				message: 'What did you build this project with? (Check all that apply)',
				choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'JQuery', 'Bootstrap', 'Node'],
			},
			{
				type: 'input',
				name: 'link',
				message: 'Enter the GitHub link to your project. (Required)',
			},
			{
				type: 'confirm',
				name: 'feature',
				message: 'Would you like to feature this project?',
				default: false,
			},
			{
				type: 'confirm',
				name: 'confirmAddProject',
				message: 'Would you like to add another project?',
			},
		])
		.then(projectData => {
			portfolioData.projects.push(projectData);
			if (projectData.confirmAddProject) {
				return promptProject(portfolioData);
			} else {
				return portfolioData;
			}
		});
};

// the following 'then' is a promise BECAUSE it uses the promise returned by' return inquirer.prompt'
promptUser()
	.then(promptProject)
	.then(portfolioData => {
		console.log(portfolioData);
	});
