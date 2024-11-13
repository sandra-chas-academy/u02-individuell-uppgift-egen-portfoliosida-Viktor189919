const projectOneTitleElement = document.getElementById("project-one-title");
const projectOneDescriptionElement = document.getElementById("project-one-description")

async function getGithubData() {

    try {
        
        const response = await fetch("https://api.github.com/repos/Viktor189919/rock-paper-scissor");

        const githubData = await response.json();

        return githubData;
    
    } catch (error) {

        console.log(`Error: ${error}`);
    }

}

async function updateProjects() {

    data = await getGithubData();
    console.log(data.name);
    projectOneTitleElement.innerText = data.name;
    projectOneDescriptionElement.innerText = data.description;
}


updateProjects();