// Github api url: "https://api.github.com/repos/Viktor189919/rock-paper-scissor".

const projectOneTitleElement = document.getElementById("project-one-title");
const projectOneDescriptionElement = document.getElementById("project-one-description");
const projectOneGithubLinkElement = document.getElementById("project-one-github-link");

const projectTwoTitleElement = document.getElementById("project-two-title");
const projectTwoDescriptionElement = document.getElementById("project-two-description");
const projectTwoGithubLinkElement = document.getElementById("project-two-github-link");

const fetchingMsgElement = document.getElementById("fetching-msg-id");

const projectContainerElements = document.querySelectorAll(".project-container")

async function getGithubData() {

    displayWaitingMsg();

    try {
        
        response = await fetch("https://api.github.com/users/Viktor189919/repos");

        const githubData = await response.json();

        return githubData;
    
    } catch (error) {

        console.log(`Error: ${error}`);
    }

}

async function updateProjects() {

    data = await getGithubData();

    data.forEach(repo => {

        if (repo.name === "rock-paper-scissor") {
            projectOneTitleElement.innerText = repo.name;
            projectOneDescriptionElement.innerText = repo.description;
            projectOneGithubLinkElement.href = repo.html_url;

        } else if (repo.name === "Minesweeper") {
            projectTwoTitleElement.innerText = repo.name;
            projectTwoDescriptionElement.innerText = repo.description;
            projectTwoGithubLinkElement.href = repo.html_url;
        }
    });
    displayWaitingMsg()
}

function displayWaitingMsg() {
    fetchingMsgElement.classList.toggle("collapsed")
}   

updateProjects();

