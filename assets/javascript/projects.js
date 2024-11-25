const projectOneTitleElement = document.getElementById("project-one-title");
const projectOneDescriptionElement = document.getElementById("project-one-description");
const projectOneGithubLinkElement = document.getElementById("project-one-github-link");
const projectOneTechstackSpan = document.getElementById("project-one-techstack-span");

const projectTwoTitleElement = document.getElementById("project-two-title");
const projectTwoDescriptionElement = document.getElementById("project-two-description");
const projectTwoGithubLinkElement = document.getElementById("project-two-github-link");
const projectTwoTechstackSpan = document.getElementById("project-two-techstack-span");

const fetchingMsgContainer = document.getElementById("fetching-msg-id");

const projectContainerElements = document.querySelectorAll(".project-container");
const carouselContainer = document.getElementById("carousel-container");
const carouselDisplay = document.getElementById("carousel-display");
const indexDotContainer = document.getElementById("index-dot-container");
const mainElement = document.getElementById("main-element");
const indexDotElements = document.querySelectorAll(".index-dot");

let intervalId;

function displayWaitingMsg(status) {

    if (status) {
        fetchingMsgContainer.classList.remove("collapsed")
        const fetchingMsgElement = document.getElementById("fetching-msg");
        intervalId = setInterval(() => {
            if (fetchingMsgElement.innerText === "Collecting data...") {
                fetchingMsgElement.innerText = "Collecting data";
            } else {
                fetchingMsgElement.innerText += ".";
            }
        }, 1000)

    } else {
        clearInterval(intervalId);        
        fetchingMsgContainer.classList.add("collapsed")
    }
    
}   

async function getGithubData(url) {

    try {
        
        const response = await fetch(url);

        const githubData = await response.json();

        return githubData;
    
    } catch (error) {

        console.log(`Error: ${error}`);
    }

 }

async function updateProjects() {

    displayWaitingMsg(true);

    const githubRepos =  "https://api.github.com/users/Viktor189919/repos";
    const repos = await getGithubData(githubRepos);
    
    for (let repo of repos) {
        
        if (repo.name === "rock-paper-scissor") {

            const languages = await getGithubData(repo.languages_url);
            const langArr = Object.keys(languages);
            langArr.reverse();
            const techstack = langArr.join(", ");
            
            projectOneTechstackSpan.innerText += `${techstack}`
            projectOneTitleElement.innerText = repo.name;
            projectOneDescriptionElement.innerText = repo.description;
            projectOneGithubLinkElement.href = repo.html_url;

        } else if (repo.name === "Minesweeper") {
            const languages = await getGithubData(repo.languages_url);
            const langArr = Object.keys(languages);
            langArr.reverse();
            const techstack = langArr.join(", ");
            
            projectTwoTechstackSpan.innerText = `${techstack}`
            projectTwoTitleElement.innerText = repo.name;
            projectTwoDescriptionElement.innerText = repo.description;
            projectTwoGithubLinkElement.href = repo.html_url;
        }
    }

    setTimeout(() => {
        displayWaitingMsg(false)
    }, 1000);
}

updateProjects();

let activeIndex = 0;

const mediaWidth = window.matchMedia("(min-width: 600px)")

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
        dotpickProject(dotId);
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

function dotpickProject(dotId) {

    if (!(activeIndex === dotId)) {
        projectContainerElements[activeIndex].classList.toggle("collapsed");
        projectContainerElements[dotId].classList.toggle("collapsed");
        indexDotElements[activeIndex].classList.toggle("active-dot");
        indexDotElements[dotId].classList.toggle("active-dot");
        activeIndex = dotId;
    }   
}
