var profileDataArgs = process.argv.slice(2, process.argv.length);
console.log(profileDataArgs);

const printProfileData = profileDataArray => profileDataArray.forEach(profileItem => console.log(profileItem));


printProfileData(profileDataArgs);
