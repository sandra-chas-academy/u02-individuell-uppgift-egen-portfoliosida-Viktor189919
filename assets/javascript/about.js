const companyDutiesElements = document.querySelectorAll(".company-duty");
const companyNameElements = document.querySelectorAll(".company-name");
const companylocationElements = document.querySelectorAll(".company-location");
const companyEmploymentFormElements = document.querySelectorAll(".employment-form")
const companyWorkTimePeriodElements = document.querySelectorAll(".work-time-period")

const schoolEdLevelElements = document.querySelectorAll(".ed-level");
const schoolNameElements = document.querySelectorAll(".school-name");
const schoolLocationElements = document.querySelectorAll(".school-location")
const schoolStudyPaceElements = document.querySelectorAll(".study-pace")
const schoolStudyTimePeriodELements = document.querySelectorAll(".study-time-period")

async function getJsonData() {

    try {

        const response = await fetch("assets/json/about.json");

        if(!response.ok) {
            throw new Error(`HTTP ERROR status: ${response.status}`)
        }

        const jsonData = await response.json();
        updateAboutSection(jsonData);

    } catch(error) {
        console.error("Error", error)
    }
}

function updateAboutSection(jsonData) {

    for (let company of jsonData.companies) {
        
        const companyIndex = jsonData.companies.indexOf(company);
        
        companyDutiesElements[companyIndex].innerText = company.duties;
        
        const nameText = document.createTextNode(` ${company.name}`);
        companyNameElements[companyIndex].appendChild(nameText);

        const locationText = document.createTextNode(` ${company.location}`);
        companylocationElements[companyIndex].appendChild(locationText);

        companyEmploymentFormElements[companyIndex].innerText = company.employmentForm;

        companyWorkTimePeriodElements[companyIndex].innerText = company.timePeriod;
    }

    for (let school of jsonData.schools) {

        const schoolIndex = jsonData.schools.indexOf(school);
        
        schoolEdLevelElements[schoolIndex].innerText = school.educationLevel;

        const nameText = document.createTextNode(` ${school.name}`);
        schoolNameElements[schoolIndex].appendChild(nameText);

        const locationText = document.createTextNode(` ${school.location}`);
        schoolLocationElements[schoolIndex].appendChild(locationText);

        schoolStudyPaceElements[schoolIndex].innerText = school.studyPace;

        schoolStudyTimePeriodELements[schoolIndex].innerText = school.timePeriod;
    }
}

getJsonData();
