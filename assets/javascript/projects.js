// Github api url: "https://api.github.com/repos/Viktor189919/rock-paper-scissor".

const projectOneTitleElement = document.getElementById("project-one-title");
const projectOneDescriptionElement = document.getElementById("project-one-description");
const projectOneGithubLinkElement = document.getElementById("project-one-github-link");

const projectTwoTitleElement = document.getElementById("project-two-title");
const projectTwoDescriptionElement = document.getElementById("project-two-description");
const projectTwoGithubLinkElement = document.getElementById("project-two-github-link");

const fetchingMsgElement = document.getElementById("fetching-msg");

const projectContainerElements = document.querySelectorAll(".project-container")
const carouselDisplay = document.getElementById("carousel-display");
const indexDotContainer = document.getElementById("index-dot-container")
const mainElement = document.getElementById("main-element")
const carouselContainer = document.getElementById("carousel-container")
const indexDotElements = document.querySelectorAll(".index-dot")


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

let activeIndex = 0;

const mediaWidth = window.matchMedia("(min-width: 600px")
console.log(mediaWidth)
mediaWidth.addEventListener("change", () => {
    mediaQueryCheck(mediaWidth);
})

function mediaQueryCheck(width) {
    
    if (width.matches) {
        
        projectContainerElements.forEach(project => {
            mainElement.appendChild(project)
            project.classList.remove("collapsed");
            carouselContainer.classList.add("collapsed");
            indexDotContainer.classList.add("collapsed");
        })

    } else {

        carouselContainer.classList.remove("collapsed");
        indexDotContainer.classList.remove("collapsed");
 
        projectContainerElements.forEach((project, index) => {
            carouselDisplay.appendChild(project);
            if (index === 0) {
                project.classList.remove("collapsed")
            } else {
                project.classList.add("collapsed")
            }
        })

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

mediaQueryCheck(mediaWidth);

indexDotElements.forEach(dot => {

    const dotId = parseInt(dot.id)
    dot.addEventListener("click", () => {
        changeProject(dotId);
    })
})

const scrollArrows = document.querySelectorAll(".scroll-arrow");

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

function changeProject(dotId) {

    if (!(activeIndex === dotId)) {
        projectContainerElements[activeIndex].classList.toggle("collapsed");
        projectContainerElements[dotId].classList.toggle("collapsed");
        indexDotElements[activeIndex].classList.toggle("active-dot");
        indexDotElements[dotId].classList.toggle("active-dot");
        activeIndex = dotId;
    }   
}
