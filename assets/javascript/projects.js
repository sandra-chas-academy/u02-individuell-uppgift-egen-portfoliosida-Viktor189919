// Collect all elements that shall be modified
const projectOneTitleElement = document.getElementById("project-one-title");
const projectOneDescriptionElement = document.getElementById("project-one-description");
const projectOneGithubLinkElement = document.getElementById("project-one-github-link");
const projectOneTechstackSpan = document.getElementById("project-one-techstack-span");

const projectTwoTitleElement = document.getElementById("project-two-title");
const projectTwoDescriptionElement = document.getElementById("project-two-description");
const projectTwoGithubLinkElement = document.getElementById("project-two-github-link");
const projectTwoTechstackSpan = document.getElementById("project-two-techstack-span");

const fetchingMsgContainer = document.getElementById("fetching-msg-id");

const mainElement = document.getElementById("main-element");
const projectContainerElements = document.querySelectorAll(".project-container");

const carouselContainer = document.getElementById("carousel-container");
const carouselDisplay = document.getElementById("carousel-display");
const indexDotContainer = document.getElementById("index-dot-container");
const indexDotElements = document.querySelectorAll(".index-dot");
const scrollArrows = document.querySelectorAll(".scroll-arrow");

// Declaration of setInterval variable
let intervalId;

// Message for user while data is being collected from github
function displayWaitingMsg(status) {

    if (status) {
        fetchingMsgContainer.classList.remove("collapsed")
        const fetchingMsgElement = document.getElementById("fetching-msg");
        
        // Interval for dots to be added to message
        intervalId = setInterval(() => {
            
            if (fetchingMsgElement.innerText === "Collecting data...") {
                fetchingMsgElement.innerText = "Collecting data";
            
            } else {
                fetchingMsgElement.innerText += ".";
            }
        
        }, 500)

    } else {
        clearInterval(intervalId);        
        fetchingMsgContainer.classList.add("collapsed")
    }
    
}   

// Fetch data from github API
async function getGithubData(url) {

    try {
        
        const response = await fetch(url);

        // Condition for handling additional problems with fetch (ex. faulty url)
        if (response.ok) {
            const githubData = await response.json();

            return githubData;

        } else {
            return "error";
        }

    } catch (error) {
        console.log(`Error: ${error}`);

        return "error";
    }
}

// Get data from specific repo. getGithubData() is called through this function
async function getRepositoryData(repoName) {
    
    const repos = await getGithubData("https://api.github.com/users/Viktor189919/repos")

    if (repos !== "error") {

        for (let repo of repos) {

            if (repo.name === repoName) {
                
                const languages = await getGithubData(repo.languages_url);
                const langArr = Object.keys(languages);
                langArr.reverse();
                const techstack = langArr.join(", ");
                
                return {
                    "name": repo.name,
                    "description": repo.description,
                    "techstack": techstack,
                    "html_url": repo.html_url,
                };
            }
        }
    }
    return "error";
}

// Update projects with githudata
async function updateProjects() {

    displayWaitingMsg(true);

    const minesweeperData = await getRepositoryData("Minesweeper");
    const rockPaperScissorData = await getRepositoryData("rock-paper-scissor");

    if (rockPaperScissorData !== "error") {
        
        projectOneTitleElement.innerText = rockPaperScissorData.name;
        projectOneDescriptionElement.innerText = rockPaperScissorData.description;
        projectOneGithubLinkElement.href = rockPaperScissorData.html_url;
        projectOneTechstackSpan.innerText += rockPaperScissorData.techstack;
    
    } else {
        projectOneTitleElement.innerText = "Failed to collect data";
        projectOneDescriptionElement.innerText = "";
    }

    if (minesweeperData !== "error") {
        
        projectTwoTitleElement.innerText = minesweeperData.name;
        projectTwoDescriptionElement.innerText = minesweeperData.description;
        projectTwoGithubLinkElement.href = minesweeperData.html_url;
        projectTwoTechstackSpan.innerText = minesweeperData.techstack;

    } else {
        projectTwoTitleElement.innerText = "Failed to collect data";
        projectOneDescriptionElement.innerText = "";
    }

    setTimeout(() => {
        displayWaitingMsg(false)
    }, 2000);
}

updateProjects();

let activeIndex = 0;

const mediaWidth = window.matchMedia("(min-width: 600px)")

// Check media width
mediaWidth.addEventListener("change", () => {
    mediaQueryCheck(mediaWidth);
})

function mediaQueryCheck(width) {
    
    // Media wider than 600px, move all projects to main element, side to side display
    if (width.matches) {

        carouselContainer.classList.add("collapsed");
        indexDotContainer.classList.add("collapsed");
        
        projectContainerElements.forEach(project => {
            project.classList.remove("collapsed");
            mainElement.appendChild(project)
        })

    // Media narrower than 600px, move all projects to carouseldisplay
    } else {

        carouselContainer.classList.remove("collapsed");
        indexDotContainer.classList.remove("collapsed");
        
        // Set first project on display
        projectContainerElements.forEach((project, index) => {
            carouselDisplay.appendChild(project);
            if (index === 0) {
                project.classList.remove("collapsed")
            } else {
                project.classList.add("collapsed")
            }
        })

        // Set first dot to active-dot
        indexDotElements.forEach((dot, index) => {
            if (index === 0) {
                dot.classList.add("active-dot")
            } else {
                dot.classList.remove("active-dot");
            }
        })
        activeIndex = 0;
    }
}

// Initial media width check
mediaQueryCheck(mediaWidth);

// Event listeners for pagination dots
indexDotElements.forEach(dot => {
    const dotId = parseInt(dot.id)
    dot.addEventListener("click", () => {
        dotpickProject(dotId);
    })
})

// Event listeners for carousel arrows
scrollArrows.forEach(arrow => {
    
    if (arrow.classList.contains("next")) {
        arrow.addEventListener("click", () => {
            switchProject(1);
        })
    
    } else {
        arrow.addEventListener("click", () =>  {
            switchProject((-1));
        })
    }
})

// Switch project with carousel arrows
function switchProject(newIndex) {

    newIndex = activeIndex + newIndex;

    projectContainerElements[activeIndex].classList.toggle("collapsed");
    indexDotElements[activeIndex].classList.toggle("active-dot")

        if (newIndex > projectContainerElements.length - 1) {
            projectContainerElements[0].classList.toggle("collapsed");
            indexDotElements[0].classList.toggle("active-dot")
            activeIndex = 0;
        
        } else if (newIndex < 0) {
            projectContainerElements[projectContainerElements.length-1].classList.toggle("collapsed");
            indexDotElements[projectContainerElements.length-1].classList.toggle("active-dot");
            activeIndex = projectContainerElements.length-1;
        
        } else {
            projectContainerElements[newIndex].classList.toggle("collapsed");
            indexDotElements[newIndex].classList.toggle("active-dot");
            activeIndex = newIndex;
        }
}

// Switch project with pagination dots
function dotpickProject(dotId) {

    if (!(activeIndex === dotId)) {
        projectContainerElements[activeIndex].classList.toggle("collapsed");
        projectContainerElements[dotId].classList.toggle("collapsed");
        indexDotElements[activeIndex].classList.toggle("active-dot");
        indexDotElements[dotId].classList.toggle("active-dot");
        activeIndex = dotId;
    }   
}
