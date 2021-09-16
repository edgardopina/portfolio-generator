const userQuestions = [
	/* Pass your questions in here */
	{
		type: 'input',
		name: 'name',
		message: 'What is your name? (Required)',
		validate: nameNotEmpty => {
			if (nameNotEmpty) {
				return true;
			} else {
				console.log('Please enter your name!');
			}
		},
	},
	{
		type: 'input',
		name: 'github',
		message: 'Enter your GitHub Username (Required)',
		validate: userNameNotEmpty => {
			if (userNameNotEmpty) {
				return true;
			} else {
				console.log('Please enter your Github username!');
			}
		},
	},
	{
		type: 'confirm',
		name: 'confirmAbout',
		message: 'Would you like to enter some information about yourself for an "About" section? ',
		default: true,
	},
	{
		type: 'input',
		name: 'about',
		message: 'Provide some information about yourself:',
		when: ({ confirmAbout }) => {
			if (confirmAbout) {
				return true;
			} else {
				return false;
			}
		},
	},
];
const projectQuestions = [
	{
		type: 'input',
		name: 'name',
		message: 'What is the name of your Project? (Required)',
		validate: projectNameNotEmpty => {
			if (projectNameNotEmpty) {
				return true;
			} else {
				console.log('Please enter your project name!');
			}
		},
	},
	{
		type: 'input',
		name: 'description',
		message: 'Provide a description of the project (Required)',
		validate: descriptionNotEmpty => {
			if (descriptionNotEmpty) {
				return true;
			} else {
				console.log('Please enter the project description!');
			}
		},
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
		validate: linkNotEmpty => {
			if (linkNotEmpty) {
				return true;
			} else {
				console.log('Please enter your name.');
			}
		},
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
];

// includes inquirer 3P module
const inquirer = require('inquirer');

// includes local module generatePage from page-template.js file
const generatePage = require('./src/page-template.js');

// destraucturing the modules.export from page-template
const { writeFile, copyFile } = require('./utils/generate-site.js');

const promptProject = portfolioData => {
	if (!portfolioData.projects) {
		portfolioData.projects = [];
	}
	console.log(`
		+++++++++++++++++
		Add a New Project
		+++++++++++++++++
	`);

	return inquirer.prompt(projectQuestions).then(projectData => {
		portfolioData.projects.push(projectData);
		if (projectData.confirmAddProject) {
			return promptProject(portfolioData);
		} else {
			return portfolioData;
		}
	});
};

const promptUser = () => {
	return inquirer.prompt(userQuestions);
};
// 			// the following 'then' is a promise BECAUSE it uses the promise returned by' return inquirer.prompt'
// 			.then(promptProject)
// 			.then(portfolioData => {
// 				const pageHTML = generatePage(portfolioData);
// 				writeFile(pageHTML)
// 					.then(() => {
// 						copyFile()
// 							.then(() => console.log('Copied'))
// 							.catch(err => console.error(err));
// 					})
// 					.catch(errResponse => {
// 						// this will run when we use `reject()`
// 						console.log(errResponse);
// 					});
// 			})
// 	);
// };

// compare with the commented code above

promptUser() // 'returns' (promise) of  promptUser
	.then(promptProject) // captures the 'returning' data from promptUser() then recursively calls promptProject, which in turn 'returns' the projects' data (promise)
	.then(portfolioData => { // processes 'returned' data set from promptProject() 
		return generatePage(portfolioData); // 'returns' (promise) the finished HTML template
	})
	.then(pageHTML => { // processes 'returned' HTML template 
		return writeFile(pageHTML); // processes 'writeFile' which was written as a wrapper Promise object around fs.writeFile and 'returns' (promise) its settled state: 'resolved' or 'rejected'
	})
	.then(writeFileResponse => { // process the 'resolve' response (promise) from writeFile and then ....
		console.log(writeFileResponse);
		return copyFile(); //  processes 'copyFile' which was written as a wrapper Promise object around fs.copyFile and 'returns' (promise) its settled state: 'resolved' or 'rejected'
	})
	.then(copyFileResponse => { // process the 'resolve' response (promise) from copyFile and then ....
		console.log(copyFileResponse); // logs sucess!
	})
	.catch(err => { // otherwise process error (rejected) from any of the promises above
		console.log(err);
	});
