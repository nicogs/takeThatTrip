

const userLifeDiv = document.getElementById("userLife")
// const divLifeAtGlance = document.getElementById("divLifeAtGlance")
// const divLifeAtGlanceChart = document.getElementById("divLifeAtGlanceChart")

function createStage(stage, index) {
	const div = document.createElement("div")
	div.setAttribute("id", "stage" + (index +1)  + "inLife")
	div.setAttribute("class", "stage")
	div.setAttribute("data-stage", stage.name)
	return div;
}

function createMilestone(milestone) {
	
	const divContainer = document.createElement("div") 
	const divCard = document.createElement("div")
	const divBody = document.createElement("div")
	const divRow = document.createElement("div")
	const divCol = document.createElement("div")

	const btnClose = document.createElement("button")
	const title = document.createElement("h5")
	const text = document.createElement("p")
	const textSmall = document.createElement("p")
	const small = document.createElement("small")

	divContainer.setAttribute("class", "container collapse")
	divContainer.setAttribute("id", "milestone" + milestone.index.week)
	divContainer.setAttribute("style", "max-width: 800px")

	divCard.setAttribute("class", "card border-light")
	divCard.setAttribute("style", "background: transparent;")

	divBody.setAttribute("class", "card-body")
	divRow.setAttribute("class", "row g-0")
	divCol.setAttribute("class", "col-md-12")

	btnClose.setAttribute("type", "button")
	btnClose.setAttribute("class", "btn-close position-absolute top-0 end-0")
	btnClose.setAttribute("data-bs-dismiss", "collapse")
	btnClose.setAttribute("data-bs-toggle", "collapse")
	btnClose.setAttribute("data-bs-target", "#milestone" + milestone.index.week)
	btnClose.setAttribute("aria-expanded", "false")
	btnClose.setAttribute("aria-controls", "milestone" + milestone.index.week)

	title.setAttribute("class", "card-title")
	title.textContent = milestone.name

	text.setAttribute("class", "card-text")
	text.textContent = milestone.accomplishment

	textSmall.setAttribute("class", "card-text")
	small.setAttribute("class", "text-body-secondary")
	small.textContent = "Week " + milestone.index.week + " of their life, at age " + milestone.index.year

	textSmall.append(small)

	divCol.append(btnClose)
	divCol.append(title)
	divCol.append(text)
	divCol.append(textSmall)

	divRow.append(divCol)
	divBody.append(divRow)
	divCard.append(divBody)
	divContainer.append(divCard)

	return divContainer
}

function createYear(year) {
	const div = document.createElement("div")
	div.setAttribute("id", "year" + year.index + "inLife")
	div.setAttribute("class", "year")
	div.setAttribute("data-year", year.index)

	return div
}

function createWeek(week) {
	const div = document.createElement("div")
	div.setAttribute("id", "week" + week.index.week + "InLife")
	div.setAttribute("class", "week")
	div.setAttribute("data-week", week.index.weekOfYear)
	div.setAttribute("data-lived", week.lived)
	div.addEventListener("mouseenter", () => updateWeekYear(week))
	if(week.milestone) {
		div.setAttribute("data-milestone", "true")
		div.setAttribute("data-bs-toggle", "collapse")
		div.setAttribute("data-bs-target", "#milestone"+week.index.week)
		div.setAttribute("aria-expended", "false")
		div.setAttribute("aria-controls", "milestone" + week.index.week)
	}
	return div
}


// .forEach((item) => {
// 	copyItems.push(item);
//   });



function updateWeekYear(week) {
	const pillYear = document.getElementById("pillYear")
	const pillWeek = document.getElementById("pillWeek")
	const pillStage = document.getElementById("pillStage")

	pillYear.innerText = week.index.year
	pillWeek.innerText = week.index.weekOfYear
	pillStage.innerText = week.stage.name

	// pillYear.innerText = 
}

function renderLife(life) {
	const stages = life.stages
	const years = life.years

	while (userLifeDiv.firstChild) {
		userLifeDiv.removeChild(userLifeDiv.firstChild);
	  }

	stages.forEach((stage, index) => {
		const divStage = createStage(stage, index)
	
		const yearsInStage = years.filter(year => stage.name == year.stage.name)
	
		yearsInStage.forEach(year => {
			const divYear = createYear(year)
	
			year.weeks.forEach(week => {
				const divWeek = createWeek(week)
				divYear.append(divWeek)
			});
	
	
			divStage.append(divYear)
	
			for (let i = 0; i < year.milestones.length; i++) {
				const divMilestone = createMilestone(year.milestones[i]);
				divYear.append(divMilestone)
			}
		})
	
		userLifeDiv.append(divStage)
	});
}

function renderAtGlance(life) {

	const headingWeeksLived = document.getElementById("headingWeeksLived")
	const headingPctLived = document.getElementById("headingPctLived")

	headingWeeksLived.textContent = `You're on week ${life.weeksData.lived} of ${life.weeksData.life} of your life`
	headingPctLived.textContent = `${life.weeksData.percentage}% of your life has already passed`
	

	// const phrases = [
	// 	`<h3>You're on week <strong>${life.weeksData.lived} of ${life.weeksData.life}</strong> of your life</h3>`,
	// 	`<strong>${life.weeksData.percentage}%</strong> of your life has already passed`,
	// 	`Most people work between the age of 22 to 65, meaning we spend about 2,236 weeks in the "career" phase`,
	// 	`If you sleep 8 hours a day, you will likely spend more than ${life.weeksData.sleep} weeks of your life asleep`
	// ]

	// while (divLifeAtGlance.firstChild) {
	// 	divLifeAtGlance.removeChild(divLifeAtGlance.firstChild);
	// }
	
	// phrases.forEach(phrase => {
	// 	const p = document.createElement("p")
	// 	p.setAttribute('class', "lead")
	// 	p.innerHTML = phrase

	// 	divLifeAtGlance.append(p)
	// })
}

renderLife(activeChart)