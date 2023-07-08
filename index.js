const fs = require("fs");

const inquirer = require("inquirer");

const questions = [
    {
        type: "input",
        message: "Input email:",
        name: "email"
    },
    {
        type: "input",
        message: "Input GitHub username:",
        name: "github"
    },
    {
        type: "input", 
        message: "Enter title for project:",
        name: "title"
    },
    {
        type: "input",
        message: "Enter project description:",
        name: "description"
    },
    {
        type: "input",
        message: "Enter installation information:",
        name: "installation"
    },
    {
        type: "input",
        message: "Enter usage information:",
        name: "usage"
    },
    {
        type: "list",
        message: "Choose the license for the project:",
        name: "license",
        choices: [
            "Apache License 2.0", 
            "GNU General Public License v3.0",
            "MIT License",
            'BSD 2-Clause "Simplified" License',
            "Boost Software License 1.0",
            "Creative Commons Zero v1.0 Universal",
            "Eclipse Public License 1.0"
        ]
    },
    {
        type: "input",
        message: "Input contributing information:",
        name: "contributing"
    },
    {
        type: "input",
        message: "Input test instructions:",
        name: "tests"
    },
];

const getLicenseBadge = license => {
    switch (license) {
        case "Apache License 2.0":
            return "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
        case "GNU General Public License v3.0":
            return "[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";
        case "MIT License":
            return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
        case 'BSD 2-Clause "Simplified" License':
            return "[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)";
        case "Boost Software License 1.0":
            return "[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
        case "Creative Commons Zero v1.0 Universal":
            return "[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)";
        case "Eclipse Public License 1.0":
            return "[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)";
    }
}

const generateMarkdown = answers => {
    return `# ${answers.title}
${getLicenseBadge(answers.license)}  
## Table of Contents
1. [Description](#Description)
2. [Installation](#Installation)
3. [Usage](#Usage)
4. [License](#License)
5. [Contributing](#Contributing)
6. [Tests](#Tests)
7. [Questions](#Questions)
## Description {#Description}
${answers.description}
## Installation {#Installation}
${answers.installation}
## Usage {#Usage}
${answers.usage}
## License {#License}
${getLicenseBadge(answers.license)}  ${answers.license}
## Contributing {#Contributing}
${answers.contributing}
## Tests {#Tests}
${answers.tests}
## Questions {#Questions}
If you have additional questions, email us at [${answers.email}](mailto:${answers.email}) or reach out on [Github](https://github.com/${answers.github}).
`;
}

const handleAnswers = answers => {
    fs.writeFile("./output/README.md", generateMarkdown(answers), err => err ? console.error(err) : console.log('Success!'));
}

inquirer.prompt(questions).then(answers => handleAnswers(answers));